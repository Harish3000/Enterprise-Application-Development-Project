package com.example.ead_mobile.model;


import java.util.List;

public class AllCartResponse {
    private double totalPrice;
    private String deliveryStatus;
    private boolean isPaid;
    private boolean isApproved;
    private boolean isDispatched;
    private String orderDate;

    // Getters and setters
    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
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

    public void setPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean isApproved) {
        this.isApproved = isApproved;
    }

    public boolean isDispatched() {
        return isDispatched;
    }

    public void setDispatched(boolean isDispatched) {
        this.isDispatched = isDispatched;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }
}
