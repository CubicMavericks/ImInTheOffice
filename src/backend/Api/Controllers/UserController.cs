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

        public UserController(IRepository<Users> userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(UserLoginRequest userLogin)
        {
            var user = await _userRepository.Find(u => u.Email == userLogin.Email);

            if (user == null)
            {
                return Unauthorized();
            }
            
            return Ok(user);
        }
    }
}