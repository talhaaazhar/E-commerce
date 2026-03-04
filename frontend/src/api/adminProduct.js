import apiClient from "./client";

export const fetchProducts = (params) => apiClient.get("/admin/products/", { params });
export const createProduct = (data) => apiClient.post("/admin/products/", data);
export const updateProduct = (productId, data) => apiClient.put(`/admin/products/${productId}`, data);
export const deactivateProduct = (productId) => apiClient.delete(`/admin/products/${productId}`);
export const hardDeleteProduct = (productId) => apiClient.delete(`/admin/products/${productId}/hard`);
export const activateProduct = (productId) => apiClient.patch(`/admin/products/${productId}/activate`);
export const uploadProductImage = (productId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return apiClient.post(`/admin/products/${productId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const removeProductImage = (productId, imageUrl) => apiClient.delete(`/admin/products/${productId}/images`, {
  params: { image_url: imageUrl },
});