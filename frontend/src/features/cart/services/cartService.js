import {
  fetchCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
} from "../../../api/cart";

/**
 * Fetch user's cart
 */
export const getCart = async () => {
  return await fetchCartApi();
};

/**
 * Add item to cart
 */
export const addItemToCart = async (productId, quantity) => {
  return await addToCartApi(productId, quantity);
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (productId, quantity) => {
  return await updateCartItemApi(productId, quantity);
};

/**
 * Remove item from cart
 */
export const removeItemFromCart = async (productId) => {
  return await removeCartItemApi(productId);
};
