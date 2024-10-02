import React, { useEffect, useState } from "react";
import "../Styles/user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/User");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async userId => {
    await axios
      .delete(`api/User`)
      .then(response => {
        setUsers(prevUser => prevUser.filter(user => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="userTable">
        <Link to="/add" type="button" className="addBtn">
          Add User <i class="bi bi-plus-circle-fill" />
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.email}{" "}
                  </td>
                  <td>
                    {user.address}
                  </td>
                  <td className="actionButtons">
                    <Link
                      to={`/update/` + user._id}
                      type="button"
                      class="btn btn-info"
                    >
                      <i class="bi bi-pencil-square" />
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash3-fill" />
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
