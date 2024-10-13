import React, { useEffect, useState } from "react";
import "../Styles/vendor.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]); // State for filtered vendors
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [productNamesMap, setProductNamesMap] = useState({}); // To store product names by product ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorResponse = await createAPIEndpoint(
          ENDPOINTS.VENDOR
        ).fetchAll();
        setVendors(vendorResponse.data);
        setFilteredVendors(vendorResponse.data); // Initialize filtered vendors

        const productIds = vendorResponse.data.flatMap(
          vendor => vendor.productIds
        );
        const uniqueProductIds = [...new Set(productIds)]; // Remove duplicate product IDs

        // Fetch product names and map them to product IDs
        const productNamesMap = {};
        for (let productId of uniqueProductIds) {
          try {
            const productResponse = await createAPIEndpoint(
              ENDPOINTS.PRODUCT
            ).getById(productId);
            productNamesMap[productId] = productResponse.data.productName;
          } catch (error) {
            console.error(error);
          }
        }
        setProductNamesMap(productNamesMap);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching vendors and products.", {
          position: "top-right"
        });
      }
    };
    fetchData();
  }, []);

  const deleteVendor = async id => {
    try {
      await createAPIEndpoint(ENDPOINTS.VENDOR).delete(id);
      setVendors(prevVendors => prevVendors.filter(vendor => vendor.id !== id));
      setFilteredVendors(prevVendors =>
        prevVendors.filter(vendor => vendor.id !== id)
      );
      toast.success("Vendor deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    const search = event.target.value.toLowerCase();

    if (search === "") {
      setFilteredVendors(vendors); // Reset to all vendors if search term is cleared
    } else {
      setFilteredVendors(
        vendors.filter(
          vendor =>
            vendor.vendorName.toLowerCase().includes(search) ||
            vendor.vendorRank.toString().includes(search) ||
            (vendor.isActive
              ? "active".includes(search)
              : "inactive".includes(search))
        )
      );
    }
  };

  const handleUpdateClick = async vendor => {
    try {
      navigate("/update-vendor", { state: { vendorId: vendor._id } });
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

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="searchBar"
        />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>

              <th scope="col">Rank</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, index) =>
              <tr key={vendor._id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  {vendor.vendorName}
                </td>
                <td>
                  {vendor.vendorRank}
                </td>
                <td>
                  {vendor.isActive ? "Active" : "Inactive"}
                </td>
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
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
