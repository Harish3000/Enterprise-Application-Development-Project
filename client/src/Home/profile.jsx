//Author: Harini Chamathka
//Path: client/src/Home/profile.jsx

import React, { useEffect, useState } from "react";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";
import "../Styles/profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(
    () => {
      const fetchUserDetails = async () => {
        try {
          const response = await createAPIEndpoint(ENDPOINTS.USER).fetchById(
            userId
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    },
    [userId]
  );

  return (
    <div>
      <SideBarMenu />
      <div className="profileContainer">
        <h1 className="text-center">Profile</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User ID</td>
                  <td>
                    {userId}
                  </td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>
                    {role}
                  </td>
                </tr>
                <tr>
                  <td>User Name</td>
                  <td>
                    {user.userName}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    {user.email}
                  </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>
                    {user.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
