//author: Harini chamathka
//path: src / Order / update-order.jsx

import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const UpdateOrder = () => {
  const orders = {
    id: "",
    productId: "",
    vendorId: "",
    userId: "",
    productName: "",
    productQuantity: "",
    price: "",
    isPaid: true,
    isApproved: false,
    isDispatched: false,
    saleDate: ""
  };
  const [order, setOrder] = useState(orders);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = e => {
    const { name, value } = e.target;
    console.log(name, value);

    setOrder({ ...order, [name]: value });
  };

  useEffect(
    () => {
      axios
        .get(`api/order/${id}`)
        .then(response => {
          setOrder(response.data);
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
      .put(`api/Order`, order)
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

        <h3>Update Order</h3>
        <form className="addOrderForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              onChange={inputHandler}
              name="productName"
              autoComplete="off"
              placeholder="Enter product Name"
              value={order.productName}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="productQuantity">Qunatity :</label>
            <input
              min={0}
              type="number"
              id="productQuantity"
              onChange={inputHandler}
              name="productQuantity"
              autoComplete="off"
              placeholder="Enter product quantity"
              value={order.productQuantity}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              onChange={inputHandler}
              name="price"
              autoComplete="off"
              placeholder="Enter product price"
              value={order.price}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="isPaid">Paid:</label>
            <input
              type="boolean"
              id="isPaid"
              onChange={inputHandler}
              name="isPaid"
              autoComplete="off"
              placeholder="Payment Status"
              value={order.isPaid}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="isApproved">Approval:</label>
            <input
              type="boolean"
              id="isApproved"
              onChange={inputHandler}
              name="isApproved"
              autoComplete="off"
              placeholder="Approval Status"
              value={order.isApproved}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="isDispatched">Dispatch:</label>
            <input
              type="boolean"
              id="isDispatched"
              onChange={inputHandler}
              name="isDispatched"
              autoComplete="off"
              placeholder="Dispactch Status"
              value={order.isDispatched}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleDate">Sale Date:</label>
            <input
              type="text"
              id="saleDate"
              onChange={inputHandler}
              name="saleDate"
              autoComplete="off"
              placeholder="Sales Date"
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

export default UpdateOrder;
