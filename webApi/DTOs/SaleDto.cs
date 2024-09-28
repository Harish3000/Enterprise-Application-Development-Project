namespace webApi.DTOs
{
    public class SaleDto
    {
        public string Id { get; set; }
        public string ProductId { get; set; }
        public int ProductQuantity { get; set; }
        public bool IsApproved { get; set; }
        public bool IsDispatched { get; set; }
    }
}
