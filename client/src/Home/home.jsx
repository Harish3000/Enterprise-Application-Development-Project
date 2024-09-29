import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/home.css";
import { useNavigate } from "react-router-dom";
import homeVideo from "../Assets/homeVideo.mp4";

// Rename the component to start with an uppercase letter
function Home() { 
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className="homePage">
      <video autoPlay loop muted playsInline className="backgroundVideo">
        <source src={homeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <div className="homeTitle">
          WELCOME TO <span>E-COM-MATE</span>
        </div>
        <div className="d-grid gap-2 d-md-block">
          {/* LOGIN button navigates to /login */}
          <button
            className="btn btn-lg m-5"
            type="button"
            onClick={() => navigate("/login")} // Navigate to /login
          >
            LOGIN
          </button>

          {/* REGISTER button navigates to /register */}
          <button
            className="btn btn-lg m-5"
            type="button"
            onClick={() => navigate("/register")} // Navigate to /register
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home; // Export with an uppercase name
