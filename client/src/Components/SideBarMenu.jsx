//Author :Harini Chamathka
//Path : client/src/Components/SideBarMenu.jsx

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/sideBarMenu.css";
import logo from "../Assets/App.png";
import { Link } from "react-router-dom";
import { SideBarData } from "../Components/SideBarData";
import { CSRSideBar } from "../Components/CSRSideBar";
import { VendorSideBar } from "../Components/VendorSideBar";
import { CustomerSideBar } from "../Components/CustomerSideBar";

// Function to get the correct sidebar data based on the role
const getSidebarData = () => {
  const role = localStorage.getItem("role");
  switch (role) {
    case "Admin":
      return SideBarData;
    case "CSR":
      return CSRSideBar;
    case "Vendor":
      return VendorSideBar;
    case "Customer":
      return CustomerSideBar;
    default:
      return CustomerSideBar; // Default to Admin if no role is found
  }
};

function SideBarMenu() {
  const sideBarData = getSidebarData(); // Fetch the correct sidebar data

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <Link to="/inventory" style={{ display: "block", textAlign: "center" }}>
          <img src={logo} alt="logo" width={100} />
        </Link>

        {sideBarData.map((val, key) => {
          return (
            <li
              className="row"
              key={key}
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBarMenu;
