import axios from "axios";
import { store } from "../store/root";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
