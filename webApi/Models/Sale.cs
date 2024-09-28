using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.Models
{
    public class Sale
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string VendorId { get; set; }

        public string ProductName { get; set; }

        public int ProductQuantity { get; set; }
        public decimal Price { get; set; }
        public bool IsApproved { get; set; }
        public bool IsDispatched { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime PostedDate { get; set; } = DateTime.UtcNow;


    }
}
