package com.example.ead_mobile.model;
/**
 *  Cart CartResponse includes this params
 *  @author IT21272240
 */
public class CartResponse
{
    private String id;
    private String productId;
    private String vendorId;
    private String userId;
    private String productName;
    private int productQuantity;
    private double price;
    private boolean isPaid;
    private boolean isApproved;
    private boolean isDispatched;
    private String saleDate; // Use OffsetDateTime to handle the date format

    // Default constructor
    public CartResponse() {
    }

    // Parameterized constructor
    public CartResponse(String id, String productId, String vendorId, String userId, String productName,
                        int productQuantity, double price, boolean isPaid, boolean isApproved,
                        boolean isDispatched, String saleDate) {
        this.id = id;
        this.productId = productId;
        this.vendorId = vendorId;
        this.userId = userId;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.price = price;
        this.isPaid = isPaid;
        this.isApproved = isApproved;
        this.isDispatched = isDispatched;
        this.saleDate = saleDate;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public boolean isDispatched() {
        return isDispatched;
    }

    public void setDispatched(boolean dispatched) {
        isDispatched = dispatched;
    }

    public String getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(String saleDate) {
        this.saleDate = saleDate;
    }
}
