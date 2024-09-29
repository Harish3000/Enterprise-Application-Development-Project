using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public List<Sale> SaleList { get; set; }

        public decimal TotalPrice { get; set; }
        public string DeliveryStatus { get; set; }

        public bool IsPaid { get; set; }
        public bool IsApproved { get; set; }
        public bool IsDispatched { get; set; }


        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    }
}
