namespace webApi.DTOs
{
    // Data Transfer Object for user registration details
    public class RegisterDto
    {
        // Username chosen by the user
        public string UserName { get; set; }

        // Email address of the user
        public string Email { get; set; }

        // Password for the user account
        public string Password { get; set; }

        // Address of the user
        public string Address { get; set; }
    }
}
