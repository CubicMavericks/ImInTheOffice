using Api.Models;
using Api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(UserLoginRequest userLogin)
        {
            var userEntity = new Users{
                Email = userLogin.Email,
                Name = userLogin.Name
            };

            var user = await _userRepository.FindByName(userEntity.Name);

            if(user == null){
                await _userRepository.Insert(userEntity);
                user = await _userRepository.FindByName(userEntity.Name);
            }

           return Ok(user);
        }
    }
}