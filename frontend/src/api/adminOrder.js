import apiClient from "./client";

/**
 * Admin Orders API
 * Handles all HTTP requests related to admin order management
 */

/**
 * Get all orders with optional filters
 * @param {Object} params
 * @param {string} params.status
 * @param {number} params.user_id
 */
export const getAdminOrdersApi = (params = {}) => {
  return apiClient.get("/admin/orders", { params });
};


/**
 * Get only pending orders
 */
export const getAdminPendingOrdersApi = () => {
  return apiClient.get("/admin/orders/pending");
};

export const updateAdminOrderStatusApi = (orderId, status) => {
  return apiClient.patch(`/admin/orders/${orderId}/status`, null, {
    params: { status },
  });
};

