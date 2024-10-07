package com.example.ead_mobile.model;

/**
 *  Cart LoginRequest includes this params
 *  @author IT21272240
 */
public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}