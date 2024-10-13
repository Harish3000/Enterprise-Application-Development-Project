// -----------------------------------------------------------------------------
// Author: Harish.B - IT21289316
// Description: OrderController for handling operations related to orders such as 
// fetching, creating, updating, and deleting orders as well as managing payments.
// -----------------------------------------------------------------------------

using Microsoft.AspNetCore.Mvc;
using webApi.DTOs;
using webApi.Models;
using webApi.Services;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        // Constructor to inject the IOrderService dependency.
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/order/ordersCompleted
        // Retrieves all completed orders.
        [HttpGet("ordersCompleted")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(orders); // Return 200 OK with a list of orders.
        }

        // POST: api/order/getCartByUserId
        // Retrieves the cart or current order for a specific user by their user ID.
        [HttpPost("getCartByUserId")]
        public async Task<IActionResult> GetOrderByUserId(IdDto idDto)
        {
            try
            {
                var order = await _orderService.GetOrderByUserId(idDto.Id);
                return Ok(order); // Return 200 OK with the order details.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 if order is not found.
            }
        }

        // POST: api/order/makePayment
        // Creates a new order after payment is made.
        [HttpPost("makePayment")]
        public async Task<IActionResult> CreateOrder([FromBody] IdDto idDto)
        {
            var (order, error) = await _orderService.CreateOrder(idDto.Id);
            if (order == null)
            {
                return BadRequest(new { error = error }); // Return 400 if order creation fails.
            }

            return Ok(order); // Return 200 OK with the newly created order.
        }

        // GET: api/order/getByOrderId
        // Retrieves an order by its unique order ID.
        [HttpPost("getById")]
        public async Task<IActionResult> GetOrderById(IdDto idDto)
        {
            try
            {
                var order = await _orderService.GetOrderById(idDto.Id);
                return Ok(order); // Return 200 OK with the order details.
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message }); // Return 404 if order is not found.
            }
        }

        // PUT: api/order/updateOrderDetails
        // Updates an existing order's details.
        [HttpPut]
        public async Task<IActionResult> UpdateOrder([FromBody] OrderDto orderDto)
        {
            try
            {
                var order = await _orderService.UpdateOrder(orderDto);
                return Ok(order); // Return 200 OK with the updated order.
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message }); // Return 400 if update fails.
            }
        }

        // DELETE: api/order/deleteOrder
        // Deletes an order by its ID.
        [HttpDelete("deleteOrder")]
        public async Task<IActionResult> DeleteOrder([FromBody] IdDto idDto)
        {
            var result = await _orderService.DeleteOrder(idDto.Id);
            if (result != null)
            {
                return NotFound(result); // Return 404 if order deletion fails.
            }

            return NoContent(); // Return 204 No Content if deletion is successful.
        }
    }
}
