using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webApi.DTOs;
using webApi.Services;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("getById")]
        public async Task<IActionResult> GetUserById([FromBody] IdDto idDto)
        {
            var user = await _userService.GetUserById(idDto.Id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto userDto)
        {
            var updatedUser = await _userService.UpdateUser(userDto);
            if (updatedUser == null)
            {
                return NotFound();
            }
            return Ok(updatedUser);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser([FromBody] IdDto idDto)
        {
            await _userService.DeleteUser(idDto.Id);
            return NoContent();
        }

        [HttpPut("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleDto assignRoleDto)
        {
            await _userService.AssignRole(assignRoleDto.UserId, assignRoleDto.Role);
            return Ok();
        }
    }

    public class AssignRoleDto
    {
        public string UserId { get; set; }
        public string Role { get; set; }
    }
}