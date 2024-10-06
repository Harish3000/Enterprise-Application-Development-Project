package com.example.ead_mobile.API;
import com.example.ead_mobile.model.AllCartRequest;
import com.example.ead_mobile.model.AllCartResponse;
import com.example.ead_mobile.model.CartRequest;
import com.example.ead_mobile.model.CartResponse;
import com.example.ead_mobile.model.LoginRequest;
import com.example.ead_mobile.model.LoginResponse;
import com.example.ead_mobile.model.Product;
import com.example.ead_mobile.model.ProductRequest;
import com.example.ead_mobile.model.RegisterRequest;

import java.util.List;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.HTTP;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    @POST("api/Auth/login")
    Call<LoginResponse> loginUser(@Body LoginRequest loginRequest);

    @POST("api/Auth/register")
    Call<Void> registerUser(@Body RegisterRequest registerRequest);

    @GET("api/Product")
    Call<List<Product>> getProducts(@Header("Authorization") String token);

    @POST("api/Product/getById")
    Call<Product> getProductById(@Header("Authorization") String token, @Body ProductRequest productRequest);

    @POST("api/Sale/addToCart")
    Call<CartResponse> addToCart(@Header("Authorization") String token, @Body CartRequest cartRequest);

    @POST("api/Order/getCartByUserId")
    Call<AllCartResponse> getCartByUserId(@Header("Authorization") String token, @Body AllCartRequest allCartRequest);
}