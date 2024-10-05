import React from "react";
import homeVideo from "../Assets/homeVideo.mp4";
import AdminVideo from "../Assets/Admin.mp4";
import CsrVideo from "../Assets/CSR.mp4";
import VendorVideo from "../Assets/Vendor.mp4";
import Customer from "../Assets/Customer.mp4";
import { useNavigate } from "react-router-dom";
import "../Styles/welcome.css";

function Welcome() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Define different background videos based on the role
  const getBackgroundVideo = () => {
    switch (role) {
      case "Admin":
        return AdminVideo;
      case "CSR":
        return CsrVideo;
      case "Vendor":
        return VendorVideo;
      case "Customer":
        return Customer;
      default:
        return homeVideo;
    }
  };

  // Get the login success message based on the role
  const getLoginMessage = () => {
    switch (role) {
      case "Admin":
        return "Login successful as Admin";
      case "CSR":
        return "Login successful as CSR";
      case "Vendor":
        return "Login successful as Vendor";
      case "Customer":
        return "Login successful as Customer";
      default:
        return "Login successful";
    }
  };

  // Handle "Get Started" button click
  const handleGetStarted = () => {
    navigate("/profile");
  };

  return (
    <div className="welcomeScreen">
      {/* Background video */}
      <video autoPlay loop muted playsInline className="backgroundVideo">
        <source src={getBackgroundVideo()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container content">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1>
              <span>
                {getLoginMessage()}
              </span>
            </h1>
            {/* <p>
              <strong>User ID:</strong> {userId}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p> */}
            <button className="btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
