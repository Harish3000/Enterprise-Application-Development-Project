using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IVendorService
    {
        Task<List<VendorDto>> GetAllVendors();
        Task<VendorDto> GetVendorById(string id);
        Task<Vendor> GetVendorByName(string id);
        Task<Vendor> CreateVendor(VendorDto vendorDto);
        Task<VendorDto> UpdateVendor(VendorDto vendorDto);
        Task DeleteVendor(string id);
        Task<bool> VendorExists(string name);
        Task<bool> AddProductIdsToVendor(string vendorId, List<string> productIds);
    }

    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public VendorService(IVendorRepository vendorRepository, IMapper mapper, IUserRepository userRepository)
        {
            _vendorRepository = vendorRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<List<VendorDto>> GetAllVendors()
        {
            var vendors = await _vendorRepository.GetAllVendors();
            return _mapper.Map<List<VendorDto>>(vendors);
        }

        public async Task<Vendor> GetVendorByName(string id)
        {
            var vendor = await _vendorRepository.GetVendorByVendorName(id);
            return vendor;
        }

        public async Task<VendorDto> GetVendorById(string id)
        {
            var vendor = await _vendorRepository.GetVendorById(id);
            return _mapper.Map<VendorDto>(vendor);
        }

        public async Task<Vendor> CreateVendor(VendorDto vendorDto)
        {
            var existingVendor = await _vendorRepository.GetVendorByVendorName(vendorDto.VendorName);
            if (existingVendor != null)
            {
                return null; // Vendor already exists
            }

            var newVendor = new Vendor
            {
                VendorName = vendorDto.VendorName,
                ProductIds = vendorDto.ProductIds,
                VendorRank = vendorDto.VendorRank,
                IsActive = vendorDto.IsActive
            };

            var newUserVendor = new User
            {
                UserName = vendorDto.VendorName,
                Email = vendorDto.VendorName+"@pixelcart.com",
                Password = vendorDto.VendorName,
                Address = "pending...",
                Role = "Vendor"

            };


            await _userRepository.CreateUser(newUserVendor);
            await _vendorRepository.CreateVendor(newVendor);
            return newVendor; // Return the created vendor
        }

        public async Task<VendorDto> UpdateVendor(VendorDto vendorDto)
        {
            var existingVendor = await _vendorRepository.GetVendorById(vendorDto.Id);
            if (existingVendor == null)
            {
                return null;
            }

            var updatedVendor = _mapper.Map<Vendor>(vendorDto);
            updatedVendor.Id = existingVendor.Id;
            await _vendorRepository.UpdateVendor(updatedVendor);
            return _mapper.Map<VendorDto>(updatedVendor); 
        }

        public async Task DeleteVendor(string id)
        {
            await _vendorRepository.DeleteVendor(id); // Delete vendor without returning
        }

        public async Task<bool> VendorExists(string name)
        {
            var vendor = await _vendorRepository.GetVendorByVendorName(name);
            return vendor != null; // Return true if vendor exists, else false
        }


        public async Task<bool> AddProductIdsToVendor(string vendorId, List<string> productIds)
        {
            var vendor = await _vendorRepository.GetVendorById(vendorId);
            if (vendor == null)
            {
                return false; // Vendor not found
            }

            // Use the repository method to add product IDs
            return await _vendorRepository.AddProductIdsToVendor(vendorId, productIds);
        }

    }
}
