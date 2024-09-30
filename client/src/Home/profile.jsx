import React from "react";
import SideBarMenu from "../Components/SideBarMenu";

function profile() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  return (
    <div>
      <SideBarMenu />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1>Profile</h1>
            <p>
              <strong>User ID:</strong> {userId}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
