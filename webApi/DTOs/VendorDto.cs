using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.DTOs
{
    // Data Transfer Object for vendor details
    public class VendorDto
    {
        // Unique identifier for the vendor
        public string Id { get; set; }

        // Name of the vendor
        public string VendorName { get; set; }

        // List of product IDs associated with the vendor
        public List<string> ProductIds { get; set; }

        // Rank of the vendor, typically used for sorting or prioritization
        public decimal VendorRank { get; set; }

        // Indicates if the vendor is currently active
        public bool IsActive { get; set; }
    }
}
