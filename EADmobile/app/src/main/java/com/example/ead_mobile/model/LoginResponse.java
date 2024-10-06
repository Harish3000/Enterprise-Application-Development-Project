package com.example.ead_mobile.model;

public class LoginResponse {
    private String token;
    private String role;
    private String userId;

    public String getJwt() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getUserId() {
        return userId;
    }


}