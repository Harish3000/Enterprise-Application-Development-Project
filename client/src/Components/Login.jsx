import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "https://ecomm.free.beeceptor.com/api/login",
        "/api/Auth/login",
        {
          email,
          password
        }
      );
      const { jwt, role, userId } = response.data;

      // Save login data to localStorage
      localStorage.setItem("token", jwt);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // Redirect to success page on successful login
      navigate("/profile");
      toast.success("Login successful");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginForm">
        <div className="loginTitle">Login</div>
        {error &&
          <div className="alert alert-danger">
            {error}
          </div>}
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
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
