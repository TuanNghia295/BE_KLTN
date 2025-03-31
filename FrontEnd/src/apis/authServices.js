import axiosClient from "./axiosClient";

export const login = async ({ phone, password }) => {
  const response = await axiosClient.post(`/auth/login`, { phone, password }, {
    withCredentials: true, // Để gửi cookie
  });

  // Lưu _id vào cookie
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

