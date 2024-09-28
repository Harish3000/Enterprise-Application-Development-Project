using MongoDB.Driver;
using webApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webApi.Repositories
{
    public interface ISaleRepository
    {
        Task<List<Sale>> GetAllSales();
        Task<Sale> GetSaleById(string id);
        Task<List<Sale>> GetSalesByProductId(string productId);
        Task<List<Sale>> GetSalesByVendorId(string vendorId);
        Task CreateSale(Sale sale);
        Task UpdateSale(Sale sale);
        Task DeleteSale(string id);
    }

    public class SaleRepository : ISaleRepository
    {
        private readonly IMongoCollection<Sale> _sales;

        public SaleRepository(IMongoDatabase database)
        {
            _sales = database.GetCollection<Sale>("Sales");
        }

        // Retrieve all sales
        public async Task<List<Sale>> GetAllSales()
        {
            return await _sales.Find(_ => true).ToListAsync();
        }

        // Retrieve sale by Id
        public async Task<Sale> GetSaleById(string id)
        {
            return await _sales.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        // Retrieve sales by ProductId
        public async Task<List<Sale>> GetSalesByProductId(string productId)
        {
            return await _sales.Find(s => s.ProductId == productId).ToListAsync();
        }

        // Retrieve sales by VendorId
        public async Task<List<Sale>> GetSalesByVendorId(string vendorId)
        {
            return await _sales.Find(s => s.VendorId == vendorId).ToListAsync();
        }

        // Create a new sale
        public async Task CreateSale(Sale sale)
        {
            await _sales.InsertOneAsync(sale);
        }

        // Update an existing sale
        public async Task UpdateSale(Sale sale)
        {
            await _sales.ReplaceOneAsync(s => s.Id == sale.Id, sale);
        }

        // Delete a sale by Id
        public async Task DeleteSale(string id)
        {
            await _sales.DeleteOneAsync(s => s.Id == id);
        }
    }
}
