package com.example.ead_mobile.model;
/**
 *  ProductRequest class
 *  @author IT21272240
 */

public class ProductRequest {
    private String id;

    public ProductRequest(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}