using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.DTOs
{
    public class JwtResponseDto
    {
        public string Token { get; set; }
        public string Role { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
    }
}
