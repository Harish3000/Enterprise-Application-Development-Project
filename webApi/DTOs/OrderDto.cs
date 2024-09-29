namespace webApi.DTOs
{
    public class OrderDto
    {
        public string Id { get; set; }
        public bool IsPaid { get; set; }
        public bool IsApproved { get; set; }
        public bool IsDispatched { get; set; }
        public string DeliveryStatus { get; set; }
    }
}
