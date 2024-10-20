//author: Harini Chamathka
// Path: client/src/Product/product-list.jsx

import React, { useEffect, useState } from "react";
import "../Styles/product.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.PRODUCT).fetchAll();
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts with full list
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const deleteProduct = async (id) => {
    try {
      await createAPIEndpoint(ENDPOINTS.PRODUCT).delete(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      toast.success("Product deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Show confirmation dialog before deletion
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProduct(id),
        },
        {
          label: "No",
          onClick: () =>
            toast.info("Product not deleted.", { position: "top-right" }),
        },
      ],
    });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="productTable">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link to="/add-product" type="button" className="addBtn">
          Add Product <i className="bi bi-plus-circle-fill" />
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Rating</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
              <th scope="col">Vendor</th>
              <th scope="col">Status</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productRating}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.productStock}</td>
                  <td>{product.vendorName}</td>
                  <td>{product.isActive ? "Active" : "Inactive"}</td>
                  <td>{product.productImage}</td>
                  <td className="actionButtons">
                    <Link
                      key={product.id}
                      to={`/update-product/${product.id}`}
                      type="button"
                      className="btn btn-info"
                    >
                      <i className="bi bi-pencil-square" />
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)} // Use handleDelete for confirmation
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

export default Product;
