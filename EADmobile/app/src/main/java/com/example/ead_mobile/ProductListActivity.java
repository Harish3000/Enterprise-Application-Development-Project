package com.example.ead_mobile;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.ead_mobile.API.ApiClient;
import com.example.ead_mobile.API.ApiService;
import com.example.ead_mobile.Adapters.ProductAdapter;
import com.example.ead_mobile.model.LoginRequest;
import com.example.ead_mobile.model.LoginResponse;
import com.example.ead_mobile.model.Product;
import com.example.ead_mobile.model.User;
import com.example.ead_mobile.util.SharedPrefManager;

import com.example.ead_mobile.API.ApiProducts;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Product List Activity
 * @author IT21272240
 */
public class ProductListActivity extends AppCompatActivity{

    private TextView textViewProductsList;
    private ApiService apiProducts;
    private RecyclerView recyclerView;
    private ProductAdapter productAdapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        String token = SharedPrefManager.getInstance(this).getToken();
        apiProducts = ApiProducts.getProducts().create(ApiService.class);

        // List header
        textViewProductsList = findViewById(R.id.textViewProductsList);
        textViewProductsList.setText("Product List");

        // Listing product
        Call<List<Product>> call = apiProducts.getProducts(token);


        call.enqueue(new Callback<List<Product>>() {
            @Override
            public void onResponse(Call<List<Product>> call, Response<List<Product>> response) {
                if (response.isSuccessful()) {
                    List<Product> productList = response.body();
                    // Save or use the productList here if needed

                    updateProductList(productList);
                } else {
                    Toast.makeText(ProductListActivity.this, "Failed to retrieve products", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Product>> call, Throwable t) {
                Toast.makeText(ProductListActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

         // Initialize the FloatingActionButton and set the click listener
        FloatingActionButton fabCart = findViewById(R.id.fabCart);
        fabCart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ProductListActivity.this, CartActivity.class);
                startActivity(intent);
            }
        });


    }

    private void updateProductList(List<Product> productList) {

        recyclerView = findViewById(R.id.recyclerViewProducts); // Find RecyclerView
        productAdapter = new ProductAdapter(productList); // Initialize Adapter
        recyclerView.setAdapter(productAdapter); // Set Adapter to RecyclerView
        recyclerView.setLayoutManager(new LinearLayoutManager(this)); // Set LayoutManager
    }


}
