import axios from "axios";


export const BASE_URL = "http://localhost:5164/";

const ENDPOINTS = {
    PRODUCT: 'product',
    VENDOR: 'vendor',
    ORDER: 'order'
}
export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/'+ endpoint + "/";
    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        createProduct: newProduct => axios.post(url, newProduct),
        updateProduct: (id, updatedProduct) => axios.put(url + id, updatedProduct),
        deleteProduct: id => axios.delete(url + id)
    }
}