//author: Harini chamathka
// Path: client/src/Sale/add-sale.jsx

import React, { useState } from "react";
import "../Styles/addSale.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const AddSale = () => {
  const [sale, setSale] = useState(initialSaleState);
  const [loading, setLoading] = useState(false);

  const initialSaleState = {
    id: "",
    saleName: "",
    saleDescription: "",
    salePrice: "",
    saleRating: "",
    categoryName: "",
    saleStock: "",
    isActive: false,
    vendorName: "",
    saleImage: ""
  };

  // Handling text inputs
  const inputHandler = e => {
    const { id, value } = e.target;
    setSale({ ...sale, [id]: value });
  };

  // Validation logic
  const validateForm = () => {
    const { saleName, salePrice, saleStock } = sale;
    if (!saleName || !salePrice || !saleStock) {
      toast.error("Please fill in all the required fields.");
      return false;
    }
    if (salePrice <= 0 || saleStock < 0) {
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
      toast.loading("Adding sale...", { position: "top-right" });

      const res = await createAPIEndpoint(ENDPOINTS.PRODUCT).post(sale);

      // If successful, show a success message
      toast.dismiss(); // Dismiss the loading toast
      toast.success("Sale added successfully!", { position: "top-right" });

      console.log(res); // Optional: Log the response

      // Reset form after successful submission
      setSale(initialSaleState);
    } catch (err) {
      // Dismiss the loading toast on error
      toast.dismiss();

      // If an error occurs, show an error message
      toast.error("Failed to add sale. Please try again.", {
        position: "top-right"
      });

      console.error(err); // Log the error for debugging
      console.log(sale);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addSale">
        <Link to="/sale" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Add New Sale</h3>
        <form className="addSaleForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="saleName">Sale Name :</label>
            <input
              type="text"
              id="saleName"
              onChange={inputHandler}
              name="saleName"
              autoComplete="off"
              placeholder="Enter Sale Name"
              value={sale.saleName}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleDescription">Description :</label>
            <input
              type="text"
              id="saleDescription"
              onChange={inputHandler}
              name="saleDescription"
              autoComplete="off"
              placeholder="Enter a description"
              value={sale.saleDescription}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="salePrice">Price :</label>
            <input
              min={0}
              type="number"
              id="salePrice"
              onChange={inputHandler}
              name="salePrice"
              autoComplete="off"
              placeholder="Enter sale price"
              value={sale.salePrice}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleRating">Rating :</label>
            <input
              min={0}
              type="number"
              id="saleRating"
              onChange={inputHandler}
              name="saleRating"
              autoComplete="off"
              placeholder="Enter sale rating"
              value={sale.saleRating}
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
              placeholder="Enter sale category"
              value={sale.categoryName}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleStock">Stock :</label>
            <input
              min={0}
              type="number"
              id="saleStock"
              onChange={inputHandler}
              name="saleStock"
              autoComplete="off"
              placeholder="Enter sale stock"
              value={sale.saleStock}
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
              value={sale.vendorName}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleImage">Sale Image :</label>
            <input
              type="text"
              id="saleImage"
              onChange={inputHandler}
              name="saleImage"
              autoComplete="off"
              placeholder="Enter sale Image Url"
              value={sale.saleImage}
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

export default AddSale;
