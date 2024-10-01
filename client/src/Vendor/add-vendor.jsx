import React, { useState } from "react";
import "../Styles/addvendor.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const AddVendor = () => {
  const vendors = {
    vendorName: "",
    productId: "",
    vendorRank: "",
    isActive: true
  };
  const [vendor, setVendor] = useState(vendors);
  const navigate = useNavigate();

  const inputHandler = e => {
    const { name, value } = e.target;
    console.log(name, value);

    setVendor({ ...vendor, [name]: value });
  };

  const submitForm = async e => {
    e.preventDefault();
    await axios
      .post("api/vendor", vendor)
      .then(response => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/vendor");
      })
      .catch(error => {
        console.log(error);
      });
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
              id="name"
              onChange={inputHandler}
              name="name"
              autoComplete="off"
              placeholder="Enter Vendor Name"
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
            <label htmlFor="rank">Vendor Rank:</label>
            <input
              type="text"
              id="rank"
              onChange={inputHandler}
              name="rank"
              autoComplete="off"
              placeholder="Enter Vendor Rank"
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

export default AddVendor;
