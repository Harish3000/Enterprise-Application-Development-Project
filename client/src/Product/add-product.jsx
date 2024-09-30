import React, { useState } from "react";
import "../Styles/addProduct.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const AddProduct = () => {
  const userId = localStorage.getItem("userId");

  const initialProductState = {
    Id: userId,
    productName: "",
    productDescription: "",
    productPrice: "",
    productRating: "",
    categoryName: "",
    productStock: "",
    isActive: false,
    vendorName: "",
    productImage: "",
  };

  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(false);

  // Handling text inputs
  const inputHandler = e => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  // Validation logic
  const validateForm = () => {
    const { productName, productPrice, productStock } = product;
    if (!productName || !productPrice || !productStock) {
      toast.error("Please fill in all the required fields.");
      return false;
    }
    if (productPrice <= 0 || productStock < 0) {
      toast.error("Please enter valid values for price and stock.");
      return false;
    }
    return true;
  };

  const submitForm = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Show a loading toast while the request is in progress
      toast.loading("Adding product...", { position: "top-right" });

      const res = await createAPIEndpoint(ENDPOINTS.PRODUCT).post(product);

      // If successful, show a success message
      toast.dismiss(); // Dismiss the loading toast
      toast.success("Product added successfully!", { position: "top-right" });

      console.log(res); // Optional: Log the response

      // Reset form after successful submission
      setProduct(initialProductState);
    } catch (err) {
      // Dismiss the loading toast on error
      toast.dismiss();

      // If an error occurs, show an error message
      toast.error("Failed to add product. Please try again.", {
        position: "top-right"
      });

      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addProduct">
        <Link to="/product" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Add New Product</h3>
        <form className="addProductForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="productName">Product Name :</label>
            <input
              type="text"
              id="productName"
              onChange={inputHandler}
              name="productName"
              autoComplete="off"
              placeholder="Enter Product Name"
              value={product.productName}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="productDescription">Description :</label>
            <input
              type="text"
              id="productDescription"
              onChange={inputHandler}
              name="productDescription"
              autoComplete="off"
              placeholder="Enter a description"
              value={product.productDescription}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="productPrice">Price :</label>
            <input
              min={0}
              type="number"
              id="productPrice"
              onChange={inputHandler}
              name="productPrice"
              autoComplete="off"
              placeholder="Enter product price"
              value={product.productPrice}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="productRating">Rating :</label>
            <input
              min={0}
              type="number"
              id="productRating"
              onChange={inputHandler}
              name="productRating"
              autoComplete="off"
              placeholder="Enter product rating"
              value={product.productRating}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="CategoryName">Category :</label>
            <input
              type="text"
              id="CategoryName"
              onChange={inputHandler}
              name="CategoryName"
              autoComplete="off"
              placeholder="Enter product category"
              value={product.CategoryName}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="productStock">Stock :</label>
            <input
              min={0}
              type="number"
              id="productStock"
              onChange={inputHandler}
              name="productStock"
              autoComplete="off"
              placeholder="Enter product stock"
              value={product.productStock}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="VendorName">Vendor :</label>
            <input
              type="text"
              id="VendorName"
              name="VendorName"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter vendor name"
              value={product.VendorName}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="productImage">Product Image :</label>
            <input
              type="text"
              id="productImage"
              onChange={inputHandler}
              name="productImage"
              autoComplete="off"
              placeholder="Enter product Image Url"
              value={product.productImage}
            />
          </div>
          <div className="inputGroup">
            <button type="submit" class="btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
