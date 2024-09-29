using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface IVendorRepository
    {
        Task<List<Vendor>> GetAllVendors();
        Task<Vendor> GetVendorById(string id);

        Task<Vendor> GetVendorByVendorName(string vendorName);
        Task CreateVendor(Vendor vendor);
        Task UpdateVendor(Vendor vendor);
        Task DeleteVendor(string id);
        Task<bool> AddProductIdsToVendor(string vendorId, List<string> productIds);

    }

    public class VendorRepository : IVendorRepository
    {
        private readonly IMongoCollection<Vendor> _vendors;

        public VendorRepository(IMongoDatabase database)
        {
            _vendors = database.GetCollection<Vendor>("Vendors");
        }

        public async Task<List<Vendor>> GetAllVendors()
        {
            return await _vendors.Find(_ => true).ToListAsync();
        }

        public async Task<Vendor> GetVendorById(string id)
        {
            return await _vendors.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Vendor> GetVendorByVendorName(string vendorName)
        {
            return await _vendors.Find(p => p.VendorName == vendorName).FirstOrDefaultAsync();
        }

        public async Task CreateVendor(Vendor vendor)
        {
            await _vendors.InsertOneAsync(vendor);
        }

        public async Task UpdateVendor(Vendor vendor)
        {
            await _vendors.ReplaceOneAsync(p => p.Id == vendor.Id, vendor);
        }

        public async Task DeleteVendor(string id)
        {
            await _vendors.DeleteOneAsync(p => p.Id == id);
        }


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