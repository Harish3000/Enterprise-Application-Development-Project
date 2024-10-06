import React, { useEffect, useState } from "react";
import "../Styles/vendor.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.VENDOR).fetchAll();
        setVendors(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
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

  return (
    <div>
      <SideBarMenu />
      <div className="vendorTable">
        <Link to="/add-vendor" type="button" className="addBtn">
          Add Vendor <i class="bi bi-plus-circle-fill" />
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
            {vendors.map((vendor, index) => {
              return (
                <tr>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {vendor.vendorName}{" "}
                  </td>
                  <td>
                    {vendor.productIds.length > 0
                      ? vendor.productIds.map(product => product.Id).join(", ")
                      : "No Products"}
                  </td>
                  <td>
                    {vendor.vendorRank}
                  </td>
                  <td>
                    {vendor.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="actionButtons">
                    <Link
                      to={`/update-vendor/` + vendor._id}
                      type="button"
                      class="btn btn-info"
                    >
                      <i class="bi bi-pencil-square" />
                    </Link>

                    <button
                      onClick={() => deleteVendor(vendor._id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash3-fill" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
