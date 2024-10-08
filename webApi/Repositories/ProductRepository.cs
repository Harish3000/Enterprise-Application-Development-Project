// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: ProductRepository for handling operations related to products 
// in the system, including retrieval, creation, update, and deletion.
// -----------------------------------------------------------------------------

using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface IProductRepository
    {
        // Retrieves all products from the database
        Task<List<Product>> GetAllProducts();

        // Retrieves a specific product by its ID
        Task<Product> GetProductById(string id);

        // Retrieves a specific product by its name
        Task<Product> GetProductByProductName(string productName);

        // Retrieves all products associated with a specific vendor name
        Task<List<Product>> GetProductsByVendorName(string vendorName);

        // Retrieves all products associated with a specific vendor ID
        Task<List<Product>> GetProductsByVendorId(string vendorId);

        // Creates a new product in the database
        Task CreateProduct(Product product);

        // Updates an existing product in the database
        Task UpdateProduct(Product product);

        // Deletes a product from the database by its ID
        Task DeleteProduct(string id);

        // Reduces the stock of a product by a specified quantity
        Task<bool> ReduceProductStock(string productId, int quantity);
    }

    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _products;

        public ProductRepository(IMongoDatabase database)
        {
            // Initializes the products collection from the MongoDB database
            _products = database.GetCollection<Product>("Products");
        }

        // Retrieves all products from the database
        public async Task<List<Product>> GetAllProducts()
        {
            return await _products.Find(_ => true).ToListAsync();
        }

        // Retrieves a specific product by its ID
        public async Task<Product> GetProductById(string id)
        {
            return await _products.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        // Retrieves a specific product by its name
        public async Task<Product> GetProductByProductName(string productName)
        {
            return await _products.Find(p => p.ProductName == productName).FirstOrDefaultAsync();
        }

        // Retrieves all products associated with a specific vendor name
        public async Task<List<Product>> GetProductsByVendorName(string vendorName)
        {
            return await _products.Find(p => p.VendorName == vendorName).ToListAsync();
        }

        // Creates a new product in the database
        public async Task CreateProduct(Product product)
        {
            await _products.InsertOneAsync(product);
        }

        // Updates an existing product in the database
        public async Task UpdateProduct(Product product)
        {
            await _products.ReplaceOneAsync(p => p.Id == product.Id, product);
        }

        // Deletes a product from the database by its ID
        public async Task DeleteProduct(string id)
        {
            await _products.DeleteOneAsync(p => p.Id == id);
        }

        // Reduces the stock of a product by a specified quantity
        public async Task<bool> ReduceProductStock(string productId, int quantity)
        {
            var product = await _products.Find(p => p.Id == productId).FirstOrDefaultAsync();
            if (product == null)
            {
                // Product not found
                return false;
            }

            if (product.ProductStock < quantity)
            {
                // Not enough stock
                return false;
            }

            // Reduce stock and update product
            var updatedStock = product.ProductStock - quantity;
            var updateDefinition = Builders<Product>.Update.Set(p => p.ProductStock, updatedStock);

            var result = await _products.UpdateOneAsync(p => p.Id == productId, updateDefinition);

            return result.ModifiedCount > 0;
        }

        // Retrieves all products associated with a specific vendor ID
        public async Task<List<Product>> GetProductsByVendorId(string vendorId)
        {
            return await _products.Find(p => p.VendorId == vendorId).ToListAsync();
        }
    }
}
