﻿using MongoDB.Driver;
using webApi.Models;

namespace webApi.Repositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(string id);

        Task<Product> GetProductByProductName(string productName);
        Task<List<Product>> GetProductsByVendorName(string vendorName);
        Task<List<Product>> GetProductsByVendorId(string vendorId);
        Task CreateProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(string id);

        Task<bool> ReduceProductStock(string productId, int quantity);
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

        public async Task<List<Product>> GetProductsByVendorName(string vendorName)
        {
            return await _products.Find(p => p.VendorName == vendorName).ToListAsync();
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

        public async Task<List<Product>> GetProductsByVendorId(string vendorId)
        {
            return await _products.Find(p => p.VendorId == vendorId).ToListAsync();
        }
    }
}