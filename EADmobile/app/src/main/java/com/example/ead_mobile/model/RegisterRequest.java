package com.example.ead_mobile.model;
/**
 *  RegisterRequest class
 *  @author IT21272240
 */
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String address; // New field

    public RegisterRequest(String username, String email, String password, String address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address; // Initialize the address field
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getAddress() {
        return address;
    }
}