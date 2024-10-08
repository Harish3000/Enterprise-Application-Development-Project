﻿using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProducts();
        Task<ProductDto> GetProductById(string id);
        Task<(Product product, string error)> CreateProduct(ProductDto productDto);
        Task<ProductDto> UpdateProduct(ProductDto productDto);
        Task<string> DeleteProduct(string id);
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

        public async Task<(Product product, string error)> CreateProduct(ProductDto productDto)
        {
            // Check if the product already exists
            var existingProduct = await _productRepository.GetProductByProductName(productDto.ProductName);
            if (existingProduct != null)
            {
                return (null, "Product already exists");
            }

            // Check if the vendor exists
            var vendorExists = await _vendorService.VendorExists(productDto.VendorName);
            if (!vendorExists)
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
                VendorName = productDto.VendorName
            };

            await _productRepository.CreateProduct(newProduct);
            return (newProduct, null);
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
    }
}
