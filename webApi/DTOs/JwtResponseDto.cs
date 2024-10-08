using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.DTOs
{
    // Data Transfer Object for JWT Response
    public class JwtResponseDto
    {
        // JWT Token for authentication
        public string Token { get; set; }

        // Role of the user (e.g., Admin, User)
        public string Role { get; set; }

        // Unique identifier for the user, represented as an ObjectId in MongoDB
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
    }
}
