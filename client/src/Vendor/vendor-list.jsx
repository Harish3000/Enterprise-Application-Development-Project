import React, { useEffect, useState } from "react";
import "../Styles/vendor.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [productNamesMap, setProductNamesMap] = useState({}); // To store product names by product ID
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all vendors
        const vendorResponse = await createAPIEndpoint(
          ENDPOINTS.VENDOR
        ).fetchAll();
        setVendors(vendorResponse.data);

        // Fetch product details for each productId in each vendor using fetchByPost
        const productIds = vendorResponse.data.flatMap(
          (vendor) => vendor.productIds
        );
        const uniqueProductIds = [...new Set(productIds)]; // Remove duplicate product IDs

        const productNamesMap = {};
        for (let productId of uniqueProductIds) {
          try {
            await createAPIEndpoint(ENDPOINTS.PRODUCT)
              .fetchByPost({ id: productId })
              .then((productResponse) => {
                productNamesMap[productId] = productResponse.data.productName;
              });
          } catch (error) {
            console.error(error);
          }
        }
        setProductNamesMap(productNamesMap);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        toast.error("Error fetching vendors and products.", {
          position: "top-right",
        });
        setLoading(false); // Ensure loading is stopped in case of error
      }
    };
    fetchData();
  }, []);

  const deleteVendor = async (id) => {
    try {
      await createAPIEndpoint(ENDPOINTS.VENDOR).delete(id);
      setVendors((prevVendors) =>
        prevVendors.filter((vendors) => vendors.id !== id)
      );
      toast.success("Vendor deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="vendorTable">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
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
                {vendors.map((vendor, index) => (
                  <tr key={vendor._id}>
                    <td>{index + 1}</td>
                    <td>{vendor.vendorName}</td>
                    <td>
                      {vendor.productIds.length > 0
                        ? vendor.productIds
                            .map(
                              (productId) =>
                                productNamesMap[productId] || "Unknown Product"
                            ) // Accessing product name by ID
                            .join(", ") // Join product names with a comma
                        : "No Products"}
                    </td>
                    <td>{vendor.vendorRank}</td>
                    <td>{vendor.isActive ? "Active" : "Inactive"}</td>
                    <td className="actionButtons">
                      <Link
                        key={vendor.id}
                        to={`/update-vendor/${vendor.id}`}
                        type="button"
                        className="btn btn-info"
                      >
                        <i className="bi bi-pencil-square" />
                      </Link>

                      <button
                        onClick={() => deleteVendor(vendor.id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        <i className="bi bi-trash3-fill" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Vendor;
