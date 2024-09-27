using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;


namespace webApi.Services
{
    public interface IAuthService
    {
        Task<string> Login(LoginDto loginDto);
        Task<User> Register(RegisterDto registerDto);
        Task CreateDefaultAdminAccount();
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<string> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmail(loginDto.Email);
            if (user == null || !VerifyPassword(loginDto.Password, user.Password))
            {
                return null;
            }

            var token = GenerateJwtToken(user);
            return token;
        }

        public async Task<User> Register(RegisterDto registerDto)
        {
            var existingUser = await _userRepository.GetUserByEmail(registerDto.Email);
            if (existingUser != null)
            {
                return null;
            }

            var newUser = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Password = HashPassword(registerDto.Password),
                Address = registerDto.Address,
                Role = "Customer"
            };

            await _userRepository.CreateUser(newUser);
            return newUser;
        }

        public async Task CreateDefaultAdminAccount()
        {
            var adminEmail = "admin@example.com";
            var existingAdmin = await _userRepository.GetUserByEmail(adminEmail);
            if (existingAdmin == null)
            {
                var adminUser = new User
                {
                    UserName = "Admin",
                    Email = adminEmail,
                    Password = HashPassword("AdminPassword123!"),
                    Address = "Admin Address",
                    Role = "Admin"
                };

                await _userRepository.CreateUser(adminUser);
            }
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }


    }
}