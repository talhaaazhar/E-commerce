import { apiClient } from "./client";

// Base URL for analytics endpoints
const API_BASE = "/admin/analytics";


export const getSalesSummary=() => {
  return apiClient.get(`${API_BASE}/summary`);
};


export const getSalesOverTime = (params) => {
  return apiClient.get(`${API_BASE}/sales-over-time`, { params });
}

export const getTopProducts = (params) => {
  return apiClient.get(`${API_BASE}/top-products`, { params });
}

export const getRevenueByProduct = (params) => {
  return apiClient.get(`${API_BASE}/revenue-by-product`, { params });
}