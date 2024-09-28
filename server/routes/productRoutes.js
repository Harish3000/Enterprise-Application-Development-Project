import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/productController.js";  

const productRoute = express.Router();

route.post("/", createProduct);
route.get("/all-products", getAllProducts);
route.get("/:id", getProductById);
route.put("/update/:id", updateProduct);
route.delete("/delete/:id", deleteProduct);

export default productRoute;
