import { apiClient } from "./client";


export const fetchCartApi = () =>
  apiClient.get("/user/cart/").then(res => res.data);

export const addToCartApi = (productId, quantity) =>
  apiClient.post("/user/cart/items", {
    product_id: productId,
    quantity,
  }).then(res => res.data);

export const updateCartItemApi = (productId, quantity) =>
  apiClient.put(`/user/cart/items/${productId}`, {
    quantity,
  }).then(res => res.data);

export const removeCartItemApi = (productId) =>
  apiClient.delete(`/user/cart/items/${productId}`)
    .then(res => res.data);
