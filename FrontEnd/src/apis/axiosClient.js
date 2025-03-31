import axios from 'axios';
import queryString from 'querystring';

export const baseURL = "http://localhost:3001/";

if (!baseURL) {
  console.error('⚠️ VITE_APP_BASE_URL is not defined. Check your .env file.');
}

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // quan trọng để gửi cookie refreshToken
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await axios.post(`${baseURL}refresh-token`, {}, { withCredentials: true });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(error.config);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
