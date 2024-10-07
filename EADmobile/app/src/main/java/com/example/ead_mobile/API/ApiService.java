package com.example.ead_mobile.API;
import com.example.ead_mobile.model.AllCartRequest;
import com.example.ead_mobile.model.AllCartResponse;
import com.example.ead_mobile.model.CartRequest;
import com.example.ead_mobile.model.CartResponse;
import com.example.ead_mobile.model.LoginRequest;
import com.example.ead_mobile.model.LoginResponse;
import com.example.ead_mobile.model.PaymentRequest;
import com.example.ead_mobile.model.PaymentResponse;
import com.example.ead_mobile.model.Product;
import com.example.ead_mobile.model.ProductRequest;
import com.example.ead_mobile.model.RegisterRequest;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

/**
 * ApiService interface defines all the API endpoints for the application.
 * This includes user authentication, product management, and cart management API calls
 *
 * @author IT21272240
 */

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

    @POST("api/Order/makePayment")
    Call<PaymentResponse> makePayment(@Header("Authorization") String token, @Body PaymentRequest paymentRequest);
}