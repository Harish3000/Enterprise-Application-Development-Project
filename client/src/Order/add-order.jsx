import React, { useState } from "react";
import "../Styles/addorder.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const AddOrder = () => {
  const orders = {
    orderName: "",
    productId: "",
    orderRank: "",
    isActive: true
  };
  const [order, setOrder] = useState(orders);
  const navigate = useNavigate();

  const inputHandler = e => {
    const { name, value } = e.target;
    console.log(name, value);

    setOrder({ ...order, [name]: value });
  };

  const submitForm = async e => {
    e.preventDefault();
    await axios
      .post("api/Order", order)
      .then(response => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/order");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addOrder">
        <Link to="/order" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Add New Order</h3>
        <form className="addOrderForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Order Name:</label>
            <input
              type="text"
              id="name"
              onChange={inputHandler}
              name="name"
              autoComplete="off"
              placeholder="Enter Order Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="productId">Product Id:</label>
            <input
              type="text"
              id="productId"
              onChange={inputHandler}
              name="productId"
              autoComplete="off"
              placeholder="Enter product List"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="rank">Order Rank:</label>
            <input
              type="text"
              id="rank"
              onChange={inputHandler}
              name="rank"
              autoComplete="off"
              placeholder="Enter Order Rank"
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

export default AddOrder;
