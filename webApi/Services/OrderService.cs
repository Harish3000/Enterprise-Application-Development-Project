using MongoDB.Bson;
using webApi.DTOs;
using webApi.Models;
using webApi.Repositories;

namespace webApi.Services
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllOrders();
        Task<Order> GetOrderById(string id);

        Task<Order> GetOrderByUserId(string id);
        Task<(Order order, string error)> CreateOrder(string id);
        Task<Order> UpdateOrder(OrderDto orderDto);
        Task<string> DeleteOrder(string id);
    }

    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ISaleRepository _saleRepository;

        public OrderService(IOrderRepository orderRepository, ISaleRepository saleRepository)
        {
            _orderRepository = orderRepository;
            _saleRepository = saleRepository;
        }

        //View all orders by all users
        public async Task<List<Order>> GetAllOrders()
        {
            return await _orderRepository.GetAllOrders();
        }

        //View order by Order Id
        public async Task<Order> GetOrderById(string id)
        {
            var order = await _orderRepository.GetOrderById(id);
            if (order == null)
            {
                throw new Exception($"Order with id '{id}' not found.");
            }
            return order;
        }

        //Cart
        public async Task<Order> GetOrderByUserId(string id)
        {
            // Get all unpaid sales for the user
            var unpaidSales = await _saleRepository.GetUnpaidSalesByUserId(id);
            if (unpaidSales == null || unpaidSales.Count == 0)
            {
                throw new Exception($"Order with id '{id}' not found.");
            }

            // Calculate total price from sales
            var totalPrice = unpaidSales.Sum(s => s.Price * s.ProductQuantity);

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
            return newOrder;

        }

        //Make the purchase
        public async Task<(Order order, string error)> CreateOrder(string id)
        {
            // Get all unpaid sales for the user
            var unpaidSales = await _saleRepository.GetUnpaidSalesByUserId(id);
            if (unpaidSales == null || unpaidSales.Count == 0)
            {
                return (null, "No unpaid sales found for the user.");
            }

            // Calculate total price from sales
            var totalPrice = unpaidSales.Sum(s => s.Price * s.ProductQuantity);

            var newOrder = new Order
            {
                SaleList = unpaidSales,
                TotalPrice = totalPrice,
                DeliveryStatus = "Pending",
                IsPaid = true,
                IsApproved = false,
                IsDispatched = false
            };

            await _orderRepository.CreateOrder(newOrder);

            //Change isPaid True.
            await _saleRepository.ToggleIsPaidByUserId(id, true);
            return (newOrder, null);
        }

        public async Task<Order> UpdateOrder(OrderDto orderDto)
        {
            var existingOrder = await _orderRepository.GetOrderById(orderDto.Id);
            if (existingOrder == null)
            {
                throw new Exception($"Order with id '{orderDto.Id}' not found.");
            }

            existingOrder.IsPaid = orderDto.IsPaid;
            existingOrder.IsApproved = orderDto.IsApproved;
            existingOrder.IsDispatched = orderDto.IsDispatched;
            existingOrder.DeliveryStatus = orderDto.DeliveryStatus;

            await _orderRepository.UpdateOrder(existingOrder);
            return existingOrder;
        }

        public async Task<string> DeleteOrder(string id)
        {
            var existingOrder = await _orderRepository.GetOrderById(id);
            if (existingOrder == null)
            {
                return $"Order with id '{id}' does not exist.";
            }

            await _orderRepository.DeleteOrder(id);
            return null;
        }
    }
}
