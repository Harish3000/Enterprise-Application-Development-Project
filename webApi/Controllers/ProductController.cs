using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webApi.DTOs;
using webApi.Services;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("getById")]
        public async Task<IActionResult> GetProductById([FromBody] IdDto idDto)
        {
            var product = await _productService.GetProductById(idDto.Id);
            if (product == null)
            {
                return NotFound(new { error = "Product not found" }); 
            }
            return Ok(product);
        }


        [HttpGet("getByVendorId")]
        public async Task<IActionResult> GetProductsByVendorName(VendorNameDto vendorNameDto)
        {
            var products = await _productService.GetProductsByVendorName(vendorNameDto.VendorName);
            if (products == null || !products.Any())
            {
                return NotFound(new { error = "No products found for the specified vendor." });
            }
            return Ok(products);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Vendor")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductDto productDto)
        {
            var (product, error) = await _productService.CreateProduct(productDto);

            if (error != null)
            {
                return BadRequest(new { error }); 
            }

            return Ok(product);
        }

        [HttpPut]
        [Authorize(Roles = "Admin,Vendor")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDto productDto)
        {
            var updatedProduct = await _productService.UpdateProduct(productDto);
            if (updatedProduct == null)
            {
                return NotFound(new { error = "Product not found" }); 
            }
            return Ok(updatedProduct);
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin,Vendor")]
        public async Task<IActionResult> DeleteProduct([FromBody] IdDto idDto)
        {
            var error = await _productService.DeleteProduct(idDto.Id);

            if (error != null)
            {
                return BadRequest(new { error }); 
            }

            return NoContent(); 
        }
    }
}
