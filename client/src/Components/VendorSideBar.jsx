//Author :Harini Chamathka
//Path : client/src/Components/VendorSideBar.jsx

// Desc: Data for the sidebar
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const VendorSideBar = [
  {
    title: "Products",
    icon: <i className="bi bi-box-seam-fill" />,
    link: "/product"
  },

  {
    title: "Orders",
    icon: <i className="bi bi-cart4" />,
    link: "/order"
  },
  {
    title: "Profile",
    icon: <i className="bi bi-person" />,
    link: "/profile"
  },
  {
    title: "Logout",
    icon: <i className="bi bi-box-arrow-right" />,
    link: "/"
  }
];
