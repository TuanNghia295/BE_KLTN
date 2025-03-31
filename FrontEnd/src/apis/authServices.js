import axiosClient from "./axiosClient";
import Cookies from 'js-cookie'
import { useStoreProvider } from '../contexts/StoreProvider'

export const login = async ({ phone, password }) => {
  const response = await axiosClient.post(`/auth/login`, { phone, password }, {
    withCredentials: true, // Để gửi cookie
  });

  // Lưu accessToken vào cookie
  document.cookie = `accesstoken=${response.data.accessToken}; path=/; SameSite=Lax`;

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
  Cookies.remove('accesstoken')
  return response
}
