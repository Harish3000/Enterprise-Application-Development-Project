//author: Harini chamathka
// Path: client/src/Sale/update-sale.jsx

import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";

const UpdateSale = () => {
  const [sale, setSale] = useState(sales);
  const navigate = useNavigate();
  const { id } = useParams();

  const sales = {
    saleName: sale.saleName,
    saleImage: sale.saleImage,
    saleDescription: sale.saleDescription,
    salePrice: sale.salePrice,
    saleRating: sale.saleRating,
    categoryName: sale.categoryName,
    saleStock: sale.saleStock,
    isActive: sale.isActive,
    vendorName: sale.vendorName
  };

  const inputHandler = e => {
    const { name, value } = e.target;
    console.log(name, value);

    setSale({ ...sale, [name]: value });
  };

  useEffect(
    () => {
      axios
        .get(`api/Sale`)
        .then(response => {
          setSale(response.data);
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
      .put(`api/Sale`, sale)
      .then(response => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/sale");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addSale">
        <Link to="/sale" type="button" class="btn btn-secondary">
          <i class="bi bi-skip-backward-fill" />
        </Link>

        <h3>Update Sale</h3>
        <form className="addSaleForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="saleName">Sale Name :</label>
            <input
              type="text"
              id="saleName"
              onChange={inputHandler}
              name="saleName"
              autoComplete="off"
              placeholder="Enter Sale Name"
              value={sale.saleName}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleDescription">Description :</label>
            <input
              type="text"
              id="saleDescription"
              onChange={inputHandler}
              name="saleDescription"
              autoComplete="off"
              placeholder="Enter a description"
              value={sale.saleDescription}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="salePrice">Price :</label>
            <input
              min={0}
              type="number"
              id="salePrice"
              onChange={inputHandler}
              name="salePrice"
              autoComplete="off"
              placeholder="Enter sale price"
              value={sale.salePrice}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleRating">Rating :</label>
            <input
              min={0}
              type="number"
              id="saleRating"
              onChange={inputHandler}
              name="saleRating"
              autoComplete="off"
              placeholder="Enter sale rating"
              value={sale.saleRating}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="categoryName">Category :</label>
            <input
              type="text"
              id="categoryName"
              onChange={inputHandler}
              name="categoryName"
              autoComplete="off"
              placeholder="Enter sale category"
              value={sale.categoryName}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleStock">Stock :</label>
            <input
              min={0}
              type="number"
              id="saleStock"
              onChange={inputHandler}
              name="saleStock"
              autoComplete="off"
              placeholder="Enter sale stock"
              value={sale.saleStock}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="vendorName">Vendor :</label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter vendor name"
              value={sale.vendorName}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="saleImage">Sale Image :</label>
            <input
              type="text"
              id="saleImage"
              onChange={inputHandler}
              name="saleImage"
              autoComplete="off"
              placeholder="Enter sale Image Url"
              value={sale.saleImage}
            />
          </div>
          <div className="inputGroup">
            <button type="submit" class="btn">
              {/* disabled={loading}> */}
              {/* {loading ? "Submitting..." : "Submit"} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSale;
