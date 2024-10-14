import axios from "axios";

export const ENDPOINTS = {
  PRODUCT: "Product",
  VENDOR: "Vendor",
  ORDER: "Order",
  USER: "User",
};

// Get token from localStorage or wherever it's stored
const token = localStorage.getItem("token");

export const createAPIEndpoint = (endpoint) => {
  const url = `/api/${endpoint}/`; // Correctly format the base URL

  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`, // Bearer token attached here
      "Content-Type": "application/json",
    },
  });

  return {
    fetchAll: () => axiosInstance.get("/").catch(handleError),
    fetchById: (id) => axiosInstance.get(`/getById`, id).catch(handleError),
    fetchCompletedOrders: () =>
      axiosInstance.get("/ordersCompleted").catch(handleError),
    fetchByPost: (id) => axiosInstance.post("/getById", id).catch(handleError),
    fetchVendorProductsByPost: (id) =>
      axiosInstance.post("/getByVendorId", id).catch(handleError),
    post: (newDetails) =>
      axiosInstance.post("/", newDetails).catch(handleError),
    put: (updatedDetails) =>
      axiosInstance.put("/", updatedDetails).catch(handleError),
    delete: (id) =>
      axiosInstance.delete("/delete", { data: { id } }).catch(handleError),
  };
};

// Global error handler for axios
const handleError = (error) => {
  if (error.response) {
    console.error("Error Response:", error.response);
    return Promise.reject(error.response.data);
  } else if (error.request) {
    console.error("Error Request:", error.request);
    return Promise.reject("Network error, please try again.");
  } else {
    console.error("Error:", error.message);
    return Promise.reject(error.message);
  }
};
