package com.example.ead_mobile.API;


import com.example.ead_mobile.model.LoginRequest;
import com.example.ead_mobile.model.LoginResponse;
import com.example.ead_mobile.model.Product;
import com.example.ead_mobile.model.RegisterRequest;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ApiService {
    @POST("api/Auth/login")
    Call<LoginResponse> loginUser(@Body LoginRequest loginRequest);

    @POST("api/Auth/register")
    Call<Void> registerUser(@Body RegisterRequest registerRequest);

    @GET("/api/Product")
    Call<List<Product>> getProducts(@Header("Authorization") String token);
}