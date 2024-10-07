import React, { useState } from "react";
import "../Styles/addorder.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const AddOrder = () => {
  const initialOrderState = {
    id: "",
    productIds: '',
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

  const [order, setOrder] = useState(initialOrderState);
  const [loading, setLoading] = useState(false);

  const inputHandler = e => {
    const { id, value } = e.target;
    console.log(id, value);
    setOrder({ ...order, [id]: value });
  };

  const submitForm = async e => {
    e.preventDefault();
    try {
      // Show a loading toast while the request is in progress
      toast.loading("Adding product...", { position: "top-right" });

      const res = await createAPIEndpoint(ENDPOINTS.ORDER).post(order);

      // If successful, show a success message
      toast.dismiss(); // Dismiss the loading toast
      toast.success("Product added successfully!", { position: "top-right" });

      console.log(res); // Optional: Log the response

      // Reset form after successful submission
      setOrder(initialOrderState);
    } catch (err) {
      // Dismiss the loading toast on error
      toast.dismiss();

      // If an error occurs, show an error message
      toast.error("Failed to add product. Please try again.", {
        position: "top-right"
      });

      console.error(err); // Log the error for debugging
      console.log(order);
    } finally {
      setLoading(false); // Stop loading
    }
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

export default AddOrder;
