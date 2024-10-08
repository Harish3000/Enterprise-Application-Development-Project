// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: SaleRepository for handling operations related to sales in the
// system, including retrieval, creation, update, and deletion.
// -----------------------------------------------------------------------------

using MongoDB.Driver;
using webApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webApi.Repositories
{
    public interface ISaleRepository
    {
        // Retrieves all sales from the database
        Task<List<Sale>> GetAllSales();

        // Retrieves a specific sale by its ID
        Task<Sale> GetSaleById(string id);

        // Retrieves all sales associated with a specific product ID
        Task<List<Sale>> GetSalesByProductId(string productId);

        // Retrieves all sales associated with a specific vendor ID
        Task<List<Sale>> GetSalesByVendorId(string vendorId);

        // Creates a new sale in the database
        Task CreateSale(Sale sale);

        // Updates an existing sale in the database
        Task UpdateSale(Sale sale);

        // Deletes a sale from the database by its ID
        Task DeleteSale(string id);

        // Retrieves all unpaid sales for a specific user
        Task<List<Sale>> GetUnpaidSalesByUserId(string userId);

        // Toggles the IsPaid status for all sales associated with a specific user
        Task ToggleIsPaidByUserId(string userId, bool isPaid);
    }

    public class SaleRepository : ISaleRepository
    {
        private readonly IMongoCollection<Sale> _sales;

        public SaleRepository(IMongoDatabase database)
        {
            // Initializes the sales collection from the MongoDB database
            _sales = database.GetCollection<Sale>("Sales");
        }

        // Retrieves all sales from the database
        public async Task<List<Sale>> GetAllSales()
        {
            return await _sales.Find(_ => true).ToListAsync();
        }

        // Retrieves a specific sale by its ID
        public async Task<Sale> GetSaleById(string id)
        {
            return await _sales.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        // Retrieves all sales associated with a specific product ID
        public async Task<List<Sale>> GetSalesByProductId(string productId)
        {
            return await _sales.Find(s => s.ProductId == productId).ToListAsync();
        }

        // Retrieves all sales associated with a specific vendor ID
        public async Task<List<Sale>> GetSalesByVendorId(string vendorId)
        {
            return await _sales.Find(s => s.VendorId == vendorId).ToListAsync();
        }

        // Creates a new sale in the database
        public async Task CreateSale(Sale sale)
        {
            await _sales.InsertOneAsync(sale);
        }

        // Updates an existing sale in the database
        public async Task UpdateSale(Sale sale)
        {
            await _sales.ReplaceOneAsync(s => s.Id == sale.Id, sale);
        }

        // Deletes a sale from the database by its ID
        public async Task DeleteSale(string id)
        {
            await _sales.DeleteOneAsync(s => s.Id == id);
        }

        // Retrieves all unpaid sales for a specific user
        public async Task<List<Sale>> GetUnpaidSalesByUserId(string userId)
        {
            return await _sales.Find(s => s.UserId == userId && !s.IsPaid).ToListAsync();
        }

        // Toggles the IsPaid status for all sales associated with a specific user
        public async Task ToggleIsPaidByUserId(string userId, bool isPaid)
        {
            var filter = Builders<Sale>.Filter.Eq(s => s.UserId, userId);
            var update = Builders<Sale>.Update.Set(s => s.IsPaid, isPaid);

            await _sales.UpdateManyAsync(filter, update);
        }
    }
}
