//author: Harini chamathka
// Path: client/src/User/add-user.jsx

import React, { useState } from "react";
import "../Styles/adduser.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const AddUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    address: "",
    role: ""
  };

  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = e => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const submitForm = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      toast.loading("Adding user...", { position: "top-right" });

      // Sending the user data to the backend for creation
      await createAPIEndpoint(ENDPOINTS.USER).post(user);
      toast.dismiss();
      toast.success("User added successfully!", { position: "top-right" });
      setUser(initialUserState);
      navigate("/user");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to add user. Please try again.", {
        position: "top-right"
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addUser">
        <Link to="/user" type="button" className="btn btn-secondary">
          <i className="bi bi-skip-backward-fill" />
        </Link>

        <h3>Add New User</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter your Name"
              value={user.userName}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter your Email"
              value={user.email}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter your Address"
              value={user.address}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="role">Role:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={user.role}
              onChange={inputHandler}
              id="role"
              required
            >
              <option value="" disabled>
                Select the role
              </option>
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
              <option value="CSR">CSR</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div className="inputGroup">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
