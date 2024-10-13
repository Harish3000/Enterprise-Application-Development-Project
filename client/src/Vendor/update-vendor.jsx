import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../Api";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import Select from "react-select";

// Default vendor state template
const defaultVendor = {
  id: "",
  vendorName: "",
  productIds: [],
  vendorRank: 0,
  isActive: true,
};

const UpdateVendor = () => {
  const [vendor, setVendor] = useState(defaultVendor);
  const [products, setProducts] = useState([]); // List of products fetched from API
  const [selectedProducts, setSelectedProducts] = useState([]); // Selected products
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch available products
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.PRODUCT)
      .fetchVendorProductsByPost({ id })
      .then((response) => {
        const productList = response.data.map((product) => ({
          label: product.productName,
          value: product.id,
        }));
        setProducts(productList);
      })
      .catch((error) => {
        toast.error("Failed to load products.");
        console.error(error);
      });
  }, [id]);

  // Fetch vendor details
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.VENDOR)
      .fetchByPost({ id })
      .then((response) => {
        setVendor(response.data);
        // Map product IDs to Select component format
        const selected = response.data.productIds.map((prodId) => ({
          label: products.find((p) => p.value === prodId)?.label,
          value: prodId,
        }));
        setSelectedProducts(selected);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        toast.error("Failed to load vendor details.");
        console.error(error);
        setLoading(false); // Ensure loading is stopped in case of error
      });
  }, [id, products]);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setVendor({ ...vendor, [id]: value });
  };

  const handleProductChange = (selectedOptions) => {
    const productIds = selectedOptions.map((option) => option.value);
    setVendor({ ...vendor, productIds });
    setSelectedProducts(selectedOptions);
  };

  const submitForm = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.VENDOR)
      .put(vendor)
      .then(() => {
        toast.success("Vendor updated successfully!", {
          position: "top-right",
        });
        navigate("/vendor");
      })
      .catch((error) => {
        toast.error("Failed to update vendor.");
        console.error(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="addVendor">
        {loading ? (
          // Center the spinner on the entire screen
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
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
                  autoComplete="off"
                  placeholder="Enter Vendor Name"
                  value={vendor.vendorName}
                  required
                  disabled
                />
              </div>

              <div className="inputGroup">
                <label htmlFor="productIds">Products:</label>
                <Select
                  isMulti
                  options={products}
                  value={selectedProducts}
                  onChange={handleProductChange}
                  placeholder="Select Products"
                  isDisabled={true}
                />
              </div>

              <div className="inputGroup">
                <label htmlFor="vendorRank">Vendor Rank:</label>
                <input
                  type="number"
                  id="vendorRank"
                  onChange={inputHandler}
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
                  value={vendor.isActive}
                  onChange={(e) =>
                    setVendor({
                      ...vendor,
                      isActive: e.target.value === "true",
                    })
                  }
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
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateVendor;
