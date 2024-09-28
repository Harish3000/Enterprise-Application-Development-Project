namespace webApi.DTOs
{
    public class ProductDto
    {
        public string Id { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public string ProductDescription { get; set; }
        public decimal ProductPrice { get; set; }
        public decimal ProductRating { get; set; }
        public string CategoryName { get; set; }
        public int ProductStock { get; set; }
        public bool IsActive { get; set; }
        public string VendorName { get; set; }
    }
}