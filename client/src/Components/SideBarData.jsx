// Desc: Data for the sidebar
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const SideBarData = [
  {
    title: "Inventory",
    icon: <i className="bi bi-house-door-fill"></i>,
    link: "/inventory",
  },
  {
    title: "Vendors",
    icon: <i className="bi bi-person-vcard"></i>,
    link: "/vendor",
  },
  {
    title: "Products",
    icon: <i className="bi bi-box-seam-fill"></i>,
    link: "/product",
  },

  {
    title: "Orders",
    icon: <i className="bi bi-cart4"></i>,
    link: "/order",
  },

  {
    title: "Users",
    icon: <i className="bi bi-person-circle"></i>,
    link: "/user",
  },
];
