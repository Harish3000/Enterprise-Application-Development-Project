// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: VendorService for handling vendor-related operations, including 
// fetching, updating, deleting vendors, and creating new vendors.
// -----------------------------------------------------------------------------

using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IVendorService
    {
        // Retrieves all vendors
        Task<List<VendorDto>> GetAllVendors();

        // Retrieves a vendor by their ID
        Task<VendorDto> GetVendorById(string id);

        // Retrieves a vendor by their name
        Task<Vendor> GetVendorByName(string name);

        // Creates a new vendor and returns it
        Task<Vendor> CreateVendor(VendorDto vendorDto);

        // Updates an existing vendor and returns the updated vendor
        Task<VendorDto> UpdateVendor(VendorDto vendorDto);

        // Deletes a vendor by their ID
        Task DeleteVendor(string id);

        // Checks if a vendor exists by their name
        Task<bool> VendorExists(string name);

        // Adds product IDs to a vendor's product list
        Task<bool> AddProductIdsToVendor(string vendorId, List<string> productIds);
    }

    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository; // Repository for vendor data
        private readonly IMapper _mapper; // AutoMapper for DTO conversion
        private readonly IUserRepository _userRepository; // Repository for user data

        public VendorService(IVendorRepository vendorRepository, IMapper mapper, IUserRepository userRepository)
        {
            _vendorRepository = vendorRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        // Retrieves all vendors and maps them to VendorDto
        public async Task<List<VendorDto>> GetAllVendors()
        {
            var vendors = await _vendorRepository.GetAllVendors(); // Fetch all vendors
            return _mapper.Map<List<VendorDto>>(vendors); // Map to VendorDto
        }

        // Retrieves a vendor by their name
        public async Task<Vendor> GetVendorByName(string name)
        {
            var vendor = await _vendorRepository.GetVendorByVendorName(name); // Fetch vendor by name
            return vendor; // Return the vendor
        }

        // Retrieves a vendor by their ID and maps to VendorDto
        public async Task<VendorDto> GetVendorById(string id)
        {
            var vendor = await _vendorRepository.GetVendorById(id); // Fetch vendor by ID
            return _mapper.Map<VendorDto>(vendor); // Map to VendorDto
        }

        // Creates a new vendor if they don't already exist
        public async Task<Vendor> CreateVendor(VendorDto vendorDto)
        {
            // Check if vendor already exists
            var existingVendor = await _vendorRepository.GetVendorByVendorName(vendorDto.VendorName);
            if (existingVendor != null)
            {
                return null; // Vendor already exists
            }

            // Create a new vendor object
            var newVendor = new Vendor
            {
                VendorName = vendorDto.VendorName,
                ProductIds = vendorDto.ProductIds,
                VendorRank = vendorDto.VendorRank,
                IsActive = vendorDto.IsActive
            };
            await _vendorRepository.CreateVendor(newVendor); // Add new vendor to repository

            // Check if vendor exists in the user table
            var existingUser = await _userRepository.GetUserByUserName(vendorDto.VendorName);
            if (existingUser == null) // If not, create a new user
            {
                var newUserVendor = new User
                {
                    Id = newVendor.Id,
                    UserName = vendorDto.VendorName,
                    Email = vendorDto.VendorName + "@pixelcart.com",
                    Password = vendorDto.VendorName,
                    Address = "pending...",
                    Role = "Vendor"
                };
                await _userRepository.CreateUser(newUserVendor); // Add new user to repository
            }

            return newVendor; // Return the created vendor
        }

        // Updates an existing vendor and returns the updated vendor
        public async Task<VendorDto> UpdateVendor(VendorDto vendorDto)
        {
            var existingVendor = await _vendorRepository.GetVendorById(vendorDto.Id); // Fetch existing vendor by ID
            if (existingVendor == null)
            {
                return null; // Return null if vendor not found
            }

            // Map updated properties to existing vendor
            var updatedVendor = _mapper.Map<Vendor>(vendorDto);
            updatedVendor.Id = existingVendor.Id; // Retain the existing ID
            await _vendorRepository.UpdateVendor(updatedVendor); // Update vendor in repository
            return _mapper.Map<VendorDto>(updatedVendor); // Return updated vendor as VendorDto
        }

        // Deletes a vendor by their ID
        public async Task DeleteVendor(string id)
        {
            await _vendorRepository.DeleteVendor(id); // Delete vendor from repository
        }

        // Checks if a vendor exists by their name
        public async Task<bool> VendorExists(string name)
        {
            var vendor = await _vendorRepository.GetVendorByVendorName(name); // Fetch vendor by name
            return vendor != null; // Return true if vendor exists, else false
        }

        // Adds product IDs to a vendor's product list
        public async Task<bool> AddProductIdsToVendor(string vendorId, List<string> productIds)
        {
            var vendor = await _vendorRepository.GetVendorById(vendorId); // Fetch vendor by ID
            if (vendor == null)
            {
                return false; // Vendor not found
            }

            // Use the repository method to add product IDs
            return await _vendorRepository.AddProductIdsToVendor(vendorId, productIds); // Return result of adding product IDs
        }
    }
}
