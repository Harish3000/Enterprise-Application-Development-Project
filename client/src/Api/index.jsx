import axios from "axios";

export const ENDPOINTS = {
  PRODUCT: "Product",
  VENDOR: "Vendor",
  ORDER: "Order"
};

export const createAPIEndpoint = endpoint => {
  let url = "api/" + endpoint + "/";
  return {
    fetchAll: () => axios.get(url),
    fetchById: id => axios.get(url + id),
    post: newProduct => axios.post(url, newProduct),
    put: (id, updatedProduct) => axios.put(url + id, updatedProduct),
    delete: id => axios.delete(url + id)
  };
};
