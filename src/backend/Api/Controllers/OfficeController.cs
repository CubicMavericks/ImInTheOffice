using Api.Exceptions;
using Api.Models;
using Api.Repository;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OfficeController : ControllerBase
    {
        private readonly IRepository<Office> _officeRepository;

        public OfficeController(IRepository<Office> officeRepository)
        {
            _officeRepository = officeRepository;
        }

        [HttpPost("checkin/{userId}")]
        public async Task<IActionResult> Checkin(string userId)
        {
            try
            {
                var office = await _officeRepository.Find(o => o.UserId == userId);

                if(office == null){
                    office = Office.OfficeFactory.AsCheckin(userId);
                    await _officeRepository.Insert(office);
                }
                else{
                    office.SetCheckin();
                    await _officeRepository.Update(o => o.Id == office.Id, office);
                }

            return Ok();
            }
            catch(DomainException de)
            {
                 return BadRequest(new ValidationProblemDetails(new Dictionary<string, string[]>{
                        { "Messages", new string[]{de.Message}}
                    }));
            }
        }

         [HttpPost("checkout/{userId}")]
        public async Task<IActionResult> Checkout(string userId)
        {
            try
            {
                var office = await _officeRepository.Find(o => o.UserId == userId);

                if(office == null){
                    office = Office.OfficeFactory.AsCheckout(userId);
                    await _officeRepository.Insert(office);
                }
                else{
                    office.SetCheckout();
                    await _officeRepository.Update(o => o.Id == office.Id, office);
                }

                return Ok();
            }
             catch(DomainException de)
            {
                 return BadRequest(new ValidationProblemDetails(new Dictionary<string, string[]>{
                        { "Messages", new string[]{de.Message}}
                    }));
            }
        }
    }
}