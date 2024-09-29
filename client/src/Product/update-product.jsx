import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const UpdateProduct = () => {
  const products = {
    Id: "",
    ProductName: "",
    ProductImage: "",
    ProductDescription: "",
    ProductPrice: "",
    ProductRating: "",
    CategoryName: "",
    ProductStock: "",
    IsActive: "",
    VendorName:""
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
        .get(`http://localhost:5164/api/Product`)
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
      .put(`http://localhost:5164/api/Product`, product)
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
        <Link to="/products" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Update Product</h3>
        <form className="addProductForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={inputHandler}
              name="name"
              autoComplete="off"
              placeholder="Enter your Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={product.email}
              onChange={inputHandler}
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={product.address}
              onChange={inputHandler}
              name="address"
              autoComplete="off"
              placeholder="Enter your Address"
            />
          </div>
          <div className="inputGroup">
            <button type="submit" class="btn ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
