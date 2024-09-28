import React, { useEffect, useState } from "react";
import "../Styles/product.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product");
        setProducts(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/product/${productId}`)
      .then((response) => {
        setProducts((prevProduct) => prevProduct.filter((product) => product._id !== productId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="productTable">
      <Link to="/product" type="button" className="addBtn">
        Add Product   <i class="bi bi-plus-circle-fill"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Product No.</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
            <th scope="col">Category</th>
            <th scope="col">Stock</th>
            <th scope="col">Vendor</th>
            <th scope="col">Status</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                {/* <td>{product.productImage}</td> */}
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>{product.productPrice}</td>
                <td>{product.productRating}</td>
                <td>{product.categoryName}</td>
                <td>{product.productStock}</td>
                <td>{product.isActive ? "Active" : "Inactive"}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/` + product._id}
                    type="button"
                    class="btn btn-info"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
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

export default Product;
