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
        Task<Product> CreateProduct(ProductDto productDto);
        Task<ProductDto> UpdateProduct(ProductDto productDto);
        Task DeleteProduct(string id);
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
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

        public async Task<Product> CreateProduct(ProductDto productDto)
        {

            var existingProduct = await _productRepository.GetProductByProductName(productDto.ProductName);
            if (existingProduct != null)
            {
                return null;
            }

            var newProduct = new Product
            {
                ProductName=productDto.ProductName,
                ProductImage=productDto.ProductImage,
                ProductDescription=productDto.ProductDescription,
                ProductPrice=productDto.ProductPrice,
                ProductRating=productDto.ProductRating,
                CategoryName=productDto.CategoryName,
                ProductStock=productDto.ProductStock,
                IsActive=productDto.IsActive,
                VendorId=productDto.VendorId

            };
            await _productRepository.CreateProduct(newProduct);
            return newProduct;
        }

        public async Task<ProductDto> UpdateProduct(ProductDto productDto)
        {
            var existingProduct = await _productRepository.GetProductById(productDto.Id);
            if (existingProduct == null)
            {
                return null;
            }

            var updatedProduct = _mapper.Map<Product>(productDto);
            updatedProduct.Id = existingProduct.Id;
            await _productRepository.UpdateProduct(updatedProduct);
            return _mapper.Map<ProductDto>(updatedProduct);
        }

        public async Task DeleteProduct(string id)
        {
            await _productRepository.DeleteProduct(id);
        }

        private string GenerateProductId()
        {
            return $"ID{DateTime.Now.Ticks.ToString().Substring(0, 3)}";
        }
    }
}