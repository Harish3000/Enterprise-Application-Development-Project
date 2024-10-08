package com.example.ead_mobile.Adapters;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.example.ead_mobile.ProductDetailActivity;
import com.example.ead_mobile.R;
import com.example.ead_mobile.model.Product;

import java.util.List;

/**
 * Adapter class for managing product items in a RecyclerView
 * It binds product data to the UI and handles user interactions
 *
 * @author IT21272240
 */

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.ProductViewHolder> {

    private final List<Product> productList;

    /**
     * Constructor to initialize the adapter with a list of products
     * @param productList List of products to display
     */
    public ProductAdapter(List<Product> productList) {
        this.productList = productList;
    }


    /**
     * Called when RecyclerView needs a new ViewHolder of the given type to represent an item
     * parent   The ViewGroup into which the new View will be added after it is bound to an adapter position
     * viewType The view type of the new View
     * @return A new ProductViewHolder that holds the View for each product item
     */
    @NonNull
    @Override
    public ProductViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.product, parent, false); // Inflate your item layout
        return new ProductViewHolder(view);
    }

    /**
     * Called by RecyclerView to display the data at the specified position
     * This method updates the contents of the ViewHolder to reflect the product data
     */
    @Override
    public void onBindViewHolder(@NonNull ProductViewHolder holder, int position) {
        Product product = productList.get(position);

        holder.textViewProductName.setText(product.getProductName());
        holder.textViewProductDescription.setText(product.getProductDescription());
        holder.textViewProductPrice.setText(String.format("$%.2f", product.getProductPrice()));

        Glide.with(holder.itemView.getContext())
                .load(product.getProductImage())
                .into(holder.imageViewProduct);


        // Handle item click to navigate to ProductDetailActivity
        holder.buttonDetail.setOnClickListener(v -> {
            Intent intent = new Intent(v.getContext(), ProductDetailActivity.class);
            intent.putExtra("productId", product.getProductId()); // Pass the product ID
            v.getContext().startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return productList.size();
    }

    /**
     * ViewHolder class to hold and recycle views for product items in the RecyclerView.
     */
    static class ProductViewHolder extends RecyclerView.ViewHolder {
        TextView textViewProductName;
        TextView textViewProductDescription;
        ImageView imageViewProduct;
        TextView textViewProductPrice;
        Button buttonDetail; // Add this line

        public ProductViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewProductName = itemView.findViewById(R.id.textViewProductName);
            textViewProductDescription = itemView.findViewById(R.id.textViewProductDescription);
            imageViewProduct = itemView.findViewById(R.id.imageView);
            textViewProductPrice=itemView.findViewById(R.id.textViewProductPrice);
            buttonDetail = itemView.findViewById(R.id.buttonDetail);
        }
    }
}
