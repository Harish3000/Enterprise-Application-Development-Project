import React, { useState } from "react";
import "../Styles/addProduct.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const AddProduct = () => {
  const initialProductState = {
    Id: "",
    ProductName: "",
    ProductImage: "",
    ProductDescription: "",
    ProductPrice: "",
    ProductRating: "",
    CategoryName: "",
    ProductStock: "",
    IsActive: false,
    VendorName: "",
  };

  const [product, setProduct] = useState(initialProductState);
  const navigate = useNavigate();

  // Handling text inputs
  const inputHandler = e => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const submitForm = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5164/api/Product", product);
      toast.success("Product added successfully!", { position: "top-right" });
      navigate("/product"); // Navigate to product list after success
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product. Please try again.", { position: "top-right" });
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
            <label htmlFor="ProdutName">Product Name :</label>
            <input
              type="text"
              id="name"
              onChange={inputHandler}
              name="name"
              autoComplete="off"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductDescription">Description :</label>
            <input
              type="text"
              id="description"
              onChange={inputHandler}
              name="description"
              autoComplete="off"
              placeholder="Enter a description"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductPrice">Price :</label>
            <input
              min={0}
              type="number"
              id="price"
              onChange={inputHandler}
              name="price"
              autoComplete="off"
              placeholder="Enter product price"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductRating">Rating :</label>
            <input
              min={0}
              type="number"
              id="rating"
              onChange={inputHandler}
              name="rating"
              autoComplete="off"
              placeholder="Enter product rating"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="CategoryName">Category :</label>
            <input
              type="text"
              id="category"
              onChange={inputHandler}
              name="category"
              autoComplete="off"
              placeholder="Enter product category"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ProductStock">Stock :</label>
            <input
              min={0}
              type="number"
              id="stock"
              onChange={inputHandler}
              name="stock"
              autoComplete="off"
              placeholder="Enter product stock"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="VendorName">Vendor :</label>
            <input
              type="text"
              id="VendorName"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter vendor name"
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
