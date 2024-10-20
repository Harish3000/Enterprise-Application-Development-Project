//author: Harini Chamathka
//path: src/Order/Order.jsx

import React, { useEffect, useState } from "react";
import "../Styles/order.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); // For filtered orders
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(
          ENDPOINTS.ORDER
        ).fetchCompletedOrders();
        setOrders(response.data);
        setFilteredOrders(response.data); // Initialize filteredOrders with full list
      } catch (error) {
        console.error("Error while fetching orders", error);
      }
    };
    fetchData();
  }, []);

  // Filter orders based on search term across all columns
  useEffect(() => {
    const filtered = orders.filter((order) => {
      return order.saleList.some((saleItem) => {
        return (
          order.id.toString().includes(searchTerm.toLowerCase()) ||
          saleItem.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          saleItem.productQuantity
            .toString()
            .includes(searchTerm.toLowerCase()) ||
          saleItem.price.toString().includes(searchTerm.toLowerCase()) ||
          (saleItem.isPaid ? "yes" : "no").includes(searchTerm.toLowerCase()) ||
          (saleItem.isApproved ? "yes" : "no").includes(
            searchTerm.toLowerCase()
          ) ||
          (saleItem.isDispatched ? "yes" : "no").includes(
            searchTerm.toLowerCase()
          ) ||
          new Date(saleItem.saleDate)
            .toLocaleDateString()
            .includes(searchTerm.toLowerCase()) ||
          order.totalPrice.toString().includes(searchTerm.toLowerCase()) ||
          order.deliveryStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const deleteOrder = async (orderId) => {
    try {
      await createAPIEndpoint(ENDPOINTS.ORDER).delete(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      toast.success("Order deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.", { position: "top-right" });
    }
  };

  // Show confirmation dialog before deletion
  const handleDelete = (orderId) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this order?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteOrder(orderId),
        },
        {
          label: "No",
          onClick: () =>
            toast.info("Order not deleted.", { position: "top-right" }),
        },
      ],
    });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="orderTable">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* <Link to="/add-order" className="addBtn">
          Add Order <i className="bi bi-plus-circle-fill" />
        </Link> */}

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Approved</th>
              <th>Dispatched</th>
              <th>Sale Date</th>
              <th>Total Price</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <React.Fragment key={order.id}>
                {order.saleList.map((saleItem, index) =>
                  index === 0 ? (
                    <tr key={saleItem.id}>
                      <td rowSpan={order.saleList.length}>{order.id}</td>
                      <td>{saleItem.productName}</td>
                      <td>{saleItem.productQuantity}</td>
                      <td>{saleItem.price}</td>
                      <td>{saleItem.isPaid ? "Yes" : "No"}</td>
                      <td>{saleItem.isApproved ? "Yes" : "No"}</td>
                      <td>{saleItem.isDispatched ? "Yes" : "No"}</td>
                      <td>
                        {new Date(saleItem.saleDate).toLocaleDateString()}
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>{order.deliveryStatus}</td>
                      <td
                        rowSpan={order.saleList.length}
                        className="actionButtons"
                      >
                        <Link
                          to={`/update-order/${order.id}`}
                          className="btn btn-info"
                        >
                          <i className="bi bi-pencil-square" />
                        </Link>
                        <button
                          onClick={() => handleDelete(order.id)} // Use handleDelete for confirmation
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash3-fill" />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={saleItem.id}>
                      <td>{saleItem.productName}</td>
                      <td>{saleItem.productQuantity}</td>
                      <td>{saleItem.price}</td>
                      <td>{saleItem.isPaid ? "Yes" : "No"}</td>
                      <td>{saleItem.isApproved ? "Yes" : "No"}</td>
                      <td>{saleItem.isDispatched ? "Yes" : "No"}</td>
                      <td>
                        {new Date(saleItem.saleDate).toLocaleDateString()}
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>{order.deliveryStatus}</td>
                    </tr>
                  )
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
