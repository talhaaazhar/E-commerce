import { apiClient } from "./client";

export const fetchProducts = async (filters) => {
  // Clean up filters: convert empty strings to null for numeric fields
  const cleanedFilters = {
    ...filters,
    search: filters.search || null,
    category: filters.category || null,
    min_price: filters.min_price ? Number(filters.min_price) : null,
    max_price: filters.max_price ? Number(filters.max_price) : null,
    min_rating: filters.min_rating ? Number(filters.min_rating) : null,
  };
  
  // Remove null values from params
  const params = Object.fromEntries(
    Object.entries(cleanedFilters).filter(([_, value]) => value !== null && value !== "")
  );
  
  const response = await apiClient.get("/user/products/", { params });
  return response.data;
};

export const fetchProductDetail = async (productId) => {
  const response = await apiClient.get(`/user/products/${productId}`);
  return response.data;
};