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

        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _saleService.GetAllSales();
            return Ok(sales);
        }


        [HttpGet("getById")]
        public async Task<IActionResult> GetSaleById([FromBody] IdDto idDto)
        {
            var sale = await _saleService.GetSaleById(idDto.Id);
            if (sale == null)
            {
                return NotFound($"Sale with id '{idDto.Id}' not found.");
            }
            return Ok(sale);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSale([FromBody] SaleDto saleDto)
        {
            var (sale, error) = await _saleService.CreateSale(saleDto);
            if (sale == null)
            {
                return BadRequest(error);
            }
            return CreatedAtAction(nameof(GetSaleById), new { id = sale.Id }, sale);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSale([FromBody] SaleDto saleDto)
        {
            try
            {
                var updatedSale = await _saleService.UpdateSale(saleDto);
                return Ok(updatedSale);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: api/sale/delete
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteSale([FromBody] IdDto idDto)
        {
            var error = await _saleService.DeleteSale(idDto.Id);
            if (error != null)
            {
                return NotFound(error);
            }
            return NoContent();
        }

        // GET: api/sale/getByProductId
        [HttpGet("getByProductId")]
        public async Task<IActionResult> GetSalesByProductId([FromBody] IdDto idDto)
        {
            try
            {
                var sales = await _saleService.GetSalesByProductId(idDto.Id);
                return Ok(sales);
            }
            catch (Exception ex)
            {

                return NotFound(ex.Message);
            }
        }

        // GET: api/sale/getByVendorId
        [HttpGet("getByVendorId")]
        public async Task<IActionResult> GetSalesByVendorId([FromBody] IdDto idDto)
        {
            try
            {
                var sales = await _saleService.GetSalesByVendorId(idDto.Id);
                return Ok(sales);
            }
            catch (Exception ex)
            {

                return NotFound(ex.Message);
            }
        }
    }
}
