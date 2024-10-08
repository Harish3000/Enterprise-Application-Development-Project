using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webApi.Models
{
    // Represents a user in the system
    public class User
    {
        // Unique identifier for the user
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // Username of the user
        public string UserName { get; set; }

        // Email address of the user
        public string Email { get; set; }

        // Address of the user
        public string Address { get; set; }

        // Password for user authentication
        public string Password { get; set; }

        // Role of the user (e.g., Admin, User, etc.)
        public string Role { get; set; }
    }
}
