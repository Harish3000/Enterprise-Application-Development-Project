import React, { useState } from "react";
import "../Styles/addProduct.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const AddProduct = () => {
  const products = {
    productId: "",
    productName: "",
    // productImage: null,
    productDescription: "",
    productPrice: "",
    productRating: "",
    categoryName: "",
    productStock: "",
    // isActive: "",
  };

  const [product, setProduct] = useState(products);
  const navigate = useNavigate();

  // Handling text inputs
  const inputHandler = (e) => {
    const { productId, value } = e.target;
    console.log(productId, value);
    setProduct({ ...product, [productId]: value });
  };

  // // Handling file input
  // const fileHandler = (e) => {
  //   const file = e.target.files[0];
  //   setProduct({ ...product, productImage: file });
  // };

  const submitForm = async (e) => {
    e.preventDefault();

    // // Using FormData to handle file upload along with other inputs
    // const formData = new FormData();
    // formData.append("productId", product.productId);
    // formData.append("productName", product.productName);
    // formData.append("productImage", product.productImage); // File
    // formData.append("productDescription", product.productDescription);
    // formData.append("productPrice", product.productPrice);
    // formData.append("productRating", product.productRating);
    // formData.append("categoryName", product.categoryName);
    // formData.append("productStock", product.productStock);
    // formData.append("isActive", product.isActive);

    await axios
      .post("http://localhost:8000/api/product", product, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      })
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/product");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addProduct">
      <Link to="/product" type="button" class="btn btn-secondary">
        <i class="bi bi-skip-backward-fill"></i>
      </Link>

      <h3>Add New Product</h3>
      <form className="addProductForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Product Name :</label>
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
          <label htmlFor="description">Description :</label>
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
          <label htmlFor="price">Price :</label>
          <input
            type="number"
            id="price"
            onChange={inputHandler}
            name="price"
            autoComplete="off"
            placeholder="Enter product price"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="rating">Rating :</label>
          <input
            type="number"
            id="rating"
            onChange={inputHandler}
            name="rating"
            autoComplete="off"
            placeholder="Enter product rating"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="category">Category :</label>
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
          <label htmlFor="stock">Stock :</label>
          <input
            type="number"
            id="stock"
            onChange={inputHandler}
            name="stock"
            autoComplete="off"
            placeholder="Enter product stock"
          />
        </div>
        {/* File Upload Input */}
        {/* <div className="inputGroup">
          <label htmlFor="productImage">Product Image:</label>
          <input type="file" id="productImage" onChange={fileHandler} />
        </div> */}

        <div className="inputGroup">
          <button type="submit" class="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
