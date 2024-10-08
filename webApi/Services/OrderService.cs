// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: OrderService for handling operations related to orders,
// including fetching, creating, updating, and deleting orders, as well as
// retrieving orders by user ID.
// -----------------------------------------------------------------------------

using MongoDB.Bson;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IOrderService
    {
        // Retrieves all orders
        Task<List<Order>> GetAllOrders();

        // Retrieves an order by its ID
        Task<Order> GetOrderById(string id);

        // Retrieves an order for a specific user by user ID
        Task<Order> GetOrderByUserId(string id);

        // Creates a new order for a user and returns the order along with any error message
        Task<(Order order, string error)> CreateOrder(string userId);

        // Updates an existing order and returns the updated order
        Task<Order> UpdateOrder(OrderDto orderDto);

        // Deletes an order by its ID and returns an error message if not found
        Task<string> DeleteOrder(string id);
    }

    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ISaleRepository _saleRepository;
        private readonly IProductService _productService;

        public OrderService(IOrderRepository orderRepository, ISaleRepository saleRepository, IProductService productService)
        {
            _orderRepository = orderRepository;
            _saleRepository = saleRepository;
            _productService = productService;
        }

        // Retrieves all orders
        public async Task<List<Order>> GetAllOrders()
        {
            return await _orderRepository.GetAllOrders(); // Fetch all orders
        }

        // Retrieves an order by its ID
        public async Task<Order> GetOrderById(string id)
        {
            var order = await _orderRepository.GetOrderById(id);
            if (order == null)
            {
                throw new Exception($"Order with id '{id}' not found."); // Throw if not found
            }
            return order; // Return the found order
        }

        // Retrieves the order associated with the user's unpaid sales
        public async Task<Order> GetOrderByUserId(string id)
        {
            // Get all unpaid sales for the user
            var unpaidSales = await _saleRepository.GetUnpaidSalesByUserId(id);
            if (unpaidSales == null || unpaidSales.Count == 0)
            {
                throw new Exception($"Order with user ID '{id}' not found."); // Throw if no unpaid sales
            }

            // Calculate total price from sales
            var totalPrice = unpaidSales.Sum(s => s.Price * s.ProductQuantity);

            // Create a new Order object with unpaid sales
            var newOrder = new Order
            {
                Id = id,
                SaleList = unpaidSales,
                TotalPrice = totalPrice,
                DeliveryStatus = "Pending",
                IsPaid = false,
                IsApproved = false,
                IsDispatched = false
            };
            return newOrder; // Return the new order
        }

        // Creates a new order for the user
        public async Task<(Order order, string error)> CreateOrder(string userId)
        {
            // Get all unpaid sales for the user
            var unpaidSales = await _saleRepository.GetUnpaidSalesByUserId(userId);
            if (unpaidSales == null || unpaidSales.Count == 0)
            {
                return (null, "No unpaid sales found for the user."); // Return error if no sales
            }

            // Calculate total price from sales
            var totalPrice = unpaidSales.Sum(s => s.Price * s.ProductQuantity);

            // Reduce product stock for each product in the unpaid sales list
            foreach (var sale in unpaidSales)
            {
                var reduceStockError = await _productService.ReduceProductStock(sale.ProductId, sale.ProductQuantity);

                // If reducing stock fails, return the error message and abort the order creation
                if (reduceStockError != null)
                {
                    return (null, $"Failed to reduce stock for product ID {sale.ProductId}: {reduceStockError}");
                }
            }

            // Ensure all sales have IsPaid set to true
            foreach (var sale in unpaidSales)
            {
                sale.IsPaid = true; // Mark each sale as paid
            }

            // Create the new order
            var newOrder = new Order
            {
                SaleList = unpaidSales,
                TotalPrice = totalPrice,
                DeliveryStatus = "Pending",
                IsPaid = true,
                IsApproved = false,
                IsDispatched = false
            };

            await _orderRepository.CreateOrder(newOrder); // Save the new order to the repository

            // Mark all sales as paid in the database
            await _saleRepository.ToggleIsPaidByUserId(userId, true);

            return (newOrder, null); // Return the new order
        }

        // Updates an existing order
        public async Task<Order> UpdateOrder(OrderDto orderDto)
        {
            var existingOrder = await _orderRepository.GetOrderById(orderDto.Id);
            if (existingOrder == null)
            {
                throw new Exception($"Order with id '{orderDto.Id}' not found."); // Throw if not found
            }

            // Update order properties based on the DTO
            existingOrder.IsPaid = orderDto.IsPaid;
            existingOrder.IsApproved = orderDto.IsApproved;
            existingOrder.IsDispatched = orderDto.IsDispatched;
            existingOrder.DeliveryStatus = orderDto.DeliveryStatus;

            await _orderRepository.UpdateOrder(existingOrder); // Save changes to the repository
            return existingOrder; // Return the updated order
        }

        // Deletes an order by its ID
        public async Task<string> DeleteOrder(string id)
        {
            var existingOrder = await _orderRepository.GetOrderById(id);
            if (existingOrder == null)
            {
                return $"Order with id '{id}' does not exist."; // Return error if not found
            }

            await _orderRepository.DeleteOrder(id); // Delete the order from the repository
            return null; // Return null if deletion is successful
        }
    }
}
