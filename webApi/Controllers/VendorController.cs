// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: VendorController manages vendor-related operations such as
// retrieving, creating, updating, and deleting vendor records. Access to
// these endpoints is restricted to users with the Admin role.
// -----------------------------------------------------------------------------

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

        // Constructor to inject the IVendorService dependency.
        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        // GET: api/vendor
        // Retrieves a list of all vendors.
        [HttpGet]
        public async Task<IActionResult> GetAllVendors()
        {
            var vendors = await _vendorService.GetAllVendors();
            return Ok(vendors); // Return 200 OK with the list of vendors.
        }

        // GET: api/vendor/getById
        // Retrieves a vendor by their unique identifier.
        [HttpGet("getById")]
        public async Task<IActionResult> GetVendorById([FromBody] IdDto idDto)
        {
            var vendor = await _vendorService.GetVendorById(idDto.Id);
            if (vendor == null)
            {
                return NotFound(new { error = "Vendor not found" }); // Return 404 Not Found if vendor doesn't exist.
            }
            return Ok(vendor); // Return 200 OK with vendor details.
        }

        // POST: api/vendor
        // Creates a new vendor record.
        [HttpPost]
        public async Task<IActionResult> CreateVendor([FromBody] VendorDto vendorDto)
        {
            var vendor = await _vendorService.CreateVendor(vendorDto);
            if (vendor == null)
            {
                return BadRequest(new { error = "Vendor already exists" }); // Return 400 Bad Request if vendor already exists.
            }
            return Ok(vendor); // Return 200 OK with created vendor details.
        }

        // PUT: api/vendor
        // Updates the details of an existing vendor.
        [HttpPut]
        public async Task<IActionResult> UpdateVendor([FromBody] VendorDto vendorDto)
        {
            var updatedVendor = await _vendorService.UpdateVendor(vendorDto);
            if (updatedVendor == null)
            {
                return NotFound(new { error = "Vendor not found" }); // Return 404 Not Found if vendor doesn't exist.
            }
            return Ok(updatedVendor); // Return 200 OK with updated vendor details.
        }

        // DELETE: api/vendor/delete
        // Deletes a vendor based on their unique identifier.
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteVendor([FromBody] IdDto idDto)
        {
            var vendor = await _vendorService.GetVendorById(idDto.Id);
            if (vendor == null)
            {
                return NotFound(new { error = "Vendor not found" }); // Return 404 Not Found if vendor doesn't exist.
            }

            await _vendorService.DeleteVendor(idDto.Id);
            return NoContent(); // Return 204 No Content if deletion is successful.
        }
    }
}
