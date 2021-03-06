using Api.Exceptions;
using Api.Hubs;
using Api.Models;
using Api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OfficeController : ControllerBase
    {
        private readonly IRepository<Office> _officeRepository;
        private IHubContext<NotificationHub, INotificationClient> _notificationHub;
        private readonly IRepository<Users> _userRepository;

        public OfficeController(IRepository<Office> officeRepository,
                                IRepository<Users> userRepository,
                                IHubContext<NotificationHub, INotificationClient> notificationHub)
        {
            _officeRepository = officeRepository;
            _userRepository = userRepository;
            _notificationHub = notificationHub;
        }

        [HttpPost("checkin/{userId}")]
        public async Task<IActionResult> Checkin(string userId)
        {
            try
            {
                var officeFilter = OfficeCheckinFilter.BuildUserAndDate(userId);
                var office = await _officeRepository.Find(officeFilter);

                if(office == null){
                    office = Office.OfficeFactory.AsCheckin(userId);
                    await _officeRepository.Insert(office);
                }
                else{
                    office.SetCheckin();
                    await _officeRepository.Update(o => o.Id == office.Id, office);
                }
                
                var result = await GetEverybodyInOffice();
                var user = result.FirstOrDefault(s => s.Id == userId);

                await _notificationHub.Clients.All.ReceiveNotification(new
                {
                    Office = result,
                    User = user
                });

                return Ok();
            }
            catch(DomainException de)
            {
                 return Ok(new ValidationProblemDetails(new Dictionary<string, string[]>{
                        { "Messages", new string[]{de.Message}}
                    }));
            }
        }

        [HttpPost("checkout/{userId}")]
        public async Task<IActionResult> Checkout(string userId)
        {
            try
            {
                var officeFilter = OfficeCheckinFilter.BuildUserAndDate(userId);
                var office = await _officeRepository.Find(officeFilter);

                if(office == null){
                    office = Office.OfficeFactory.AsCheckout(userId);
                    await _officeRepository.Insert(office);
                }
                else{
                    office.SetCheckout();
                    await _officeRepository.Update(o => o.Id == office.Id, office);
                }

                var result = await GetEverybodyInOffice();

                var user = result.FirstOrDefault(s => s.Id == userId);

                await _notificationHub.Clients.All.ReceiveNotification(new
                {
                    Office = result,
                    User = user
                });

                return Ok();
            }
             catch(DomainException de)
            {
                 return Ok(new ValidationProblemDetails(new Dictionary<string, string[]>{
                        { "Messages", new string[]{de.Message}}
                    }));
            }
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListUsers()
        {
           return Ok(await GetEverybodyInOffice());
        }

        private async Task<List<OfficeDTO>> GetEverybodyInOffice()
        {
            var officeFilter = OfficeCheckinFilter.BuildPerDate();
                    var office = await _officeRepository.Find(officeFilter);

                    var listOfUserInOffice = await _officeRepository.List(officeFilter);
                    var userIds = listOfUserInOffice.Select(s => s.UserId).ToList();

                    var filterBuilder = Builders<Users>.Filter;
                    var filter = filterBuilder.In(x => x.Id, userIds);

                    var users = await _userRepository.List(filter);

                    var result = listOfUserInOffice.Join(users, 
                                                        uio => uio.UserId,
                                                        u => u.Id,
                                                        (uio, u) => new OfficeDTO{
                                                        Id = u.Id, Name = u.Name, 
                                                        Avatar = u.Avatar, 
                                                        DateCheckin = uio.DateLastCheckin, 
                                                        DateCheckout = uio.DateLastCheckout,
                                                        Action = uio.UserInTheOffice ? "Checkin" : "Checkout" })
                        .OrderByDescending(s => Math.Max(s.DateCheckin.Ticks, s.DateCheckout.Ticks)).ToList();

            return result;
        }
    }
}