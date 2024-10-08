namespace webApi.DTOs
{
    // Data Transfer Object for order details
    public class OrderDto
    {
        // Unique identifier for the order
        public string Id { get; set; }

        // Indicates if the order has been paid
        public bool IsPaid { get; set; }

        // Indicates if the order has been approved
        public bool IsApproved { get; set; }

        // Indicates if the order has been dispatched
        public bool IsDispatched { get; set; }

        // Current delivery status of the order
        public string DeliveryStatus { get; set; }
    }
}
