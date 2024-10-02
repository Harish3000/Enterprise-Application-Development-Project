import axios from "axios";

export const ENDPOINTS = {
  PRODUCT: "Product",
  VENDOR: "Vendor",
  ORDER: "Order",
};

// Get token from localStorage or wherever it's stored
const token = localStorage.getItem("token");

export const createAPIEndpoint = (endpoint) => {
  let url = "api/" + endpoint + "/";

  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`, // Include the JWT token in the header
      "Content-Type": "application/json",
    },
  });

  return {
    fetchAll: () => axiosInstance.get("/").catch(handleError),
    fetchById: () => axiosInstance.get(`/getById`).catch(handleError),
    post: (newProduct) =>
      axiosInstance.post("/", newProduct).catch(handleError),
    put: (updatedProduct) =>
      axiosInstance.put(`/`, updatedProduct).catch(handleError),
    delete: () => axiosInstance.delete(`/`).catch(handleError),
  };
};

// Global error handler for axios
const handleError = (error) => {
  if (error.response) {
    // Client received an error response (5xx, 4xx)
    console.error("Error Response:", error.response);
    return Promise.reject(error.response.data);
  } else if (error.request) {
    // Client never received a response, or request never left
    console.error("Error Request:", error.request);
    return Promise.reject("Network error, please try again.");
  } else {
    // Anything else
    console.error("Error:", error.message);
    return Promise.reject(error.message);
  }
};
