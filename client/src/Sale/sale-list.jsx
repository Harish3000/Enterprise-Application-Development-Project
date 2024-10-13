// author: Harini Chamathka
// Path: client/src/Sale/sale-list.jsx

import React, { useEffect, useState } from "react";
import "../Styles/sale.css";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]); // For filtering sales
  const [searchTerm, setSearchTerm] = useState(""); // For handling search input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.SALE).fetchAll();
        setSales(response.data);
        setFilteredSales(response.data); // Initialize filtered sales
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteSale = async Id => {
    try {
      await createAPIEndpoint(ENDPOINTS.SALE).delete(Id);
      setSales(prevSales => prevSales.filter(sale => sale.id !== Id));
      setFilteredSales(prevSales => prevSales.filter(sale => sale.id !== Id)); // Update filtered sales
      toast.success("Sale deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  // Function to confirm and delete sale
  const confirmDelete = id => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this sale?",
      closeOnClickOutside: true,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteSale(id)
        },
        {
          label: "No",
          onClick: () =>
            toast.error("Sale deletion canceled", {
              position: "top-right"
            })
        }
      ]
    });
  };

  // Handle search input
  const handleSearch = event => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredSales(sales); // Reset filtered sales to all sales when search is cleared
    } else {
      const search = event.target.value.toLowerCase();
      setFilteredSales(
        sales.filter(
          sale =>
            sale.productName.toLowerCase().includes(search) ||
            sale.vendorId.toLowerCase().includes(search) ||
            sale.price.toString().includes(search) ||
            sale.productQuantity.toString().includes(search) ||
            (sale.isPaid
              ? "paid".includes(search)
              : "not paid".includes(search)) ||
            (sale.isApproved
              ? "approved".includes(search)
              : "not approved".includes(search)) ||
            (sale.isDispatched
              ? "dispatched".includes(search)
              : "not dispatched".includes(search)) ||
            new Date(sale.saleDate).toLocaleDateString().includes(search)
        )
      );
    }
  };

  return (
    <div>
      <SideBarMenu />
      <div className="saleTable">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search sales"
          value={searchTerm}
          onChange={handleSearch}
          className="searchBar"
        />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Product</th>
              <th scope="col">Vendor</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Paid</th>
              <th scope="col">Approval</th>
              <th scope="col">Dispatch</th>
              <th scope="col">Sale Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => {
              return (
                <tr key={sale.id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {sale.productName}
                  </td>
                  <td>
                    {sale.vendorId}
                  </td>
                  <td>
                    {sale.productQuantity}
                  </td>
                  <td>
                    {sale.price}
                  </td>
                  <td>
                    {sale.isPaid ? "Paid" : "Not Paid"}
                  </td>
                  <td>
                    {sale.isApproved ? "Approved" : "Pending"}
                  </td>
                  <td>
                    {sale.isDispatched ? "Dispatched" : "No"}
                  </td>
                  <td>
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </td>
                  <td className="actionButtons">
                    <button
                      onClick={() => confirmDelete(sale.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash3-fill" />
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

export default Sale;
