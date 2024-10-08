// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: VendorRepository for handling operations related to vendors in
// the system, including retrieval, creation, update, deletion, and product ID 
// management for vendors.
// -----------------------------------------------------------------------------

using MongoDB.Driver;
using webApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webApi.Repositories
{
    public interface IVendorRepository
    {
        // Retrieves all vendors from the database
        Task<List<Vendor>> GetAllVendors();

        // Retrieves a vendor by their unique ID
        Task<Vendor> GetVendorById(string id);

        // Retrieves a vendor by their name
        Task<Vendor> GetVendorByVendorName(string vendorName);

        // Creates a new vendor in the database
        Task CreateVendor(Vendor vendor);

        // Updates an existing vendor in the database
        Task UpdateVendor(Vendor vendor);

        // Deletes a vendor from the database by their ID
        Task DeleteVendor(string id);

        // Adds product IDs to a vendor's product list
        Task<bool> AddProductIdsToVendor(string vendorId, List<string> productIds);
    }

    public class VendorRepository : IVendorRepository
    {
        private readonly IMongoCollection<Vendor> _vendors;

        public VendorRepository(IMongoDatabase database)
        {
            // Initializes the vendors collection from the MongoDB database
            _vendors = database.GetCollection<Vendor>("Vendors");
        }

        // Retrieves all vendors from the database
        public async Task<List<Vendor>> GetAllVendors()
        {
            return await _vendors.Find(_ => true).ToListAsync();
        }

        // Retrieves a vendor by their unique ID
        public async Task<Vendor> GetVendorById(string id)
        {
            return await _vendors.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        // Retrieves a vendor by their name
        public async Task<Vendor> GetVendorByVendorName(string vendorName)
        {
            return await _vendors.Find(p => p.VendorName == vendorName).FirstOrDefaultAsync();
        }

        // Creates a new vendor in the database
        public async Task CreateVendor(Vendor vendor)
        {
            await _vendors.InsertOneAsync(vendor);
        }

        // Updates an existing vendor in the database
        public async Task UpdateVendor(Vendor vendor)
        {
            await _vendors.ReplaceOneAsync(p => p.Id == vendor.Id, vendor);
        }

        // Deletes a vendor from the database by their ID
        public async Task DeleteVendor(string id)
        {
            await _vendors.DeleteOneAsync(p => p.Id == id);
        }

        // Adds product IDs to a vendor's product list
        public async Task<bool> AddProductIdsToVendor(string vendorId, List<string> productIds)
        {
            var vendor = await GetVendorById(vendorId);
            if (vendor == null)
            {
                return false; // Vendor not found
            }

            // Check for duplicates before adding
            foreach (var productId in productIds)
            {
                if (!vendor.ProductIds.Contains(productId))
                {
                    vendor.ProductIds.Add(productId);
                }
            }

            // Update the vendor with the new product IDs
            var result = await _vendors.ReplaceOneAsync(p => p.Id == vendorId, vendor);
            return result.IsAcknowledged; // Return true if the operation was acknowledged
        }
    }
}
