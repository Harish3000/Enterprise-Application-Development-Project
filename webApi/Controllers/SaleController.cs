// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: SaleController handles operations related to sales transactions,
// including creating, updating, and deleting sales. It also provides functionality 
// to retrieve sales by various criteria such as product ID, vendor ID, and sale ID.
// -----------------------------------------------------------------------------

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webApi.DTOs;
using webApi.Services;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaleController : ControllerBase
    {
        private readonly ISaleService _saleService;

        // Constructor to inject the ISaleService dependency.
        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        // GET: api/sale
        // Retrieves all sales.
        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _saleService.GetAllSales();
            return Ok(sales); // Return 200 OK with the list of sales.
        }

        // POST: api/sale/addToCart
        // Creates a new sale record based on sale data provided.
        [HttpPost("addToCart")]
        public async Task<IActionResult> CreateSale([FromBody] SaleDto saleDto)
        {
            var (sale, error) = await _saleService.CreateSale(saleDto);
            if (sale == null)
            {
                return BadRequest(new { error }); // Return 400 Bad Request if creation fails.
            }
            return CreatedAtAction(nameof(GetSaleById), new { id = sale.Id }, sale); // Return 201 Created.
        }

        // PUT: api/sale
        // Updates an existing sale based on sale data provided.
        [HttpPut]
        public async Task<IActionResult> UpdateSale([FromBody] SaleDto saleDto)
        {
            try
            {
                var updatedSale = await _saleService.UpdateSale(saleDto);
                return Ok(updatedSale); // Return 200 OK with the updated sale.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 Not Found if the sale is not found.
            }
        }

        // DELETE: api/sale/delete
        // Deletes a sale record based on the sale ID provided.
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteSale([FromBody] IdDto idDto)
        {
            try
            {
                var error = await _saleService.DeleteSale(idDto.Id);
                if (error != null)
                {
                    return BadRequest(new { error }); // Return 400 Bad Request if deletion fails.
                }
                return NoContent(); // Return 204 No Content if deletion succeeds.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 Not Found if the sale is not found.
            }
        }

        // GET: api/sale/getById
        // Retrieves a specific sale based on the sale ID provided.
        [HttpGet("getById")]
        public async Task<IActionResult> GetSaleById([FromBody] IdDto idDto)
        {
            try
            {
                var sale = await _saleService.GetSaleById(idDto.Id);
                return Ok(sale); // Return 200 OK with the sale details.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 Not Found if the sale is not found.
            }
        }

        // GET: api/sale/getByProductId
        // Retrieves all sales associated with a specific product ID.
        [HttpGet("getByProductId")]
        public async Task<IActionResult> GetSalesByProductId([FromBody] IdDto idDto)
        {
            try
            {
                var sales = await _saleService.GetSalesByProductId(idDto.Id);
                return Ok(sales); // Return 200 OK with the list of sales for the product.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 Not Found if no sales are found.
            }
        }

        // GET: api/sale/getByVendorId
        // Retrieves all sales associated with a specific vendor ID.
        [HttpGet("getByVendorId")]
        public async Task<IActionResult> GetSalesByVendorId([FromBody] IdDto idDto)
        {
            try
            {
                var sales = await _saleService.GetSalesByVendorId(idDto.Id);
                return Ok(sales); // Return 200 OK with the list of sales for the vendor.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 Not Found if no sales are found.
            }
        }
    }
}
