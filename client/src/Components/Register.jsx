//Author :Harini Chamathka
//Path : client/src/Components/Register.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";
import { useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    address: ""
  });
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      } else {
        // Navigate to login page on successful registration
        navigate("/login");
        toast.success("Registration successful. Please login to continue.");
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <div className="loginTitle">Register</div>
        <form onSubmit={handleSubmit}>
          <div class="row g-3 mb-2 mt-2">
            <div class="col">
              <label for="exampleInputUsername" className="form-label">
                User Name
              </label>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div class="col">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputAddress" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          {error &&
            <div className="alert alert-danger mt-3">
              {error}
            </div>}
        </form>
      </div>
    </div>
  );
}

export default Register;
