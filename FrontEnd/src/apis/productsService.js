import axiosClient from "./axiosClient";

export const getAllProducts = async () => {
    const response = await axiosClient.get('/products/getAllProducts')
    return response.data;
}

export const getDetailProducts = async (productId) => {
    const response = await axiosClient.get(`/products/getSingleProduct/${productId.id}`)
    return response.data
}