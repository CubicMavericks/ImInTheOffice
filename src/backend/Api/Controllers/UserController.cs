using Api.Models;
using Api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IRepository<Users> _userRepository;
        private readonly IRepository<Office> _officeRepository;

        public UserController(IRepository<Users> userRepository,
                              IRepository<Office> officeRepository)
        {
            _userRepository = userRepository;
            _officeRepository = officeRepository;
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(UserLoginRequest userLogin)
        {
            var user = await _userRepository.Find(u => u.Email == userLogin.Email);

            if (user == null)
            {
                return Unauthorized();
            }

            // var userFilter = ndew
            
            // _officeRepository.Find(u => u.UserId == )

            return Ok(user);
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> SignUp(UserSignUpRequest request)
        {
            var userWithEmailExists =  await _userRepository.Find(s => s.Email == request.Email);

            if (userWithEmailExists != null)
            {
                return BadRequest("A user with the specified email already exists");
            }
            
            await _userRepository.Insert(new Users
            {
                Email = request.Email,
                Name = request.Name,
                Avatar = request.Avatar
            });

            var insertedUser = await _userRepository.Find(s => s.Email == request.Email);

            return Ok(insertedUser);
        }
    }
}