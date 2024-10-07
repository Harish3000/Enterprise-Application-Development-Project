package com.example.ead_mobile;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.ead_mobile.API.ApiClient;
import com.example.ead_mobile.API.ApiService;
import com.example.ead_mobile.model.AllCartRequest;
import com.example.ead_mobile.model.AllCartResponse;
import com.example.ead_mobile.model.PaymentRequest;
import com.example.ead_mobile.model.PaymentResponse;
import com.example.ead_mobile.util.SharedPrefManager;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
/**
 *  Initialize UI components to display cart details
 *  Fetch cart details from the server using Retrofit
 *  Display the fetched cart details in the UI
 *  Handle API call responses and show appropriate messages for errors
 *
 * Usage:
 * - This activity is launched to show the cart information of the currently logged-in user
 * - User authentication is managed through Shared Preferences
 *
 * @author IT21272240
 */


public class CartActivity extends AppCompatActivity {

    private ApiService apiService;
    private TextView textViewTotalPrice, textViewDeliveryStatus, textViewIsPaid, textViewIsApproved, textViewIsDispatched, textViewOrderDate;
    Button buttonPayment;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cart);

        // Initialize views
        textViewTotalPrice = findViewById(R.id.textViewTotalPrice);
        textViewDeliveryStatus = findViewById(R.id.textViewDeliveryStatus);
        textViewIsPaid = findViewById(R.id.textViewIsPaid);
        textViewIsApproved = findViewById(R.id.textViewIsApproved);
        textViewIsDispatched = findViewById(R.id.textViewIsDispatched);
        textViewOrderDate = findViewById(R.id.textViewOrderDate);
        buttonPayment = findViewById(R.id.buttonPay);

        // Fetch cart details using userId
        String userId = SharedPrefManager.getInstance(this).getUser().getUserId();
        fetchCartDetails(userId);

        buttonPayment.setOnClickListener(v -> {
            makePayment(userId);
        });

    }

    private void fetchCartDetails(String userId) {
        // Get Retrofit instance from ApiClient
        apiService = ApiClient.getClient().create(ApiService.class);
        String token = SharedPrefManager.getInstance(this).getToken();

        // Prepare request payload
        AllCartRequest cartRequest = new AllCartRequest(userId);

        // Make API call to get cart details
        Call<AllCartResponse> call = apiService.getCartByUserId(token, cartRequest);

        call.enqueue(new Callback<AllCartResponse>() {
            @Override
            public void onResponse(Call<AllCartResponse> call, Response<AllCartResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    // Display cart details
                    AllCartResponse cartResponse = response.body();
                    displayCartDetails(cartResponse);
                } else {
                    Toast.makeText(CartActivity.this, "Failed to load cart details", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AllCartResponse> call, Throwable t) {
                Toast.makeText(CartActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void displayCartDetails(AllCartResponse cartResponse) {
        // Populate UI with cart data
        textViewTotalPrice.setText(String.format("$%.2f", cartResponse.getTotalPrice()));
        textViewDeliveryStatus.setText(cartResponse.getDeliveryStatus());
        textViewIsPaid.setText(cartResponse.isPaid() ? "Yes" : "No");
        textViewIsApproved.setText(cartResponse.isApproved() ? "Yes" : "No");
        textViewIsDispatched.setText(cartResponse.isDispatched() ? "Yes" : "No");

        // Format and display the order date
        String orderDate = cartResponse.getOrderDate();
        textViewOrderDate.setText(formatDate(orderDate));
    }

    private String formatDate(String orderDate) {
        return orderDate;
    }


    private void makePayment(String userId) {
        // Get Retrofit instance from ApiClient
        apiService = ApiClient.getClient().create(ApiService.class);
        String token = SharedPrefManager.getInstance(this).getToken();  // Retrieve JWT token

        // Prepare request payload
        PaymentRequest paymentRequest = new PaymentRequest(userId);

        // Make API call to make payment
        Call<PaymentResponse> call = apiService.makePayment(token,paymentRequest);

        call.enqueue(new Callback<PaymentResponse>() {
            @Override
            public void onResponse(Call<PaymentResponse> call, Response<PaymentResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    PaymentResponse paymentResponse = response.body();
                    Toast.makeText(CartActivity.this, "Payment successful: Total Price: $" + paymentResponse.getTotalPrice(), Toast.LENGTH_SHORT).show();
                } else {
                    try {
                        String errorBody = response.errorBody().string();
                        Toast.makeText(CartActivity.this, "Payment failed: " + errorBody, Toast.LENGTH_LONG).show();
                        System.out.println("Error Response: " + errorBody);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<PaymentResponse> call, Throwable t) {
                Toast.makeText(CartActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

    }
}
