//author: Harini chamathka
// Path: client/src/User/update-user.jsx

import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    address: ""
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = e => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  useEffect(
    () => {
      axios
        .get(`api/User`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    [id]
  );

  const submitForm = async e => {
    e.preventDefault();
    await axios
      .put(`api/User`, user)
      .then(response => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/user");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addUser">
        <Link to="/user" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Update User</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={inputHandler}
              name="name"
              autoComplete="off"
              placeholder="Enter your Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={inputHandler}
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={user.address}
              onChange={inputHandler}
              name="address"
              autoComplete="off"
              placeholder="Enter your Address"
            />
          </div>
          <div className="inputGroup">
            <button type="submit" class="btn ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
