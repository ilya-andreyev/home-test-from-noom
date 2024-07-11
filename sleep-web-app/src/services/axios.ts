import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.REACT_APP_AUTH_TOKEN;

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
