﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}