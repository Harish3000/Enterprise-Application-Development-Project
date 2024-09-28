import express from "express";

import {
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
} from "../controller/vendorController.js";

const route = express.Router();

route.post("/add", createVendor);
route.get("/", getAllVendors);
route.get("/:id", getVendorById);
route.put("/update/:id", updateVendor);
route.delete("/delete/:id", deleteVendor);

export default route;
