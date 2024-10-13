// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: SaleService for handling operations related to sales,
// including fetching, creating, updating, and deleting sales, as well as 
// retrieving sales by product or vendor information.
// -----------------------------------------------------------------------------

using MongoDB.Bson;
using System.Security.Claims;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface ISaleService
    {
        // Retrieves all sales
        Task<List<Sale>> GetAllSales();

        // Retrieves a sale by its ID
        Task<Sale> GetSaleById(string id);

        // Creates a new sale and returns it along with any error message
        Task<(Sale sale, string error)> CreateSale(SaleDto saleDto);

        // Updates an existing sale
        Task<Sale> UpdateSale(SaleDto saleDto);

        // Deletes a sale by its ID and returns an error message if not found
        Task<string> DeleteSale(string id);

        // Retrieves sales by the associated product ID
        Task<List<Sale>> GetSalesByProductId(string productId);

        // Retrieves sales by the associated vendor ID
        Task<List<Sale>> GetSalesByVendorId(string vendorId);

        // Toggles the payment status for a user
        Task ToggleIsPaidStatusForUser(string userId, bool isPaid);
    }

    public class SaleService : ISaleService
    {
        private readonly ISaleRepository _saleRepository;
        private readonly IProductService _productService;
        private readonly IVendorService _vendorService;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        private readonly IOrderRepository _orderRepository;

        public SaleService(ISaleRepository saleRepository, IProductService productService, IVendorService vendorService, IAuthService authService, IUserService userService,IOrderRepository orderRepository)
        {
            _saleRepository = saleRepository;
            _productService = productService;
            _vendorService = vendorService;
            _authService = authService;
            _userService = userService;
            _orderRepository = orderRepository;
        }

        // Retrieves all sales
        public async Task<List<Sale>> GetAllSales()
        {
            return await _saleRepository.GetAllSales(); // Fetch all sales from the repository
        }

        // Retrieves a sale by its ID
        public async Task<Sale> GetSaleById(string id)
        {
            var sale = await _saleRepository.GetSaleById(id); // Fetch sale by ID
            if (sale == null)
            {
                throw new Exception($"Sale with id '{id}' not found."); // Throw error if not found
            }
            return sale; // Return the found sale
        }

        // Creates a new sale
        public async Task<(Sale sale, string error)> CreateSale(SaleDto saleDto)
        {
            // Validate the product ID
            if (!ObjectId.TryParse(saleDto.ProductId, out _))
            {
                return (null, "Invalid Product Id."); // Return error for invalid ID
            }

            // Fetch existing product
            var existingProduct = await _productService.GetProductById(saleDto.ProductId);
            if (existingProduct == null)
            {
                return (null, "Product does not exist."); // Return error if product not found
            }

            // Fetch vendor associated with the product
            var existingVendor = await _vendorService.GetVendorByName(existingProduct.VendorName);
            if (existingVendor == null)
            {
                return (null, "Vendor does not exist."); // Return error if vendor not found
            }

            // Extract user information from JWT
            var user = await _authService.GetUserFromJwt();

            // Create new sale object
            var newSale = new Sale
            {
                ProductId = saleDto.ProductId,
                VendorId = existingVendor.Id,
                UserId = user.Id,
                ProductName = existingProduct.ProductName,
                ProductQuantity = saleDto.ProductQuantity,
                Price = existingProduct.ProductPrice,
                IsPaid = saleDto.IsPaid,
                IsApproved = saleDto.IsApproved,
                IsDispatched = saleDto.IsDispatched,
                SaleDate = DateTime.UtcNow // Set the sale date to current time
            };

            await _saleRepository.CreateSale(newSale); // Save the new sale to the repository
            return (newSale, null); // Return the new sale
        }

        // Updates an existing sale
        public async Task<Sale> UpdateSale(SaleDto saleDto)
        {
            var existingSale = await _saleRepository.GetSaleById(saleDto.Id); // Fetch existing sale
            if (existingSale == null)
            {
                throw new Exception($"Sale with id '{saleDto.Id}' not found."); // Throw error if not found
            }

            // Check if the product ID matches the existing sale's product ID
            if (existingSale.ProductId != saleDto.ProductId)
            {
                throw new Exception($"Product with id '{saleDto.ProductId}' not found."); // Throw error if IDs do not match
            }

            // Update sale properties
            existingSale.ProductQuantity = saleDto.ProductQuantity;
            existingSale.IsPaid = saleDto.IsPaid;
            existingSale.IsApproved = saleDto.IsApproved;
            existingSale.IsDispatched = saleDto.IsDispatched;

            await _saleRepository.UpdateSale(existingSale); // Save changes to the repository

            // Update relevant orders in the Order collection
            var orders = await _orderRepository.GetAllOrders(); // Fetch all orders
            foreach (var order in orders)
            {
                // Check if the sale exists in the order's SaleList
                var saleInOrder = order.SaleList.FirstOrDefault(sale => sale.Id == existingSale.Id);
                if (saleInOrder != null)
                {
                    // Replace the old sale entry with the updated sale
                    order.SaleList.Remove(saleInOrder); // Remove the old sale
                    order.SaleList.Add(existingSale); // Add the updated sale

                    await _orderRepository.UpdateOrder(order); // Save the updated order
                }
            }

            return existingSale; // Return the updated sale
        }


        // Deletes a sale by its ID
        public async Task<string> DeleteSale(string id)
        {
            var existingSale = await _saleRepository.GetSaleById(id); // Fetch existing sale
            if (existingSale == null)
            {
                return $"Sale with id '{id}' does not exist."; // Return error if not found
            }

            await _saleRepository.DeleteSale(id); // Delete the sale
            return null; // Return null if deletion is successful
        }

        // Retrieves sales by the associated product ID
        public async Task<List<Sale>> GetSalesByProductId(string productId)
        {
            var existingProduct = await _productService.GetProductById(productId); // Fetch product by ID
            if (existingProduct == null)
            {
                throw new Exception($"Product with id '{productId}' not found."); // Throw error if not found
            }
            return await _saleRepository.GetSalesByProductId(productId); // Fetch sales for the product
        }

        // Retrieves sales by the associated vendor ID
        public async Task<List<Sale>> GetSalesByVendorId(string vendorId)
        {
            var existingVendor = await _vendorService.GetVendorById(vendorId); // Fetch vendor by ID
            if (existingVendor == null)
            {
                throw new Exception($"Vendor with id '{vendorId}' not found."); // Throw error if not found
            }
            return await _saleRepository.GetSalesByVendorId(vendorId); // Fetch sales for the vendor
        }

        // Toggles the payment status for a user
        public async Task ToggleIsPaidStatusForUser(string userId, bool isPaid)
        {
            var user = await _userService.GetUserById(userId); // Fetch user by ID
            if (user == null)
            {
                throw new Exception($"User with id '{userId}' not found."); // Throw error if not found
            }

            await _saleRepository.ToggleIsPaidByUserId(userId, isPaid); // Update payment status
        }
    }
}
