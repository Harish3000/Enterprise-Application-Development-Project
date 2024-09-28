using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        public string Description { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        public string UserName { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)] 
        public DateTime PostedDate { get; set; } = DateTime.UtcNow; 

    }
}
