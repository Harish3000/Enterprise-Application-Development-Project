import React, { useState } from "react";
import "../Styles/addProduct.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import ObjectId from "bson-objectid"; // Import the ObjectId library
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const AddProduct = () => {
  const initialProductState = {
    Id: ObjectId().toString(), // Generate a new MongoDB ObjectId
    ProductName: "",
    ProductDescription: "",
    ProductPrice: "",
    ProductRating: "",
    CategoryName: "",
    ProductStock: "",
    IsActive: false,
    VendorName: "",
    ProductImage: ""
  };

  const [product, setProduct] = useState(initialProductState);


  // Handling text inputs
  const inputHandler = e => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const submitForm = async e => {
    e.preventDefault();
    // try {
    //   await axios.post("http://localhost:5164/api/Product", product);
    //   toast.success("Product added successfully!", { position: "top-right" });
    //   navigate("/product");
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to add product. Please try again.", {
    //     position: "top-right"
    //   });
    // }
    createAPIEndpoint(ENDPOINTS.PRODUCT)
      .post(product)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
            <label htmlFor="ProductName">Product Name :</label>
            <input
              type="text"
              id="ProductName"
              onChange={inputHandler}
              name="ProductName"
              autoComplete="off"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductDescription">Description :</label>
            <input
              type="text"
              id="ProductDescription"
              onChange={inputHandler}
              name="ProductDescription"
              autoComplete="off"
              placeholder="Enter a description"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductPrice">Price :</label>
            <input
              min={0}
              type="number"
              id="ProductPrice"
              onChange={inputHandler}
              name="ProductPrice"
              autoComplete="off"
              placeholder="Enter product price"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductRating">Rating :</label>
            <input
              min={0}
              type="number"
              id="ProductRating"
              onChange={inputHandler}
              name="ProductRating"
              autoComplete="off"
              placeholder="Enter product rating"
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
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductStock">Stock :</label>
            <input
              min={0}
              type="number"
              id="ProductStock"
              onChange={inputHandler}
              name="ProductStock"
              autoComplete="off"
              placeholder="Enter product stock"
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
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductImage">Product Image :</label>
            <input
              type="text"
              id="ProductImage"
              onChange={inputHandler}
              name="ProductImage"
              autoComplete="off"
              placeholder="Enter Product Image Url"
            />
          </div>
          <div className="inputGroup">
            <button type="submit" class="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
