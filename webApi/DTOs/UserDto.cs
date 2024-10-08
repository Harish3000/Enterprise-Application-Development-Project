namespace webApi.DTOs
{
    // Data Transfer Object for user details
    public class UserDto
    {
        // Unique identifier for the user
        public string Id { get; set; }

        // Username of the user
        public string UserName { get; set; }

        // Email address of the user
        public string Email { get; set; }

        // Physical address of the user
        public string Address { get; set; }

        // Role of the user (e.g., Admin, Vendor, Customer)
        public string Role { get; set; }
    }
}
