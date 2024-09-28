using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webApi.DTOs;
using webApi.Services;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVendors()
        {
            var vendors = await _vendorService.GetAllVendors();
            return Ok(vendors);
        }

        [HttpGet("getById")]
        public async Task<IActionResult> GetVendorById([FromBody] IdDto idDto)
        {
            var vendor = await _vendorService.GetVendorById(idDto.Id);
            if (vendor == null)
            {
                return NotFound(new { error = "Vendor not found" }); // Error response
            }
            return Ok(vendor);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVendor([FromBody] VendorDto vendorDto)
        {
            var vendor = await _vendorService.CreateVendor(vendorDto);
            if (vendor == null)
            {
                return BadRequest(new { error = "Vendor already exists" }); // Error response
            }
            return Ok(vendor);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateVendor([FromBody] VendorDto vendorDto)
        {
            var updatedVendor = await _vendorService.UpdateVendor(vendorDto);
            if (updatedVendor == null)
            {
                return NotFound(new { error = "Vendor not found" }); // Error response
            }
            return Ok(updatedVendor);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteVendor([FromBody] IdDto idDto)
        {
            var vendor = await _vendorService.GetVendorById(idDto.Id);
            if (vendor == null)
            {
                return NotFound(new { error = "Vendor not found" }); // Error response
            }

            await _vendorService.DeleteVendor(idDto.Id);
            return NoContent(); // No Content response
        }
    }
}
