import React, { useEffect, useState } from "react";
import "../Styles/vendor.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/vendor");
        setVendors(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteVendor = async (vendorId) => {
    await axios
      .delete(`http://localhost:8000/api/vendor/delete/${vendorId}`)
      .then((response) => {
        setVendors((prevVendor) =>
          prevVendor.filter((vendor) => vendor._id !== vendorId)
        );
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="vendorTable">
      <Link to="/add-vendor" type="button" className="addBtn">
        Add Vendor <i class="bi bi-plus-circle-fill"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Vendor Id</th>
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
                <td>{vendor.vendorId}</td>
                <td>{vendor.vendorName} </td>
                <td>{vendor.productId}</td>
                <td>{vendor.vendorRank}</td>
                <td>{vendor.isActive ? "Active" : "Inactive"}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update-vendor/` + vendor._id}
                    type="button"
                    class="btn btn-info"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </Link>

                  <button
                    onClick={() => deleteVendor(vendor._id)}
                    type="button"
                    class="btn btn-danger"
                  >
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Vendor;
