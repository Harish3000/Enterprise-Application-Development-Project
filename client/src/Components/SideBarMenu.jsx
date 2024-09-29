import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/sideBarMenu.css";
import { SideBarData } from "./SideBarData";
import logo from "../Assets/App.png";

function SideBarMenu() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <a href="/inventory" style={{ display: "block", textAlign: "center" }}>
          <img src={logo} alt="logo" width={100} />
        </a>

        {SideBarData.map((val, key) => {
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
