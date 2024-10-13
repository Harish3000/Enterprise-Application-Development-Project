import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../Api";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import Select from "react-select";

// Initial vendor state template
const initialStateVendors = {
  id: "",
  vendorName: "",
  productIds: [], // Product IDs will be stored here as an array
  vendorRank: 0.0,
  isActive: true
};

const UpdateVendor = () => {
  const [vendor, setVendor] = useState(initialStateVendors);
  const [products, setProducts] = useState([]); // Store products for dropdown
  const navigate = useNavigate();
  const { id } = useParams();

  // Handle status change for the vendor
  const statusHandler = e => {
    setVendor({ ...vendor, isActive: e.target.value === "true" });
  };

  // Handle vendor input changes
  const inputHandler = e => {
    const { id, value } = e.target;
    setVendor({ ...vendor, [id]: value });
  };

  // Handle product selection changes
  const handleProductChange = selectedProducts => {
    const selectedProductIds = selectedProducts.map(product => product.value);
    setVendor({ ...vendor, productIds: selectedProductIds });
  };

  // Fetch vendor details and product list on component mount
  useEffect(
    () => {
      // Fetch vendor details by ID
      createAPIEndpoint(ENDPOINTS.VENDOR)
        .fetchById(id)
        .then(response => {
          setVendor(response.data); // Ensure data exists before setting
        })
        .catch(error => {
          console.error("Error fetching vendor:", error);
          toast.error("Failed to load vendor details.");
        });

      // Fetch all products for the product selection dropdown
      createAPIEndpoint(ENDPOINTS.PRODUCT)
        .fetchAll()
        .then(response => {
          setProducts(
            response.data.map(product => ({
              value: product.id,
              label: product.productName
            }))
          );
        })
        .catch(error => {
          console.error("Error fetching products:", error);
          toast.error("Failed to load products.");
        });
    },
    [id]
  );

  const submitForm = async e => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.VENDOR)
      .put(vendor.id, vendor) // Pass vendor ID with the updated details
      .then(response => {
        setVendor(response.data);
        if (response.data != null) {
          toast.success("Vendor updated successfully!", {
            position: "top-right"
          });
        }
        navigate("/vendor");
      })
      .catch(error => {
        toast.error("Failed to update vendor. Please try again.", {
          position: "top-right"
        });
        console.error("Error updating vendor:", error);
      });
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
              options={products} // Dropdown options for products
              value={products.filter(product =>
                vendor.productIds.includes(product.value)
              )} // Currently selected products
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
            <label htmlFor="isActive">Status:</label>
            <select
              id="isActive"
              name="isActive"
              value={vendor.isActive.toString()}
              onChange={statusHandler}
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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

export default UpdateVendor;
