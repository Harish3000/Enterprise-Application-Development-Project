// Desc: Data for the sidebar
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const CustomerSideBar = [
  {
    title: "Profile",
    icon: <i className="bi bi-person"></i>,
    link: "/profile",
  },
  {
    title: "Logout",
    icon: <i className="bi bi-box-arrow-right"></i>,
    link: "/",
  }
];
