// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: UserService for handling user-related operations, including 
// fetching, updating, deleting users, and assigning roles to users.
// -----------------------------------------------------------------------------

using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IUserService
    {
        // Retrieves all users
        Task<List<UserDto>> GetAllUsers();

        // Retrieves a user by their ID
        Task<UserDto> GetUserById(string id);

        // Retrieves a user by their username
        Task<UserDto> GetUserByUserName(string userName);

        // Updates a user and returns the updated user
        Task<UserDto> UpdateUser(UserDto userDto);

        // Deletes a user by their ID
        Task DeleteUser(string id);

        // Assigns a role to a user and returns success status
        Task<bool> AssignRole(string userId, string role);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository; // Repository for user data
        private readonly IMapper _mapper; // AutoMapper for DTO conversion
        private readonly IVendorRepository _vendorRepository; // Repository for vendor data

        public UserService(IUserRepository userRepository, IMapper mapper, IVendorRepository vendorRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _vendorRepository = vendorRepository;
        }

        // Retrieves all users and maps them to UserDto
        public async Task<List<UserDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers(); // Fetch all users
            return _mapper.Map<List<UserDto>>(users); // Map to UserDto
        }

        // Retrieves a user by their ID and maps to UserDto
        public async Task<UserDto> GetUserById(string id)
        {
            var user = await _userRepository.GetUserById(id); // Fetch user by ID
            return _mapper.Map<UserDto>(user); // Map to UserDto
        }

        // Retrieves a user by their username and maps to UserDto
        public async Task<UserDto> GetUserByUserName(string userName)
        {
            var user = await _userRepository.GetUserByUserName(userName); // Fetch user by username
            return _mapper.Map<UserDto>(user); // Map to UserDto
        }

        // Updates a user and maintains the assigned role
        public async Task<UserDto> UpdateUser(UserDto userDto)
        {
            // Check if user exists
            var existingUser = await _userRepository.GetUserById(userDto.Id);
            if (existingUser == null)
            {
                return null; // Return null if user not found
            }

            // Maintain the role assigned to the user
            string assignedRole = existingUser.Role;
            _mapper.Map(userDto, existingUser); // Map new properties to existing user
            existingUser.Role = assignedRole; // Re-assign the original role

            // Update user in the repository
            await _userRepository.UpdateUser(existingUser);
            return _mapper.Map<UserDto>(existingUser); // Return updated user
        }

        // Deletes a user by their ID
        public async Task DeleteUser(string id)
        {
            await _userRepository.DeleteUser(id); // Delete user from the repository
        }

        // Assigns a role to a user and creates a vendor if necessary
        public async Task<bool> AssignRole(string userId, string role)
        {
            var allowedRoles = new List<string> { "Admin", "Vendor", "Customer", "CSR" };

            // Validate the assigned role
            if (!allowedRoles.Contains(role))
            {
                throw new ArgumentException("Invalid role. Allowed roles are: Admin, Vendor, Customer, CSR");
            }

            var user = await _userRepository.GetUserById(userId); // Fetch user by ID
            if (user != null)
            {
                user.Role = role; // Assign the new role
                await _userRepository.UpdateUser(user); // Update user in the repository

                // If the user is assigned the "Vendor" role, create a vendor
                if (role == "Vendor")
                {
                    var vendor = new Vendor
                    {
                        Id = userId,
                        VendorName = user.UserName,
                        ProductIds = new List<string>(), // Initialize empty product IDs
                        VendorRank = 0,
                        IsActive = false
                    };
                    await _vendorRepository.CreateVendor(vendor); // Create vendor
                    return true; // Role assigned successfully
                }

                return true; // User found and updated
            }

            return false; // User not found
        }
    }
}
