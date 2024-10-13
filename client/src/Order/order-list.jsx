//author: Harini chamathka
//path: src/Order/Order.jsx

import React, { useEffect, useState } from "react";
import "../Styles/order.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(
          ENDPOINTS.ORDER
        ).fetchCompletedOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Error while fetching orders", error);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div>
      <SideBarMenu />
      <div className="orderTable">
        <Link to="/add-order" className="addBtn">
          Add Order <i className="bi bi-plus-circle-fill" />
        </Link>

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
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                {order.saleList.map((saleItem, index) =>
                  index === 0 ? ( // Only show the order ID and details for the first sale item
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
                          onClick={() => deleteOrder(order.id)}
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
