// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: AuthController for handling authentication-related operations 
// such as login and registration.
// -----------------------------------------------------------------------------

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

        // Constructor to inject the IAuthService dependency.
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/auth/login
        // This method handles user login requests. It returns a JWT token if 
        // the credentials are valid, otherwise returns Unauthorized.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var jwtResponse = await _authService.Login(loginDto);

            if (jwtResponse == null)
            {
                return Unauthorized(); // Return 401 Unauthorized if login fails.
            }

            return Ok(jwtResponse); // Return 200 OK with the JWT token.
        }

        // POST: api/auth/register
        // This method handles user registration requests. It returns the user
        // object if successful, otherwise returns a BadRequest if the user 
        // already exists.
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = await _authService.Register(registerDto);
            if (user == null)
            {
                return BadRequest("User with Username/ Email already exists");
            }
            return Ok(user); // Return 200 OK with the newly created user.
        }
    }
}
