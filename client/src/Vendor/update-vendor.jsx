import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateVendor = () => {
  const vendors = {
    name: "",
    email: "",
    address: ""
  };
  const [vendor, setVendor] = useState(vendors);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setVendor({ ...vendor, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/vendor/${id}`)
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/vendor/${id}`, vendor)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/vendor");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addVendor">
      <Link to="/vendor" type="button" class="btn btn-secondary">
        <i class="bi bi-skip-backward-fill"></i>
      </Link>

      <h3>Update Vendor</h3>
      <form className="addVendorForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Vendor Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter Vendor Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="productId">Product Id:</label>
          <input
            type="text"
            id="productId"
            onChange={inputHandler}
            name="productId"
            autoComplete="off"
            placeholder="Enter product List"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="rank">Vendor Rank:</label>
          <input
            type="text"
            id="rank"
            onChange={inputHandler}
            name="rank"
            autoComplete="off"
            placeholder="Enter Vendor Rank"
          />
        </div>

        <div className="inputGroup">
          <button type="submit" class="btn ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVendor;
