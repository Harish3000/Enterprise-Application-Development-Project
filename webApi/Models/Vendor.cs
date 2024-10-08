using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace webApi.Models
{
    // Represents a vendor in the system
    public class Vendor
    {
        // Unique identifier for the vendor
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // Name of the vendor
        public string VendorName { get; set; }

        // List of product IDs associated with the vendor
        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> ProductIds { get; set; }

        // Ranking of the vendor, possibly based on performance or reviews
        public decimal VendorRank { get; set; }

        // Indicates if the vendor is currently active
        public bool IsActive { get; set; }
    }
}
