// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: UserController manages user-related operations such as retrieving,
// updating, and deleting user records. It also provides functionality to assign
// roles to users. Only users with the Admin role can access these endpoints.
// -----------------------------------------------------------------------------

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

        // Constructor to inject the IUserService dependency.
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/user
        // Retrieves a list of all users.
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users); // Return 200 OK with the list of users.
        }

        // GET: api/user/getById
        // Retrieves a user by their unique identifier.
        [HttpGet("getById")]
        public async Task<IActionResult> GetUserById([FromBody] IdDto idDto)
        {
            var user = await _userService.GetUserById(idDto.Id);
            if (user == null)
            {
                return NotFound(new { error = "User not found" }); // Return 404 Not Found if user doesn't exist.
            }
            return Ok(user); // Return 200 OK with user details.
        }

        // PUT: api/user
        // Updates the details of an existing user.
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto userDto)
        {
            var updatedUser = await _userService.UpdateUser(userDto);
            if (updatedUser == null)
            {
                return NotFound(new { error = "User not found" }); // Return 404 Not Found if user doesn't exist.
            }
            return Ok(updatedUser); // Return 200 OK with updated user details.
        }

        // DELETE: api/user/delete
        // Deletes a user based on their unique identifier.
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser([FromBody] IdDto idDto)
        {
            var user = await _userService.GetUserById(idDto.Id);
            if (user == null)
            {
                return NotFound(new { error = "User not found" }); // Return 404 Not Found if user doesn't exist.
            }

            await _userService.DeleteUser(idDto.Id);
            return NoContent(); // Return 204 No Content if deletion is successful.
        }

        // PUT: api/user/assign-role
        // Assigns a role to a user based on the provided user ID and role.
        [HttpPut("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleDto assignRoleDto)
        {
            try
            {
                var userExists = await _userService.AssignRole(assignRoleDto.UserId, assignRoleDto.Role);
                if (!userExists)
                {
                    return NotFound(new { error = "User not found" }); // Return 404 Not Found if user doesn't exist.
                }
                return Ok(); // Return 200 OK if role assignment is successful.
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message }); // Return 400 Bad Request if there's an argument error.
            }
        }
    }

    // Data Transfer Object for assigning roles to users.
    public class AssignRoleDto
    {
        public string UserId { get; set; } // Unique identifier of the user.
        public string Role { get; set; } // Role to assign to the user.
    }
}
