import {
  fetchCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
} from "../../../api/cart.api";

export const getCart = () => fetchCartApi();

export const addItemToCart = (productId, quantity = 1) =>
  addToCartApi(productId, quantity);

export const updateCartItem = (productId, quantity) =>
  updateCartItemApi(productId, quantity);

export const removeItemFromCart = (productId) =>
  removeCartItemApi(productId);
