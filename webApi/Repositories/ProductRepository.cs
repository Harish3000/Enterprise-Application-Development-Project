using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(string id);

        Task<Product> GetProductByProductName(string productName);
        Task CreateProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(string id);
    }

    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _products;

        public ProductRepository(IMongoDatabase database)
        {
            _products = database.GetCollection<Product>("Products");
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _products.Find(_ => true).ToListAsync();
        }

        public async Task<Product> GetProductById(string id)
        {
            return await _products.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Product> GetProductByProductName(string productName)
        {
            return await _products.Find(p => p.ProductName == productName).FirstOrDefaultAsync();
        }

        public async Task CreateProduct(Product product)
        {
            await _products.InsertOneAsync(product);
        }

        public async Task UpdateProduct(Product product)
        {
            await _products.ReplaceOneAsync(p => p.Id == product.Id, product);
        }

        public async Task DeleteProduct(string id)
        {
            await _products.DeleteOneAsync(p => p.Id == id);
        }
    }
}