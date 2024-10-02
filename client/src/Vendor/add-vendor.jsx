import React, { useState } from "react";
import "../Styles/addvendor.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const AddVendor = () => {
  const initialVendors = {
    id: "",
    vendorName: "",
    productIds: [],
    vendorRank: 0.0,
    isActive: true
  };
  const [vendor, setVendor] = useState(initialVendors);
  const [loading, setLoading] = useState(false);

  const inputHandler = e => {
    const { id, value } = e.target;
    console.log(id, value);
    setVendor({ ...vendor, [id]: value });
  };

  // Validation logic
  const validateForm = () => {
    const { vendorName, vendorRank } = vendor;
    if (!vendorName || !vendorRank) {
      toast.error("Please fill in all the required fields.");
      return false;
    }
    return true;
  };

  const submitForm = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      toast.loading("Adding Vendor...", { position: "top-right" });

      const res = await createAPIEndpoint(ENDPOINTS.VENDOR).post(vendor);
      toast.dismiss();
      toast.success("Vendor added successfully!", { position: "top-right" });
      console.log(res);
      setVendor(initialVendors);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to add vendor. Please try again.", {
        position: "top-right"
      });

      console.error(error); // Log the error for debugging
      console.log(vendor);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addVendor">
        <Link to="/vendor" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Add New Vendor</h3>
        <form className="addVendorForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Vendor Name:</label>
            <input
              type="text"
              id="vendorName"
              onChange={inputHandler}
              name="vendorName"
              autoComplete="off"
              placeholder="Enter Vendor Name"
              value={vendor.vendorName}
              required
            />
          </div>
          {/* <div className="inputGroup">
            <label htmlFor="productIds">Product Id:</label>
            <input
              type="text"
              id="productIds"
              onChange={inputHandler}
              name="productIds"
              autoComplete="on"
              placeholder="Enter product List"
              value={vendor.productIds}
            />
          </div> */}
          <div className="inputGroup">
            <label htmlFor="rank">Vendor Rank:</label>
            <input
              type="text"
              id="vendorRank"
              onChange={inputHandler}
              name="vendorRank"
              autoComplete="off"
              placeholder="Enter Vendor Rank"
              value={vendor.vendorRank}
              required
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

export default AddVendor;
