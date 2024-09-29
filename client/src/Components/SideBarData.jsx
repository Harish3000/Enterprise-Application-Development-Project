// Desc: Data for the sidebar
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const SideBarData = [
  {
    title: "Inventory",
    icon: <i className="bi bi-house-door-fill"></i>,
    link: "/dashboard/inventory",
  },
  {
    title: "Vendors",
    icon: <i className="bi bi-person-vcard"></i>,
    link: "/dashboard/vendor",
  },
  {
    title: "Products",
    icon: <i className="bi bi-box-seam-fill"></i>,
    link: "/dashboard/product",
  },

  {
    title: "Orders",
    icon: <i className="bi bi-cart4"></i>,
    link: "/dashboard/order",
  },

  {
    title: "Users",
    icon: <i className="bi bi-person-circle"></i>,
    link: "/dashboard/user",
  },
];
