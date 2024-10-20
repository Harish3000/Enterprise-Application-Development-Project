import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const UpdateUser = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    address: "",
    role: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the existing user details using the userId
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.USER)
      .fetchByPost({ id })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("ppppppppppppppppppppppppp");
        console.log("Error fetching user details:", error);
      });
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.USER)
      .put(user)
      .then(() => {
        toast.success("User updated successfully!", { position: "top-right" });
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        toast.error("Failed to update user.", { position: "top-right" });
      });
    var roleInfo = {
      userId: id,
      role: user.role,
    };
    createAPIEndpoint(ENDPOINTS.USER)
      .updateRole(roleInfo)
      .then(() => {
        navigate("/user");
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        toast.error("Failed to update user.", { position: "top-right" });
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addUser">
        <Link to="/user" className="btn btn-secondary">
          <i className="bi bi-skip-backward-fill" /> Go Back
        </Link>

        <h3>Update User</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="userName">Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter user name"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter user email"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter user address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="role">Role:</label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={user.role}
              onChange={inputHandler}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
              <option value="CSR">CSR</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div className="inputGroup">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
