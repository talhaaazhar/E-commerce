import { apiClient } from "./client";

/* Checkout */
export const checkoutApi = () => {
  return apiClient.post("/user/orders/checkout");
};

/* Order History */
export const getOrdersApi = () => {
  return apiClient.get("/user/orders/history");
};

