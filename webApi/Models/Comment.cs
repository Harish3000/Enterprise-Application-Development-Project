using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.Models
{
    // Represents a comment in the system
    public class Comment
    {
        // Unique identifier for the comment
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // Identifier for the associated product
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        // The content of the comment
        public string Description { get; set; }

        // Identifier for the user who made the comment
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        // Name of the user who made the comment
        public string UserName { get; set; }

        // Date and time the comment was posted, stored in UTC
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime PostedDate { get; set; } = DateTime.UtcNow;
    }
}
