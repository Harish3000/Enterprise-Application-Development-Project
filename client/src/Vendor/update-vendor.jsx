//author : Harini chamathka
//path : src / Vendor / update - vendor.jsx

import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../Api";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import Select from "react-select";

const UpdateVendor = () => {
  const initialStateVendors = {
    id: "",
    vendorName: "",
    productIds: [], // Product IDs will be stored here
    vendorRank: 0.0,
    isActive: true
  };

  const [vendor, setVendor] = useState(initialStateVendors);
  const [products, setProducts] = useState([]); // List of products fetched from API
  const [selectedProducts, setSelectedProducts] = useState([]); // Selected products
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.PRODUCT).fetchAll();
        const productList = response.data.map(product => ({
          label: product.productName,
          value: product.id
        }));
        setProducts(productList);
      } catch (error) {
        toast.error("Failed to load products.");
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch vendor details when the component mounts
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.VENDOR).fetchById(id);
        setVendor(response.data);
        // Set selected products for the Select component
        const selected = response.data.productIds.map(id => ({
          label: products.find(product => product.value === id)?.label,
          value: id
        }));
        setSelectedProducts(selected);
      } catch (error) {
        toast.error("Failed to load vendor.");
        console.error(error);
      }
    };

    fetchVendor();
  }, [id, products]);

  const inputHandler = e => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  const handleProductChange = selectedOptions => {
    const productIds = selectedOptions.map(option => option.value); // Extract product IDs
    setVendor({ ...vendor, productIds }); // Update vendor state with selected product IDs
    setSelectedProducts(selectedOptions); // Update the displayed selected products
  };

  const submitForm = async e => {
    e.preventDefault();
    try {
      await createAPIEndpoint(ENDPOINTS.VENDOR).put(vendor);
      toast.success("Vendor updated successfully!", { position: "top-right" });
      navigate("/vendor");
    } catch (error) {
      toast.error("Failed to update vendor. Please try again.", { position: "top-right" });
      console.error(error);
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addVendor">
        <Link to="/vendor" type="button" className="btn btn-secondary">
          <i className="bi bi-skip-backward-fill" />
        </Link>

        <h3>Update Vendor</h3>
        <form className="addVendorForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="vendorName">Vendor Name:</label>
            <input
              type="text"
              id="vendorName"
              onChange={inputHandler}
              name="vendorName"
              autoComplete="off"
              placeholder="Enter Vendor Name"
              value={vendor.vendorName}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="productIds">Products:</label>
            <Select
              isMulti
              options={products} // Dropdown options (products)
              value={selectedProducts} // Currently selected products
              onChange={handleProductChange} // Handler for product selection
              placeholder="Select Products"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="vendorRank">Vendor Rank:</label>
            <input
              type="number"
              id="vendorRank"
              onChange={inputHandler}
              name="vendorRank"
              autoComplete="off"
              placeholder="Enter Vendor Rank"
              value={vendor.vendorRank}
              required
            />
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

export default UpdateVendor;
