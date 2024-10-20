import React, { useEffect, useState } from "react";
import "../Styles/user.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For filtered users
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.USER).fetchAll();
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with full list
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Filter users based on search term across all columns
  useEffect(() => {
    const filtered = users.filter((user) => {
      return (
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const deleteUser = async (userId) => {
    try {
      await createAPIEndpoint(ENDPOINTS.USER).delete(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success("User deleted successfully", { position: "top-right" });
    } catch (error) {
      console.log("Error while deleting user:", error);
      toast.error("Failed to delete user.", { position: "top-right" });
    }
  };

  // Show confirmation dialog before deletion
  const handleDelete = (userId) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(userId),
        },
        {
          label: "No",
          onClick: () =>
            toast.info("User not deleted.", { position: "top-right" }),
        },
      ],
    });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="userTable">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td className="actionButtons">
                  <Link to={`/update-user/${user.id}`} className="btn btn-info">
                    <i className="bi bi-pencil-square" />
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)} // Use handleDelete for confirmation
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash3-fill" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
