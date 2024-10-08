namespace webApi.DTOs
{
    // Data Transfer Object for product details
    public class ProductDto
    {
        // Unique identifier for the product
        public string Id { get; set; }

        // Name of the product
        public string ProductName { get; set; }

        // URL or path of the product image
        public string ProductImage { get; set; }

        // Description of the product
        public string ProductDescription { get; set; }

        // Price of the product
        public decimal ProductPrice { get; set; }

        // Rating of the product
        public decimal ProductRating { get; set; }

        // Name of the category to which the product belongs
        public string CategoryName { get; set; }

        // Available stock quantity of the product
        public int ProductStock { get; set; }

        // Indicates if the product is currently active
        public bool IsActive { get; set; }

        // Name of the vendor selling the product
        public string VendorName { get; set; }
    }
}
