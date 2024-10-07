package com.example.ead_mobile.model;
/**
 *  AllCartResponse represents the response object returned when retrieving all cart information.
 *  This class encapsulates details about the cart's total price, delivery status, payment status, approval, dispatch status, and the order.
 *
 *  @author IT21272240
 */

public class AllCartResponse
{
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
