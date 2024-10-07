package com.example.ead_mobile.model;

public class PaymentRequest {
    private String userId;

    public PaymentRequest(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
