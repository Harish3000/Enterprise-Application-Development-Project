//author : Harini chamathka
//path: src / Vendor / vendor-list.jsx

import React, { useEffect, useState } from "react";
import "../Styles/vendor.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [productNamesMap, setProductNamesMap] = useState({}); // To store product names by product ID
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all vendors
        const vendorResponse = await createAPIEndpoint(
          ENDPOINTS.VENDOR
        ).fetchAll();
        setVendors(vendorResponse.data);

        // Fetch product details for each productId in each vendor
        const productIds = vendorResponse.data.flatMap(
          vendor => vendor.productIds
        );
        const uniqueProductIds = [...new Set(productIds)]; // Remove duplicate product IDs

        const productNamesMap = {};
        for (let productId of uniqueProductIds) {
          try {
            const productResponse = await createAPIEndpoint(
              ENDPOINTS.PRODUCT
            ).fetchById(productId);
            productNamesMap[productId] = productResponse.data.productName; // Map product ID to product name
          } catch (error) {
            console.error(error);
          }
        }
        setProductNamesMap(productNamesMap); // Store product names in state
      } catch (error) {
        console.log(error);
        toast.error("Error fetching vendors and products.", {
          position: "top-right"
        });
      }
    };
    fetchData();
  }, []);

  const deleteVendor = async vendorId => {
    try {
      await createAPIEndpoint(ENDPOINTS.VENDOR).delete(vendorId);
      setVendors(prevVendors =>
        prevVendors.filter(vendor => vendor._id !== vendorId)
      );
      toast.success("Vendor deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting vendor. Please try again.", {
        position: "top-right"
      });
    }
  };

  // Function to handle update click
  const handleUpdateClick = async vendor => {
    try {
      // Navigate to the update vendor form
      navigate("/update-vendor", { state: { vendorId: vendor._id } }); // Pass vendor ID in the state
    } catch (error) {
      console.error("Error navigating to update form", error);
      toast.error("Error navigating to update form.", {
        position: "top-right"
      });
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="vendorTable">
        <Link to="/add-vendor" type="button" className="addBtn">
          Add Vendor <i className="bi bi-plus-circle-fill" />
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Products</th>
              <th scope="col">Rank</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) =>
              <tr key={vendor._id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  {vendor.vendorName}
                </td>
                <td>
                  {vendor.productIds.length > 0
                    ? vendor.productIds
                        .map(
                          productId =>
                            productNamesMap[productId] || "Unknown Product"
                        ) // Accessing product name by ID
                        .join(", ") // Join product names with a comma
                    : "No Products"}
                </td>
                <td>
                  {vendor.vendorRank}
                </td>
                <td>
                  {vendor.isActive ? "Active" : "Inactive"}
                </td>
                <td className="actionButtons">
                  <button
                    onClick={() => handleUpdateClick(vendor)} // Call handleUpdateClick with vendor data
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="bi bi-pencil-square" />
                  </button>

                  <button
                    onClick={() => deleteVendor(vendor._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash3-fill" />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
