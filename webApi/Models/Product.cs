using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webApi.Models
{
    // Represents a product in the system
    public class Product
    {
        // Unique identifier for the product
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // Name of the product
        public string ProductName { get; set; }

        // URL or path to the product image
        public string ProductImage { get; set; }

        // Detailed description of the product
        public string ProductDescription { get; set; }

        // Price of the product
        public decimal ProductPrice { get; set; }

        // Rating of the product (e.g., out of 5)
        public decimal ProductRating { get; set; }

        // Category to which the product belongs
        public string CategoryName { get; set; }

        // Amount of product available in stock
        public int ProductStock { get; set; }

        // Indicates if the product is active (available for sale)
        public bool IsActive { get; set; }

        // Unique identifier for the vendor supplying the product
        [BsonRepresentation(BsonType.ObjectId)]
        public string VendorId { get; set; }

        // Name of the vendor supplying the product
        public string VendorName { get; set; }
    }
}
