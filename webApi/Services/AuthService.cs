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
        Task<JwtResponseDto> Login(LoginDto loginDto);
        Task<User> Register(RegisterDto registerDto);
        Task CreateDefaultAdminAccount();

        Task<User> GetUserFromJwt();
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(IUserRepository userRepository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<JwtResponseDto> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmail(loginDto.Email);
            if (user == null || !VerifyPassword(loginDto.Password, user.Password))
            {
                return null;
            }

            // Generate JWT Token
            var token = GenerateJwtToken(user);

            // Create and return the JwtResponseDto
            var jwtResponse = new JwtResponseDto
            {
                Token = token,
                Role = user.Role
            };

            return jwtResponse;
        }


        public async Task<User> Register(RegisterDto registerDto)
        {
            var existingEmail = await _userRepository.GetUserByEmail(registerDto.Email);
            if (existingEmail != null)
            {
                return null;
            }

            var existingUserName = await _userRepository.GetUserByUserName(registerDto.UserName);
            if (existingUserName != null)
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
                expires: DateTime.Now.AddDays(100),
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


        public async Task<User> GetUserFromJwt()
        {
            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrWhiteSpace(token))
                throw new ArgumentException("Token is null or empty", nameof(token));

            // Remove "Bearer " prefix if present
            if (token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                token = token.Substring("Bearer ".Length).Trim();
            }

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(token) as JwtSecurityToken;

            // Check if the token is valid and contains the email claim
            if (jwtToken == null || !jwtToken.Claims.Any())
                throw new SecurityTokenException("Invalid token");

            var emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            var email = emailClaim?.Value;

            // Fetch the user by email
            var user = await _userRepository.GetUserByEmail(email);

            return user; // Return the user or null if not found
        }


    }
}