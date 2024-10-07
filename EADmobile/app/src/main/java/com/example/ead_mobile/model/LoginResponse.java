package com.example.ead_mobile.model;
/**
 *  Cart LoginResponse includes this params
 *  @author IT21272240
 */
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