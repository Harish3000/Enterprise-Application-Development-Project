namespace webApi.DTOs
{
    // Data Transfer Object for user login
    public class LoginDto
    {
        // Email address of the user
        public string Email { get; set; }

        // Password for the user's account
        public string Password { get; set; }
    }
}
