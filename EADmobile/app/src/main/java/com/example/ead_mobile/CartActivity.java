package com.example.ead_mobile;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.example.ead_mobile.API.ApiClient;
import com.example.ead_mobile.API.ApiService;
import com.example.ead_mobile.model.AllCartRequest;
import com.example.ead_mobile.model.AllCartResponse;
import com.example.ead_mobile.util.SharedPrefManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CartActivity extends AppCompatActivity {

    private ApiService apiService;
    private TextView textViewTotalPrice, textViewDeliveryStatus, textViewIsPaid, textViewIsApproved, textViewIsDispatched, textViewOrderDate;

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

        // Fetch cart details using userId
        String userId = SharedPrefManager.getInstance(this).getUser().getUserId();
        fetchCartDetails(userId);
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
}
