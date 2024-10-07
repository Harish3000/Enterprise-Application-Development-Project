package com.example.ead_mobile;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.ead_mobile.API.ApiCarts;
import com.example.ead_mobile.API.ApiClient;
import com.example.ead_mobile.API.ApiService;
import com.example.ead_mobile.API.ApiProducts;
import com.example.ead_mobile.model.CartRequest;
import com.example.ead_mobile.model.CartResponse;
import com.example.ead_mobile.model.Product;
import com.example.ead_mobile.model.ProductRequest;
import com.example.ead_mobile.util.SharedPrefManager;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Product Detail Activity
 * @author IT21272240
 */
public class ProductDetailActivity extends AppCompatActivity {

    private TextView textViewProductName, textViewProductDescription, textViewProductPrice;
    private ImageView imageViewProduct;
    private EditText editTextQuantity;
    private Button buttonAddToCart, buttonRegister;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        // Initialize views
        textViewProductName = findViewById(R.id.textViewProductNameDetail);
        textViewProductDescription = findViewById(R.id.textViewProductDescriptionDetail);
        textViewProductPrice = findViewById(R.id.textViewProductPriceDetail);
        imageViewProduct = findViewById(R.id.imageViewProductDetail);

        // Retrieve product ID from the Intent
        String productId = getIntent().getStringExtra("productId");

        if (productId != null) {
            // Fetch product details using the retrieved product ID
            fetchProductDetails(productId);
        } else {
            Toast.makeText(this, "Product ID not found", Toast.LENGTH_SHORT).show();
//            finish(); // Close the activity if no product ID is passed
        }

        // Initialize the EditText
        editTextQuantity = findViewById(R.id.editTextQuantity);

        buttonAddToCart = findViewById(R.id.buttonAddToCart);
        buttonAddToCart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("editTextQuantityX" + editTextQuantity.getText().toString());
                readQuantity();
            }
        });
    }

    private void fetchProductDetails(String productId) {
        // Get Retrofit instance from ApiProducts
        ApiService apiService = ApiProducts.getProducts().create(ApiService.class);
        String token = SharedPrefManager.getInstance(this).getToken();

        ProductRequest productRequest = new ProductRequest(productId);

        // Make API call to get product by ID
        apiService.getProductById(token, productRequest).enqueue(new Callback<Product>() {
            @Override
            public void onResponse(Call<Product> call, Response<Product> response) {

                System.out.println("ResXX" + response.body());

                if (response.isSuccessful() && response.body() != null) {
                    // Populate UI with product data
                    Product product = response.body();

                    textViewProductName.setText(product.getProductName());
                    textViewProductDescription.setText(product.getProductDescription());
                    textViewProductPrice.setText(String.format("$%.2f", product.getProductPrice()));

                    // Load image using Glide
                    Glide.with(ProductDetailActivity.this)
                            .load(product.getProductImage())
                            .into(imageViewProduct);
                } else {
                    Toast.makeText(ProductDetailActivity.this, "Failed to load product details", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Product> call, Throwable t) {
                Log.e("ProductDetailActivity", "Error: " + t.getMessage());
                Toast.makeText(ProductDetailActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

    }



    private void readQuantity() {

        String productId = getIntent().getStringExtra("productId");
        String token = SharedPrefManager.getInstance(this).getToken();

        // Get the input from EditText
        String quantityString = editTextQuantity.getText().toString();

        // Check if the input is empty
        if (quantityString.isEmpty()) {
            Toast.makeText(this, "Please enter a quantity", Toast.LENGTH_SHORT).show();
            return;
        }

        // Convert the string to an integer (or any other numeric type)
        int quantity = Integer.parseInt(quantityString);
        apiService = ApiClient.getClient().create(ApiService.class);


        CartRequest cartRequest = new CartRequest("1", productId, quantity, false, false);

        Call<CartResponse> call = apiService.addToCart(token, cartRequest);

        call.enqueue(new Callback<CartResponse>() {
            @Override
            public void onResponse(Call<CartResponse> call, Response<CartResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    // Handle successful response
                    Toast.makeText(getApplicationContext(), "Cart data saved successfully", Toast.LENGTH_SHORT).show();
                } else {
                    // Handle error response
                    Toast.makeText(getApplicationContext(), "Failed to save cart data: " + response.message(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<CartResponse> call, Throwable t) {
                // Handle failure
                Toast.makeText(getApplicationContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        Toast.makeText(this, "Cart data saved successfully", Toast.LENGTH_SHORT).show();


    }
}
