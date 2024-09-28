using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webApi.DTOs
{
    public class VendorDto
    {
        public string Id { get; set; }

        public string VendorName { get; set; }

        public List<string> ProductIds { get; set; }

        public decimal VendorRank { get; set; }

        public bool IsActive { get; set; }
    }
}
