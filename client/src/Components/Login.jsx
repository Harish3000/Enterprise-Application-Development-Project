import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault(); // Prevent the default form submission
    // Add any validation or form submission logic here
    navigate("/dashboard"); // Navigate to the login page after registration
  };
  return (
    <div className="loginContainer">
    <div className="loginForm">
      <div className="loginTitle">Login</div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      </div>
      </div>
  );
}

export default Login;
