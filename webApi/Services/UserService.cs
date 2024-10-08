﻿using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsers();
        Task<UserDto> GetUserById(string id);
        Task<UserDto> UpdateUser(UserDto userDto);
        Task DeleteUser(string id);
        Task<bool> AssignRole(string userId, string role);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto> GetUserById(string id)
        {
            var user = await _userRepository.GetUserById(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> UpdateUser(UserDto userDto)
        {
            // Check if user exists
            var existingUser = await _userRepository.GetUserById(userDto.Id);
            if (existingUser == null)
            {
                return null;
            }

            // Maintain role assigned
            string assignedRole = existingUser.Role;
            _mapper.Map(userDto, existingUser);
            existingUser.Role = assignedRole;

            // Update user
            await _userRepository.UpdateUser(existingUser);
            return _mapper.Map<UserDto>(existingUser);
        }

        public async Task DeleteUser(string id)
        {
            await _userRepository.DeleteUser(id);
        }

        public async Task<bool> AssignRole(string userId, string role)
        {
            var allowedRoles = new List<string> { "Admin", "Vendor", "Customer", "CSR" };

            if (!allowedRoles.Contains(role))
            {
                throw new ArgumentException("Invalid role. Allowed roles are: Admin, Vendor, Customer, CSR");
            }

            var user = await _userRepository.GetUserById(userId);
            if (user != null)
            {
                user.Role = role;
                await _userRepository.UpdateUser(user);
                return true; // User found and updated
            }

            return false; // User not found
        }
    }
}
