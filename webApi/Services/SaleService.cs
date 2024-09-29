using MongoDB.Bson;
using System.Security.Claims;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface ISaleService
    {
        Task<List<Sale>> GetAllSales();
        Task<Sale> GetSaleById(string id);
        Task<(Sale sale, string error)> CreateSale(SaleDto saleDto);
        Task<Sale> UpdateSale(SaleDto saleDto);
        Task<string> DeleteSale(string id);
        Task<List<Sale>> GetSalesByProductId(string productId);
        Task<List<Sale>> GetSalesByVendorId(string vendorId);

        Task ToggleIsPaidStatusForUser(string userId, bool isPaid);
    }

    public class SaleService : ISaleService
    {
        private readonly ISaleRepository _saleRepository;
        private readonly IProductService _productService;
        private readonly IVendorService _vendorService;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public SaleService(ISaleRepository saleRepository, IProductService productService, IVendorService vendorService,IAuthService authService, IUserService userService)
        {
            _saleRepository = saleRepository;
            _productService = productService;
            _vendorService = vendorService;
            _authService = authService;
            _userService = userService;
        }

        public async Task<List<Sale>> GetAllSales()
        {
            return await _saleRepository.GetAllSales();
        }

        public async Task<Sale> GetSaleById(string id)
        {
            var sale = await _saleRepository.GetSaleById(id);
            if (sale == null)
            {
                throw new Exception($"Sale with id '{id}' not found.");
            }
            return sale;
        }

        public async Task<(Sale sale, string error)> CreateSale(SaleDto saleDto)
        {
            if (!ObjectId.TryParse(saleDto.ProductId, out _))
            {
                return (null, "Invalid Product Id.");
            }

            var existingProduct = await _productService.GetProductById(saleDto.ProductId);
            if (existingProduct == null)
            {
                return (null, "Product does not exist.");
            }

            var existingVendor = await _vendorService.GetVendorByName(existingProduct.VendorName);
            if (existingProduct == null)
            {
                return (null, "Vendor does not exist.");
            }

            //extract user from jwt
            var User = await  _authService.GetUserFromJwt();

            var newSale = new Sale
            {
                ProductId = saleDto.ProductId,
                VendorId = existingVendor.Id,
                UserId = User.Id,
                ProductName = existingProduct.ProductName,
                ProductQuantity = saleDto.ProductQuantity,
                Price = existingProduct.ProductPrice,
                IsPaid = saleDto.IsPaid,
                IsApproved = saleDto.IsApproved,
                IsDispatched = saleDto.IsDispatched,
                SaleDate = DateTime.UtcNow
            };

            await _saleRepository.CreateSale(newSale);
            return (newSale, null);
        }

        public async Task<Sale> UpdateSale(SaleDto saleDto)
        {
            var existingSale = await _saleRepository.GetSaleById(saleDto.Id);
            if (existingSale == null)
            {
                throw new Exception($"Sale with id '{saleDto.Id}' not found.");
            }

            if(existingSale.ProductId != saleDto.ProductId)
            {
                throw new Exception($"Product with id '{saleDto.ProductId}' not found.");
            }

            
            existingSale.ProductQuantity = saleDto.ProductQuantity;
            existingSale.IsPaid = saleDto.IsPaid;
            existingSale.IsApproved = saleDto.IsApproved;
            existingSale.IsDispatched = saleDto.IsDispatched;

            await _saleRepository.UpdateSale(existingSale);
            return existingSale;
        }

        public async Task<string> DeleteSale(string id)
        {
            var existingSale = await _saleRepository.GetSaleById(id);
            if (existingSale == null)
            {
                return $"Sale with id '{id}' does not exist.";
            }

            await _saleRepository.DeleteSale(id);
            return null;
        }

        public async Task<List<Sale>> GetSalesByProductId(string productId)
        {
            var existingProduct = await _productService.GetProductById(productId);
            if (existingProduct == null)
            {
                throw new Exception($"Product with id '{productId}' not found.");
            }
            return await _saleRepository.GetSalesByProductId(productId);
        }

        public async Task<List<Sale>> GetSalesByVendorId(string vendorId)
        {
            var existingProduct = await _vendorService.GetVendorById(vendorId);
            if (existingProduct == null)
            {
                throw new Exception($"Vendor with id '{vendorId}' not found.");
            }
            return await _saleRepository.GetSalesByVendorId(vendorId);
        }


        // toggle payment status
        public async Task ToggleIsPaidStatusForUser(string userId, bool isPaid)
        {
            var user = await _userService.GetUserById(userId);
            if (user == null)
            {
                throw new Exception($"User with id '{userId}' not found.");
            }

            await _saleRepository.ToggleIsPaidByUserId(userId, isPaid);
        }



    }
}
