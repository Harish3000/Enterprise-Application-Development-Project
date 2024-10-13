import React, { useEffect, useState } from "react";
import "../Styles/product.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SideBarMenu from "../Components/SideBarMenu";
import { createAPIEndpoint, ENDPOINTS } from "../Api/index";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndpoint(ENDPOINTS.PRODUCT).fetchAll();
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async id => {
    try {
      await createAPIEndpoint(ENDPOINTS.PRODUCT).delete(id);
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== id)
      );
      setFilteredProducts(prevProducts =>
        prevProducts.filter(product => product.id !== id)
      );
      toast.success("Product deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle the search input
  const handleSearch = event => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredProducts(products); // Reset to all products if search term is cleared
    } else {
      const search = event.target.value.toLowerCase();
      setFilteredProducts(
        products.filter(
          product =>
            product.productName.toLowerCase().includes(search) ||
            product.vendorName.toLowerCase().includes(search) ||
            product.productDescription.toLowerCase().includes(search) ||
            product.categoryName.toLowerCase().includes(search) ||
            product.productPrice.toString().includes(search) ||
            product.productRating.toString().includes(search) ||
            (product.isActive
              ? "active".includes(search)
              : "inactive".includes(search)) ||
            product.productStock.toString().includes(search)
        )
      );
    }
  };

  // Function to confirm and delete product
  const confirmDelete = id => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this product?",
      closeOnClickOutside: true,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProduct(id)
        },
        {
          label: "No",
          onClick: () =>
            toast.error("Product deletion canceled", {
              position: "top-right"
            })
        }
      ]
    });
  };

  return (
    <div>
      <SideBarMenu />
      <div className="productTable">
        <Link to="/add-product" type="button" className="addBtn">
          Add Product <i className="bi bi-plus-circle-fill" />
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
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {product.productName}
                  </td>
                  <td>
                    {product.productDescription}
                  </td>
                  <td>
                    {product.productPrice}
                  </td>
                  <td>
                    {product.productRating}
                  </td>
                  <td>
                    {product.categoryName}
                  </td>
                  <td>
                    {product.productStock}
                  </td>
                  <td>
                    {product.vendorName}
                  </td>
                  <td>
                    {product.isActive ? "Active" : "Inactive"}
                  </td>
                  <td>
                    {product.productImage}
                  </td>
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
                      onClick={() => confirmDelete(product.id)}
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
