package com.example.ead_mobile.model;

public class AllCartRequest {
    private String id;

    // Constructor
    public AllCartRequest(String id) {
        this.id = id;
    }

    // Getter and Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}