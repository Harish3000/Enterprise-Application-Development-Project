import React, { useEffect, useState } from "react";
import "../Styles/order.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";

const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.ORDER).fetchById();
        setOrders(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteOrder = async orderId => {
    await axios
      .delete(`api/Order`)
      .then(response => {
        setOrders(prevOrder =>
          prevOrder.filter(order => order._id !== orderId)
        );
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="orderTable">
        <Link to="/add-order" type="button" className="addBtn">
          Add Order <i class="bi bi-plus-circle-fill" />
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Paid</th>
              <th scope="col">Approved</th>
              <th scope="col">Dispatched</th>
              <th scope="col">Sale Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr>
                  <td>
                    {order.orderId}
                  </td>
                  <td>
                    {order.productName}{" "}
                  </td>
                  <td>
                    {order.productQantity}
                  </td>
                  <td>
                    {order.price}
                  </td>
                  <td>
                    {order.isPaid ? "Yes" : "No"}
                  </td>
                  <td>
                    {order.isApproved ? "Yes" : "No"}
                  </td>
                  <td>
                    {order.isDispatched ? "Yes" : "No"}
                  </td>
                  <td>
                    {order.saleDate}
                  </td>
                  <td>
                    {order.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="actionButtons">
                    <Link
                      to={`/update-order/` + order._id}
                      type="button"
                      class="btn btn-info"
                    >
                      <i class="bi bi-pencil-square" />
                    </Link>

                    <button
                      onClick={() => deleteOrder(order._id)}
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

export default Order;
