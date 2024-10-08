//author: Harini chamathka
// Path: client/src/Product/update-product.jsx

import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const UpdateProduct = () => {
  const products = {
    productName: product.productName,
    productImage: product.productImage,
    productDescription: product.productDescription,
    productPrice: product.productPrice,
    productRating: product.productRating,
    categoryName: product.categoryName,
    productStock: product.productStock,
    isActive: product.isActive,
    vendorName: product.vendorName
  };
  const [product, setProduct] = useState(products);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = e => {
    const { name, value } = e.target;
    console.log(name, value);

    setProduct({ ...product, [name]: value });
  };

  useEffect(
    () => {
      axios
        .get(`api/Product`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    [id]
  );

  const submitForm = async e => {
    e.preventDefault();
    await axios
      .put(`api/Product`, product)
      .then(response => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/product");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addProduct">
        <Link to="/product" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Update Product</h3>
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
            <label htmlFor="categoryName">Category :</label>
            <input
              type="text"
              id="categoryName"
              onChange={inputHandler}
              name="categoryName"
              autoComplete="off"
              placeholder="Enter product category"
              value={product.categoryName}
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
            <label htmlFor="vendorName">Vendor :</label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter vendor name"
              value={product.vendorName}
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
            <button type="submit" class="btn">
              {/* disabled={loading}> */}
              {/* {loading ? "Submitting..." : "Submit"} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
