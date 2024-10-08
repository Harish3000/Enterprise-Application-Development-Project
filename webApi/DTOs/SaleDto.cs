namespace webApi.DTOs
{
    // Data Transfer Object for sales details
    public class SaleDto
    {
        // Unique identifier for the sale
        public string Id { get; set; }

        // Identifier of the product being sold
        public string ProductId { get; set; }

        // Quantity of the product sold
        public int ProductQuantity { get; set; }

        // Indicates if the sale has been paid for
        public bool IsPaid { get; set; }

        // Indicates if the sale has been approved
        public bool IsApproved { get; set; }

        // Indicates if the sale has been dispatched
        public bool IsDispatched { get; set; }
    }
}
