// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: ProductService for handling operations related to products,
// including fetching, creating, updating, and deleting products, and retrieving
// products by vendor information.
// -----------------------------------------------------------------------------

using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IProductService
    {
        // Retrieves all products and maps them to ProductDto
        Task<List<ProductDto>> GetAllProducts();

        // Retrieves a product by its ID and maps it to ProductDto
        Task<ProductDto> GetProductById(string id);

        // Retrieves a product by its name
        Task<Product> GetProductByName(string name);

        // Retrieves products associated with a specific vendor by vendor name
        Task<List<ProductDto>> GetProductsByVendorName(string vendorName);

        // Creates a new product and returns the product along with any error message
        Task<(Product product, string error)> CreateProduct(ProductDto productDto);

        // Updates an existing product and returns the updated ProductDto
        Task<ProductDto> UpdateProduct(ProductDto productDto);

        // Deletes a product by its ID and returns an error message if not found
        Task<string> DeleteProduct(string id);

        // Reduces the stock of a product and returns an error message if it fails
        Task<string> ReduceProductStock(string productId, int quantity);

        // Retrieves products by the vendor's ID and maps them to ProductDto
        Task<List<ProductDto>> GetProductsByVendorId(string vendorId);
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IVendorService _vendorService;

        public ProductService(IProductRepository productRepository, IMapper mapper, IVendorService vendorService)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _vendorService = vendorService;
        }

        // Retrieves all products and maps them to ProductDto
        public async Task<List<ProductDto>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProducts(); // Fetch all products
            return _mapper.Map<List<ProductDto>>(products); // Map to ProductDto
        }

        // Retrieves a product by its ID and maps it to ProductDto
        public async Task<ProductDto> GetProductById(string id)
        {
            var product = await _productRepository.GetProductById(id); // Fetch product by ID
            return _mapper.Map<ProductDto>(product); // Map to ProductDto
        }

        // Retrieves a product by its name
        public async Task<Product> GetProductByName(string name)
        {
            var product = await _productRepository.GetProductByProductName(name); // Fetch product by name
            return product; // Return the found product
        }

        // Retrieves products associated with a specific vendor by vendor name
        public async Task<List<ProductDto>> GetProductsByVendorName(string vendorName)
        {
            var products = await _productRepository.GetProductsByVendorName(vendorName); // Fetch products by vendor name
            return _mapper.Map<List<ProductDto>>(products); // Map to ProductDto
        }

        // Creates a new product if it does not exist and the vendor is valid
        public async Task<(Product product, string error)> CreateProduct(ProductDto productDto)
        {
            // Check if the product already exists
            var existingProduct = await _productRepository.GetProductByProductName(productDto.ProductName);
            if (existingProduct != null)
            {
                return (null, "Product already exists"); // Return error if exists
            }

            // Check if the vendor exists
            var vendorExists = await _vendorService.GetVendorByName(productDto.VendorName);
            if (vendorExists == null)
            {
                return (null, "Vendor does not exist"); // Return error if vendor does not exist
            }

            // Create a new product if checks pass
            var newProduct = new Product
            {
                ProductName = productDto.ProductName,
                ProductImage = productDto.ProductImage,
                ProductDescription = productDto.ProductDescription,
                ProductPrice = productDto.ProductPrice,
                ProductRating = productDto.ProductRating,
                CategoryName = productDto.CategoryName,
                ProductStock = productDto.ProductStock,
                IsActive = productDto.IsActive,
                VendorId = vendorExists.Id,
                VendorName = productDto.VendorName
            };

            await _productRepository.CreateProduct(newProduct); // Save the new product
            // Add the new product ID to the vendor's product list
            var addProductsToVendor = await _vendorService.AddProductIdsToVendor(vendorExists.Id, [newProduct.Id ]);
            return (newProduct, null); // Return the new product
        }

        // Updates an existing product
        public async Task<ProductDto> UpdateProduct(ProductDto productDto)
        {
            var existingProduct = await _productRepository.GetProductById(productDto.Id); // Fetch existing product
            if (existingProduct == null)
            {
                return null; // Return null if not found
            }

            var existingVendor = await _vendorService.GetVendorByName(productDto.VendorName); // Check vendor
            if (existingVendor == null)
            {
                return null; // Return null if vendor not found
            }

            var updatedProduct = _mapper.Map<Product>(productDto); // Map to Product
            updatedProduct.Id = existingProduct.Id; // Set the existing product ID
            await _productRepository.UpdateProduct(updatedProduct); // Save changes to repository
            return _mapper.Map<ProductDto>(updatedProduct); // Map back to ProductDto
        }

        // Deletes a product by its ID
        public async Task<string> DeleteProduct(string id)
        {
            // Check if the product exists
            var existingProduct = await _productRepository.GetProductById(id);
            if (existingProduct == null)
            {
                return "Product does not exist"; // Return error if not found
            }

            await _productRepository.DeleteProduct(id); // Delete the product
            return null; // Return null if deletion is successful
        }

        // Reduces the stock of a product
        public async Task<string> ReduceProductStock(string productId, int quantity)
        {
            // Check if the product exists and if the stock can be reduced
            var isSuccess = await _productRepository.ReduceProductStock(productId, quantity);

            if (!isSuccess)
            {
                return "Failed to reduce product stock. Either the product does not exist or there is insufficient stock."; // Return error if failed
            }

            return null; // Stock reduced successfully
        }

        // Retrieves products by the vendor's ID and maps them to ProductDto
        public async Task<List<ProductDto>> GetProductsByVendorId(string vendorId)
        {
            var products = await _productRepository.GetProductsByVendorId(vendorId); // Fetch products by vendor ID
            return _mapper.Map<List<ProductDto>>(products); // Map to ProductDto
        }
    }
}
