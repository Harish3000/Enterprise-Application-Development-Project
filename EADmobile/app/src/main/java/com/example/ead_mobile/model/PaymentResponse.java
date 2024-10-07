package com.example.ead_mobile.model;

public class PaymentResponse {
    private int totalPrice;
    private String deliveryStatus;
    private boolean isPaid;
    private boolean isApproved;
    private boolean isDispatched;
    private String orderDate;

    // Constructor
    public PaymentResponse(int totalPrice, String deliveryStatus, boolean isPaid, boolean isApproved, boolean isDispatched, String orderDate) {
        this.totalPrice = totalPrice;
        this.deliveryStatus = deliveryStatus;
        this.isPaid = isPaid;
        this.isApproved = isApproved;
        this.isDispatched = isDispatched;
        this.orderDate = orderDate;
    }

    // Getters and Setters
    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(String deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
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

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }
}
