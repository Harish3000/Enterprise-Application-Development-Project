package com.example.ead_mobile.model;

/**
 * AllCartRequest represents the request body for fetching all cart items based on the userid
 * This model is used when making an API call to retrieve all cart items for a specific one user
 *
 * @author IT21272240
 */
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