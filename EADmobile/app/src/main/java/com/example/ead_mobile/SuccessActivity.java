package com.example.ead_mobile;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.ead_mobile.API.ApiProducts;
import com.example.ead_mobile.API.ApiService;
import com.example.ead_mobile.model.LoginResponse;
import com.example.ead_mobile.model.Product;
import com.example.ead_mobile.model.User;
import com.example.ead_mobile.util.SharedPrefManager;

import com.example.ead_mobile.API.ApiProducts;
import com.example.ead_mobile.util.SharedPrefManager;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SuccessActivity extends AppCompatActivity {

    private TextView textViewWelcome, textViewUserId, textViewRole;
    private Button buttonLogout;
    private Button buttonProductList;
    private ApiService apiProducts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_success);

        textViewWelcome = findViewById(R.id.textViewWelcome);
        textViewUserId = findViewById(R.id.textViewUserId);
        textViewRole = findViewById(R.id.textViewRole);
        buttonLogout = findViewById(R.id.buttonLogout);
        buttonProductList = findViewById(R.id.buttonProductList);

        User user = SharedPrefManager.getInstance(this).getUser();

        textViewWelcome.setText("Happy Shopping");
        textViewUserId.setText("Login ID : " + user.getUserId());
        textViewRole.setText("Type : " + user.getRole());

        apiProducts = ApiProducts.getProducts().create(ApiService.class);

        String token = SharedPrefManager.getInstance(this).getToken();


        // Logout
        buttonLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPrefManager.getInstance(SuccessActivity.this).clear();
                startActivity(new Intent(SuccessActivity.this, LoginActivity.class));
                finish();
            }
        });

        // View products
        buttonProductList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                startActivity(new Intent(SuccessActivity.this, ProductListActivity.class));
                finish();
            }
        });
    }
}