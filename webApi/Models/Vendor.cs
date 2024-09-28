using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace webApi.Models
{
    public class Vendor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string VendorName { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> ProductIds { get; set; }

        public decimal VendorRank { get; set; }

        public bool IsActive { get; set; }
    }
}
