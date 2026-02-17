import axios from "axios";
import { message } from "antd";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

/* -------------------- Request Interceptor -------------------- */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -------------------- Response Interceptor -------------------- */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      // FastAPI validation errors
      message.error(detail[0]?.msg || "Validation error");
    } else if (detail) {
      message.error(detail);
    } else if (error.response?.status === 401) {
      message.error("Unauthorized. Please login again.");
      localStorage.removeItem("access_token");
    } else {
      message.error("Something went wrong. Please try again.");
    }

    return Promise.reject(error);
  }
);
