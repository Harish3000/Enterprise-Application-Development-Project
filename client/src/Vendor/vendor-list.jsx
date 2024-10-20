import React, { useEffect, useState } from "react";
import "../Styles/vendor.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]); // For filtering vendors
  const [productNamesMap, setProductNamesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorResponse = await createAPIEndpoint(
          ENDPOINTS.VENDOR
        ).fetchAll();
        setVendors(vendorResponse.data);
        setFilteredVendors(vendorResponse.data); // Initialize filteredVendors with full list

        const productIds = vendorResponse.data.flatMap(
          (vendor) => vendor.productIds
        );
        const uniqueProductIds = [...new Set(productIds)];

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
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching vendors and products.", {
          position: "top-right",
        });
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter vendors when searchTerm changes
  useEffect(() => {
    const filtered = vendors.filter((vendor) =>
      vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(filtered);
  }, [searchTerm, vendors]);

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

  // Show confirmation dialog before deletion
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this vendor?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteVendor(id),
        },
        {
          label: "No",
          onClick: () =>
            toast.info("Vendor not deleted.", { position: "top-right" }),
        },
      ],
    });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="vendorTable">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search vendor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
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
                {filteredVendors.map((vendor, index) => (
                  <tr key={vendor._id}>
                    <td>{index + 1}</td>
                    <td>{vendor.vendorName}</td>
                    <td>
                      {vendor.productIds.length > 0
                        ? vendor.productIds
                            .map(
                              (productId) =>
                                productNamesMap[productId] || "Unknown Product"
                            )
                            .join(", ")
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
                        onClick={() => handleDelete(vendor.id)} // Use handleDelete here
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
