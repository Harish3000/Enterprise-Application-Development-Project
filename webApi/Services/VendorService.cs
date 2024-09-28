﻿using AutoMapper;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IVendorService
    {
        Task<List<VendorDto>> GetAllVendors();
        Task<VendorDto> GetVendorById(string id);
        Task<Vendor> CreateVendor(VendorDto vendorDto);
        Task<VendorDto> UpdateVendor(VendorDto vendorDto);
        Task DeleteVendor(string id);
    }

    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IMapper _mapper;

        public VendorService(IVendorRepository vendorRepository, IMapper mapper)
        {
            _vendorRepository = vendorRepository;
            _mapper = mapper;
        }

        public async Task<List<VendorDto>> GetAllVendors()
        {
            var vendors = await _vendorRepository.GetAllVendors();
            return _mapper.Map<List<VendorDto>>(vendors);
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
                return null;
            }

            var newVendor = new Vendor
            {
                VendorName = vendorDto.VendorName,
                ProductIds = vendorDto.ProductIds,
                VendorRank = vendorDto.VendorRank,
                IsActive = vendorDto.IsActive
            };

            await _vendorRepository.CreateVendor(newVendor);
            return newVendor;
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
            await _vendorRepository.DeleteVendor(id);
        }

        private string GenerateVendorId()
        {
            return $"ID{DateTime.Now.Ticks.ToString().Substring(0, 3)}";
        }
    }
}