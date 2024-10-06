package com.example.ead_mobile.model;
public class User {
    private String email;
    private String role;
    private String userId;


    public User(String email, String role, String userId) {
        this.email = email;
        this.role = role;
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getUserId() {
        return userId;
    }
}