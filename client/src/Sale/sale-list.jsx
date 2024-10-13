//author: Harini chamathka
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.SALE).fetchAll();
        setSales(response.data);
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
      toast.success("Sale deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Function to confirm and delete product
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

  return (
    <div>
      <SideBarMenu />
      <div className="saleTable">
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
            {sales.map((sale, index) => {
              return (
                <tr>
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
                    {sale.isApproved ? "Approved" : "Not Approved"}
                  </td>
                  <td>
                    {sale.isDispatched ? "Dispatched" : "Not Dispatched"}
                  </td>
                  <td>
                    {sale.saleDate}
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
