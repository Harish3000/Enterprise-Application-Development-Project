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

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("ordersCompleted")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(orders);
        }

        [HttpPost("getCartByUserId")]
        public async Task<IActionResult> GetOrderByUserId(IdDto idDto)
        {
            try
            {
                var order = await _orderService.GetOrderByUserId(idDto.Id);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }

        [HttpPost("makePayment")]
        public async Task<IActionResult> CreateOrder([FromBody] IdDto idDto)
        {
            var (order, error) = await _orderService.CreateOrder(idDto.Id);
            if (order == null)
            {
                return BadRequest(new { error = error });
            }

            return Ok(order);
        }

        [HttpGet("getByOrderId")]
        public async Task<IActionResult> GetOrderById(IdDto idDto)
        {
            try
            {
                var order = await _orderService.GetOrderById(idDto.Id);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }

        [HttpPut("updateOrderDetails")]
        public async Task<IActionResult> UpdateOrder([FromBody] OrderDto orderDto)
        {
            try
            {
                var order = await _orderService.UpdateOrder(orderDto);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("deleteOrder")]
        public async Task<IActionResult> DeleteOrder([FromBody] IdDto idDto)
        {
            var result = await _orderService.DeleteOrder(idDto.Id);
            if (result != null)
            {
                return NotFound(result);
            }

            return NoContent();
        }
    }
}
