package com.example.ead_mobile.model;
/**
 *  Cart CartRequest includes this params
 *  @author IT21272240
 */
public class CartRequest {
    private String id;
    private String productId;
    private int productQuantity;
    private boolean isApproved;
    private boolean isDispatched;

    // Default constructor
    public CartRequest() {
    }

    // Parameterized constructor
    public CartRequest(String id, String productId, int productQuantity, boolean isApproved, boolean isDispatched) {
        this.id = id;
        this.productId = productId;
        this.productQuantity = productQuantity;
        this.isApproved = isApproved;
        this.isDispatched = isDispatched;
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

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
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
}
