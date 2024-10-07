using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProducts();
        Task<ProductDto> GetProductById(string id);
        Task<Product> GetProductByName(string name);
        Task<List<ProductDto>> GetProductsByVendorName(string vendorName);
        Task<(Product product, string error)> CreateProduct(ProductDto productDto);
        Task<ProductDto> UpdateProduct(ProductDto productDto);
        Task<string> DeleteProduct(string id);
        Task<string> ReduceProductStock(string productId, int quantity);
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

        public async Task<List<ProductDto>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProducts();
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto> GetProductById(string id)
        {
            var product = await _productRepository.GetProductById(id);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<Product> GetProductByName(string name)
        {
            var product = await _productRepository.GetProductByProductName(name);
            return product;
        }

        public async Task<List<ProductDto>> GetProductsByVendorName(string vendorName)
        {
            var products = await _productRepository.GetProductsByVendorName(vendorName);
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<(Product product, string error)> CreateProduct(ProductDto productDto)
        {
            // Check if the product already exists
            var existingProduct = await _productRepository.GetProductByProductName(productDto.ProductName);
            if (existingProduct != null)
            {
                return (null, "Product already exists");
            }

            // Check if the vendor exists
            var vendorExists = await _vendorService.GetVendorByName(productDto.VendorName);
            if (vendorExists==null)
            {
                return (null, "Vendor does not exist");
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

            

            await _productRepository.CreateProduct(newProduct);
            //add products to vendor table
            var AddProductsToVendor = await _vendorService.AddProductIdsToVendor(vendorExists.Id, [newProduct.Id]);
            return (newProduct, null);
        }

        public async Task<ProductDto> UpdateProduct(ProductDto productDto)
        {
            var existingProduct = await _productRepository.GetProductById(productDto.Id);
            if (existingProduct == null)
            {
                return null;
            }

            var existingVendor = await _vendorService.GetVendorByName(productDto.VendorName);
            if (existingVendor == null)
            {
                return null;
            }

            var updatedProduct = _mapper.Map<Product>(productDto);
            updatedProduct.Id = existingProduct.Id;
            await _productRepository.UpdateProduct(updatedProduct);
            return _mapper.Map<ProductDto>(updatedProduct);
        }

        public async Task<string> DeleteProduct(string id)
        {
            // Check if the product exists
            var existingProduct = await _productRepository.GetProductById(id);
            if (existingProduct == null)
            {
                return "Product does not exist";
            }

            await _productRepository.DeleteProduct(id);
            return null;
        }


        public async Task<string> ReduceProductStock(string productId, int quantity)
        {
            // Check if the product exists and if the stock can be reduced
            var isSuccess = await _productRepository.ReduceProductStock(productId, quantity);

            if (!isSuccess)
            {
                return "Failed to reduce product stock. Either the product does not exist or there is insufficient stock.";
            }

            return null; // Stock reduced successfully
        }


        public async Task<List<ProductDto>> GetProductsByVendorId(string vendorId)
        {
            var products = await _productRepository.GetProductsByVendorId(vendorId);
            return _mapper.Map<List<ProductDto>>(products);
        }
    }
}
