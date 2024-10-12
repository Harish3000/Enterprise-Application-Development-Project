import React, { useEffect, useState } from "react";
import "../Styles/user.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.USER).fetchAll();
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async userId => {
    try {
      const response = await createAPIEndpoint(ENDPOINTS.USER).delete(userId); // Sending userId in request body
      setUsers(prevUser => prevUser.filter(user => user.id !== userId));
      toast.success(response.message || "User deleted successfully", {
        position: "top-right"
      });
    } catch (error) {
      console.log("Error while deleting user:", error);
      toast.error("Failed to delete user.", { position: "top-right" });
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="userTable">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {user.userName}
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {user.address}
                  </td>
                  <td>
                    {user.role}
                  </td>
                  <td className="actionButtons">
                    <Link
                      to={`/update-user/${user.id}`}
                      type="button"
                      className="btn btn-info"
                    >
                      <i className="bi bi-pencil-square" />
                    </Link>

                    <button
                      onClick={() => deleteUser(user.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash3-fill" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
