import axiosClient from "./axiosClient";

export const getAllProducts = async () => {
    const response = await axiosClient.get('/products/getAllProducts')
    return response.data;
}

export const getDetailProducts = async (productName) => {
    const response = await axiosClient.get(`/products/getSingleProduct?name=${productName.name}`)
    return response.data
}