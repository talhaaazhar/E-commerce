// features/products/services/productService.js
import * as productApi from "../../../api/product";

/**
 * Get products ready for frontend display
 * - Can combine discounts, ratings, sorting etc.
 */
export const getProductsForDisplay = async (filters) => {
  const products = await productApi.fetchProducts(filters);
  // Business logic: maybe calculate discounted price, filter further, etc.
  return products.map((p) => ({
    ...p,
    finalPrice: p.discounted_price ?? p.price,
  }));
};

export const getProductDetailForDisplay = async (productId) => {
  const product = await productApi.fetchProductDetail(productId);
  // Business logic: calculate something, pick related products, etc.
  return product;
};

/**
 * Wrapper for hooks - alias names
 */
export const getProducts = getProductsForDisplay;
export const getProductDetails = getProductDetailForDisplay;
