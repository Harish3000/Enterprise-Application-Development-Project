import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const UpdateUser = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    address: "",
    role: ""
  });

  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from the URL

  // Fetch the existing user details using the userId
  useEffect(
    () => {
      axios
        .post(`/api/User/getById`, { id }) // Fetch by userId (POST with id in body)
        .then(response => {
          setUser(response.data); // Populate form with existing user data
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.log("Error fetching user details:", error);
          setLoading(false);
        });
    },
    [id]
  );

  // Handle input changes
  const inputHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const submitForm = async e => {
    e.preventDefault();
    await axios
      .put(`/api/User`, { id, ...user }) // Update user details by ID
      .then(response => {
        toast.success("User updated successfully!", { position: "top-right" });
        navigate("/user");
      })
      .catch(error => {
        console.log("Error updating user:", error);
        toast.error("Failed to update user.", { position: "top-right" });
      });
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  return (
    <div>
      <SideBarMenu />
      <div className="addUser">
        <Link to="/user" className="btn btn-secondary">
          <i className="bi bi-skip-backward-fill" /> Go Back
        </Link>

        <h3>Update User</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="userName">Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter user name"
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter user email"
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter user address"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="role">Role:</label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={user.role}
              onChange={inputHandler}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
              <option value="CSR">CSR</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          <div className="inputGroup">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
