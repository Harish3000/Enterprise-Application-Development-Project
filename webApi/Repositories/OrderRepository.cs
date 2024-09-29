using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllOrders();
        Task<Order> GetOrderById(string id);
        Task CreateOrder(Order order);
        Task UpdateOrder(Order order);
        Task DeleteOrder(string id);
    }

    public class OrderRepository : IOrderRepository
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderRepository(IMongoDatabase database)
        {
            _orders = database.GetCollection<Order>("Orders");
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await _orders.Find(_ => true).ToListAsync();
        }

        public async Task<Order> GetOrderById(string id)
        {
            return await _orders.Find(o => o.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateOrder(Order order)
        {
            await _orders.InsertOneAsync(order);
        }

        public async Task UpdateOrder(Order order)
        {
            await _orders.ReplaceOneAsync(o => o.Id == order.Id, order);
        }

        public async Task DeleteOrder(string id)
        {
            await _orders.DeleteOneAsync(o => o.Id == id);
        }
    }
}
