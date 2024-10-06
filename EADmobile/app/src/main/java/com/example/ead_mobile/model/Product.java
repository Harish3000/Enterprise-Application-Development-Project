package com.example.ead_mobile.model;


public class Product {
    private String productId;
    private String productName;
    private String productImage;
    private String productDescription;
    private double productPrice;
    private double productRating;
    private String categoryName;
    private int productStock;
    private boolean isActive;
    private String vendorId;

    // Constructor
    public Product(String productId, String productName, String productImage, String productDescription,
                   double productPrice, double productRating, String categoryName, int productStock,
                   boolean isActive, String vendorId) {
        this.productId = productId;
        this.productName = productName;
        this.productImage = productImage;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productRating = productRating;
        this.categoryName = categoryName;
        this.productStock = productStock;
        this.isActive = isActive;
        this.vendorId = vendorId;
    }

    // Getters
    public String getProductId() { return productId; }
    public String getProductName() { return productName; }
    public String getProductImage() { return productImage; }
    public String getProductDescription() { return productDescription; }
    public double getProductRating() { return productRating; }

    public double getProductPrice() {
        return productPrice;
    }

    public String getCategoryName() { return categoryName; }
    public int getProductStock() { return productStock; }
    public boolean isActive() { return isActive; }
    public String getVendorId() { return vendorId; }
}
