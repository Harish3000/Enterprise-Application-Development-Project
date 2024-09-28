using Microsoft.AspNetCore.Mvc;
using webApi.DTOs;
using webApi.Services;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var jwtResponse = await _authService.Login(loginDto); 

            if (jwtResponse == null)
            {
                return Unauthorized();
            }

            return Ok(jwtResponse);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = await _authService.Register(registerDto);
            if (user == null)
            {
                return BadRequest("User already exists");
            }
            return Ok(user);
        }
    }
}