import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

let sessionExpiredNotified = false;

const notifyError = (text) => {
  toast.error(text, { autoClose: 2500 });
};

const notifyWarning = (text) => {
  toast.warning(text, { autoClose: 2500 });
};

const clearAuthSession = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  store.dispatch(logout());
};

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 <= Date.now();
};

/* -------------------- Request Interceptor -------------------- */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token && isTokenExpired(token)) {
    clearAuthSession();

    if (!sessionExpiredNotified) {
      notifyWarning("Session expired. Please login again.");
      sessionExpiredNotified = true;
    }

    return Promise.reject(new Error("Token expired"));
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  sessionExpiredNotified = false;
  return config;
});

/* -------------------- Response Interceptor -------------------- */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error?.response?.data?.detail;
    const status = error?.response?.status;

    if (status === 401) {
      clearAuthSession();
      if (!sessionExpiredNotified) {
        notifyError("Session expired. Please login again.");
        sessionExpiredNotified = true;
      }
      return Promise.reject(error);
    }

    if (Array.isArray(detail)) {
      // FastAPI validation errors
      notifyError(detail[0]?.msg || "Validation error");
    } else if (detail) {
      notifyError(detail);
    } else {
      notifyError("Something went wrong. Please try again.");
    }

    return Promise.reject(error);
  }
);

// Default export for compatibility
export default apiClient;

