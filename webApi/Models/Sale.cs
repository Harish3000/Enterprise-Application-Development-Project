using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.Models
{
    // Represents a sale transaction in the system
    public class Sale
    {
        // Unique identifier for the sale
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // Unique identifier for the product being sold
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        // Unique identifier for the vendor selling the product
        [BsonRepresentation(BsonType.ObjectId)]
        public string VendorId { get; set; }

        // Unique identifier for the user making the purchase
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        // Name of the product being sold
        public string ProductName { get; set; }

        // Quantity of the product being sold
        public int ProductQuantity { get; set; }

        // Price at which the product is sold
        public decimal Price { get; set; }

        // Indicates if the sale has been paid for
        public bool IsPaid { get; set; }

        // Indicates if the sale has been approved
        public bool IsApproved { get; set; }

        // Indicates if the sale has been dispatched
        public bool IsDispatched { get; set; }

        // Date and time when the sale was made
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime SaleDate { get; set; } = DateTime.UtcNow;
    }
}
