//author: Harini chamathka
//path: src / Vendor / add- vendor.jsx

import React, { useState, useEffect } from "react";
import "../Styles/addvendor.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const AddVendor = () => {
  const initialVendors = {
    id: "",
    vendorName: "",
    productIds: [], // Product IDs will be stored here
    vendorRank: 0.0,
    isActive: true
  };

  const [vendor, setVendor] = useState(initialVendors);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); // List of products fetched from API
  const [selectedProducts, setSelectedProducts] = useState([]); // Products selected from dropdown
  const navigate = useNavigate();

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
        toast.error("Failed to load vendor.");
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const inputHandler = e => {
    const { id, value } = e.target;
    setVendor({ ...vendor, [id]: value });
  };

  const handleProductChange = selectedOptions => {
    const productIds = selectedOptions.map(option => option.value); // Extract product IDs
    setVendor({ ...vendor, productIds }); // Update vendor state with selected product IDs
    setSelectedProducts(selectedOptions); // Update the displayed selected products
  };

  // Validation logic
  // const validateForm = () => {
  //   const { vendorName, vendorRank } = vendor;
  //   if (!vendorName || !vendorRank || vendor.productIds.length === 0) {
  //     toast.error("Please fill in all the required fields.");
  //     return false;
  //   }
  //   return true;
  // };

  const submitForm = async e => {
    e.preventDefault();
    // if (!validateForm()) return;

    try {
      setLoading(true);
      toast.loading("Adding Vendor...", { position: "top-right" });

      await createAPIEndpoint(ENDPOINTS.VENDOR).post(vendor);
      toast.dismiss();
      toast.success("Vendor added successfully!", { position: "top-right" });
      setVendor(initialVendors);
      setSelectedProducts([]); // Clear selected products
      navigate("/vendor");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to add vendor. Please try again.", {
        position: "top-right"
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addVendor">
        <Link to="/vendor" type="button" className="btn btn-secondary">
          <i className="bi bi-skip-backward-fill" />
        </Link>

        <h3>Add New Vendor</h3>
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
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
