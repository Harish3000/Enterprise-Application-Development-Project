// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: ProductController handles CRUD operations related to products, 
// including fetching products by ID, vendor, and name, as well as creating, 
// updating, and deleting products. Authorization is required for certain actions.
// -----------------------------------------------------------------------------

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

        // Constructor to inject the IProductService dependency.
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/product
        // Retrieves all products available.
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products); // Return 200 OK with the list of products.
        }

        // GET: api/product
        // Retrieves all products available.
        [HttpGet("active")]
        public async Task<IActionResult> GetAllActiveProducts()
        {
            var products = await _productService.GetAllActiveProducts();
            return Ok(products); // Return 200 OK with the list of Active products.
        }

        // POST: api/product/getById
        // Retrieves a specific product based on its ID.
        [HttpPost("getById")]
        public async Task<IActionResult> GetProductById([FromBody] IdDto idDto)
        {
            var product = await _productService.GetProductById(idDto.Id);
            if (product == null)
            {
                return NotFound(new { error = "Product not found" }); // Return 404 if product is not found.
            }
            return Ok(product); // Return 200 OK with the product details.
        }

        // GET: api/product/getByVendorId
        // Retrieves all products associated with a specific vendor ID.
        [HttpPost("getByVendorId")]
        public async Task<IActionResult> GetProductsByVendorId(IdDto idDto)
        {
            var products = await _productService.GetProductsByVendorId(idDto.Id);
            if (products == null || !products.Any())
            {
                return NotFound(new { error = "No products found for the specified vendor." });
            }
            return Ok(products); // Return 200 OK with products from the vendor.
        }

        // GET: api/product/getByVendorName
        // Retrieves all products based on the vendor's name.
        [HttpGet("getByVendorName")]
        public async Task<IActionResult> GetProductsByVendorName(VendorNameDto vendorNameDto)
        {
            var products = await _productService.GetProductsByVendorName(vendorNameDto.VendorName);
            if (products == null || !products.Any())
            {
                return NotFound(new { error = "No products found for the specified vendor." });
            }
            return Ok(products); // Return 200 OK with products from the vendor.
        }

        // POST: api/product
        // Creates a new product. Requires admin or vendor role authorization.
        [HttpPost]
        [Authorize(Roles = "Admin,Vendor")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductDto productDto)
        {
            var (product, error) = await _productService.CreateProduct(productDto);

            if (error != null)
            {
                return BadRequest(new { error }); // Return 400 Bad Request if creation fails.
            }

            return Ok(product); // Return 200 OK with the newly created product.
        }

        // PUT: api/product
        // Updates an existing product. Requires admin or vendor role authorization.
        [HttpPut]
        [Authorize(Roles = "Admin,Vendor")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDto productDto)
        {
            var updatedProduct = await _productService.UpdateProduct(productDto);
            if (updatedProduct == null)
            {
                return NotFound(new { error = "Product not found. recheck details" }); // Return 404 if product not found.
            }
            return Ok(updatedProduct); // Return 200 OK with the updated product.
        }

        // DELETE: api/product/delete
        // Deletes a product based on its ID. Requires admin or vendor role authorization.
        [HttpDelete("delete")]
        [Authorize(Roles = "Admin,Vendor")]
        public async Task<IActionResult> DeleteProduct([FromBody] IdDto idDto)
        {
            var error = await _productService.DeleteProduct(idDto.Id);

            if (error != null)
            {
                return BadRequest(new { error }); // Return 400 if deletion fails.
            }

            return NoContent(); // Return 204 No Content if deletion is successful.
        }
    }
}
