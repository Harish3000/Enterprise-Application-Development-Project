using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.Models
{
    // Represents an order in the system
    public class Order
    {
        // Unique identifier for the order
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // List of sales associated with the order
        public List<Sale> SaleList { get; set; }

        // Total price of the order
        public decimal TotalPrice { get; set; }

        // Current delivery status of the order
        public string DeliveryStatus { get; set; }

        // Indicates if the order has been paid
        public bool IsPaid { get; set; }

        // Indicates if the order has been approved
        public bool IsApproved { get; set; }

        // Indicates if the order has been dispatched
        public bool IsDispatched { get; set; }

        // Date and time the order was created, stored in UTC
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    }
}
