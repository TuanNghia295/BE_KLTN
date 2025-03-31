import axiosClient from "./axiosClient";
import Cookies from 'js-cookie'
import { useStoreProvider } from '../contexts/StoreProvider'

export const login = async ({ phone, password }) => {
  const response = await axiosClient.post(`/auth/login`, { phone, password }, {
    withCredentials: true, // Để gửi cookie
  });

  localStorage.setItem("accesstoken", response.data.accessToken);

  return response.data;
};

export const getUserInfo = async (accesstoken) => {
  const response = await axiosClient.get('/users/userInfo', {
    headers: {
      Authorization: `Bearer ${accesstoken}`, // Gửi token trong header
    },
  })

  return response.data
} 

export const logout = async () => {
  const response = await axiosClient.post('/auth/logout')
  localStorage.removeItem("accesstoken", response.data.accessToken);

  return response
}
