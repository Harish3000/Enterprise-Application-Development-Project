// import React from "react";
// import SideBarMenu from "../Components/SideBarMenu";
// import "../Styles/profile.css";
// import { useState, useEffect } from "react";
// import { createAPIEndpoint, ENDPOINTS } from "../Api";

// function profile() {
//   const [user, setUser] = useState({});
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await createAPIEndpoint(ENDPOINTS.USER).fetchById(userId);
//         setUser(response.data); // Assuming response.data contains the user object
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   const userId1 = localStorage.getItem("userId");
//   const role = localStorage.getItem("role");
//   return (
//     <div>
//       <SideBarMenu />
//       <div className="profileContainer">
//         <div className="row justify-content-center">
//           <div className="col-md-6 text-center">
//             <h1>Profile</h1>
//             <p>
//               <strong>User ID:</strong> {userId}
//             </p>
//             <p>
//               <strong>User token:</strong> {userId1}
//             </p>
//             <p>
//               <strong>Role:</strong> {role}
//             </p>
//             <p>User Name :</p>
//             <p>Email :</p>
//             <p>Address :</p>
//             <p>Password :</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default profile;


import React, { useState, useEffect } from "react";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";
import "../Styles/profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.USER).fetchById(userId);
        setUser(response.data); // Assuming response.data contains the user object
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      <SideBarMenu />
      <div className="profileContainer">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1>Profile</h1>
            <p>
              <strong>User ID:</strong> {userId}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
            <p>
              <strong>User Name:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
