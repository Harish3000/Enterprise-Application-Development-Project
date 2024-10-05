import React, { useState } from "react";
import "../Styles/adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const AddUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    address: "",
    password: "",
    role: ""
  };
  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = e => {
    const { id, value } = e.target;
    console.log(id, value);

    setUser({ ...user, [id]: value });
  };

  const submitForm = async e => {
    e.preventDefault();

    // if (!validateForm()) return;

    try {
      toast.loading("Adding user...", { position: "top-right" });

      const res = await createAPIEndpoint(ENDPOINTS.PRODUCT).post(user);
      toast.dismiss();
      toast.success("User added successfully!", { position: "top-right" });
      console.log(res);
      setUser(initialUserState);
    } catch (err) {
      toast.dismiss();

      toast.error("Failed to add user. Please try again.", {
        position: "top-right"
      });

      console.error(err);
      console.log(user);
    } finally {
      setLoading(false);
    }

    await axios
      .post("api/User", user)
      .then(response => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/user");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addUser">
        <Link to="/user" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Add New User</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              onChange={inputHandler}
              name="name"
              autoComplete="off"
              placeholder="Enter your Name"
              value={user.name}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              onChange={inputHandler}
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
              value={user.email}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              onChange={inputHandler}
              name="address"
              autoComplete="off"
              placeholder="Enter your Address"
              value={user.address}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              onChange={inputHandler}
              name="password"
              autoComplete="off"
              placeholder="Enter the password"
              value={user.password}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="role">Role:</label>
            <select
              class="form-select"
              aria-label="Default select example"
              value={user.role}
            >
              <option selected>Select the role</option>
              <option value="1">Admin</option>
              <option value="2">Vendor</option>
              <option value="3">CSR</option>
              <option value="4">Customer</option>
            </select>
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

export default AddUser;
