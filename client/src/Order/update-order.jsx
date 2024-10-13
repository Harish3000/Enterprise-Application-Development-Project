import React, { useEffect, useState } from "react";
import "../Styles/update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api";

const UpdateOrder = () => {
  const initialOrderState = {
    id: "",
    saleList: [
      {
        id: "",
        productId: "",
        vendorId: "",
        userId: "",
        productName: "",
        productQuantity: "",
        price: "",
        isPaid: false, // Initialize as false; will be replaced by fetched data
        isApproved: false, // Initialize as false; will be replaced by fetched data
        isDispatched: false, // Initialize as false; will be replaced by fetched data
        saleDate: "",
      },
    ],
    totalPrice: 0,
    deliveryStatus: "",
    isPaid: false, // Initialize as false; will be replaced by fetched data
    isApproved: false, // Initialize as false; will be replaced by fetched data
    isDispatched: false, // Initialize as false; will be replaced by fetched data
    orderDate: "",
  };

  const [order, setOrder] = useState(initialOrderState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.ORDER)
      .fetchByPost({ id })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [id]);

  const inputHandler = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedSaleList = [...order.saleList];

    // Update the state based on whether the input is a checkbox
    updatedSaleList[index] = {
      ...updatedSaleList[index],
      [name]: type === "checkbox" ? checked : value,
    };

    setOrder((prevOrder) => ({ ...prevOrder, saleList: updatedSaleList }));
  };

  const updateSale = async (sale) => {
    try {
      await createAPIEndpoint(ENDPOINTS.SALE).put(sale);
      console.log("--------", sale);
      toast.success("Sale updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error updating sale:", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const orderData = {
      id: order.id,
      isPaid: isComplete,
      isApproved: isComplete,
      isDispatched: isComplete,
      deliveryStatus: "completed",
    };

    try {
      await createAPIEndpoint(ENDPOINTS.ORDER).put(orderData);
      toast.success("Order updated successfully!", { position: "top-right" });
      navigate("/order");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order.", { position: "top-right" });
    }
  };

  // Check if all sales are paid, approved, and dispatched
  const isComplete = order.saleList.every(
    (sale) => sale.isPaid && sale.isApproved && sale.isDispatched
  );

  return (
    <div>
      <SideBarMenu />
      <div className="addOrder">
        <Link to="/order" className="btn btn-secondary">
          <i className="bi bi-skip-backward-fill" /> Go Back
        </Link>

        <h3>Update Order</h3>
        <form className="addOrderForm" onSubmit={submitForm}>
          {order.saleList.map((saleItem, index) => (
            <div key={saleItem.id} className="saleItemForm">
              <h4>Product {index + 1}</h4>
              <div className="inputGroup">
                <label>Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={saleItem.productName}
                  onChange={(e) => inputHandler(e, index)}
                  placeholder="Enter product name"
                  disabled
                />
              </div>
              <div className="inputGroup">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="productQuantity"
                  min="0"
                  value={saleItem.productQuantity}
                  onChange={(e) => inputHandler(e, index)}
                  placeholder="Enter quantity"
                  disabled
                />
              </div>
              <div className="inputGroup">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={saleItem.price}
                  onChange={(e) => inputHandler(e, index)}
                  placeholder="Enter price"
                  disabled
                />
              </div>
              <div className="inputGroup form-check form-switch">
                <input
                  type="checkbox"
                  name="isPaid"
                  className="form-check-input"
                  checked={saleItem.isPaid}
                  onChange={(e) => inputHandler(e, index)}
                />
                <label className="form-check-label">Paid</label>
              </div>
              <div className="inputGroup form-check form-switch">
                <input
                  type="checkbox"
                  name="isApproved"
                  className="form-check-input"
                  checked={saleItem.isApproved}
                  onChange={(e) => inputHandler(e, index)}
                />
                <label className="form-check-label">Approval</label>
              </div>
              <div className="inputGroup form-check form-switch">
                <input
                  type="checkbox"
                  name="isDispatched"
                  className="form-check-input"
                  checked={saleItem.isDispatched}
                  onChange={(e) => inputHandler(e, index)}
                />
                <label className="form-check-label">Dispatch</label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  updateSale({
                    Id: saleItem.id,
                    ProductId: saleItem.productId,
                    ProductQuantity: saleItem.productQuantity,
                    IsPaid: saleItem.isPaid,
                    IsApproved: saleItem.isApproved,
                    IsDispatched: saleItem.isDispatched,
                  })
                }
              >
                Update
              </button>
            </div>
          ))}
          <div className="inputGroup">
            <button type="submit" className="btn" disabled={!isComplete}>
              Complete Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;
