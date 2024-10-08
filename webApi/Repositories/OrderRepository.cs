// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: OrderRepository for handling operations related to orders 
// in the system, including retrieval, creation, update, and deletion.
// -----------------------------------------------------------------------------

using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface IOrderRepository
    {
        // Retrieves all orders from the database
        Task<List<Order>> GetAllOrders();

        // Retrieves a specific order by its ID
        Task<Order> GetOrderById(string id);

        // Creates a new order in the database
        Task CreateOrder(Order order);

        // Updates an existing order in the database
        Task UpdateOrder(Order order);

        // Deletes an order from the database by its ID
        Task DeleteOrder(string id);
    }

    public class OrderRepository : IOrderRepository
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderRepository(IMongoDatabase database)
        {
            // Initializes the orders collection from the MongoDB database
            _orders = database.GetCollection<Order>("Orders");
        }

        // Retrieves all orders from the database
        public async Task<List<Order>> GetAllOrders()
        {
            return await _orders.Find(_ => true).ToListAsync();
        }

        // Retrieves a specific order by its ID
        public async Task<Order> GetOrderById(string id)
        {
            return await _orders.Find(o => o.Id == id).FirstOrDefaultAsync();
        }

        // Creates a new order in the database
        public async Task CreateOrder(Order order)
        {
            await _orders.InsertOneAsync(order);
        }

        // Updates an existing order in the database
        public async Task UpdateOrder(Order order)
        {
            await _orders.ReplaceOneAsync(o => o.Id == order.Id, order);
        }

        // Deletes an order from the database by its ID
        public async Task DeleteOrder(string id)
        {
            await _orders.DeleteOneAsync(o => o.Id == id);
        }
    }
}
