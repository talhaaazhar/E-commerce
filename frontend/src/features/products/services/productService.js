// features/products/services/productService.js
import * as productApi from "../../../api/product";

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

const normalizeProductPricing = (product) => {
  const price = toNumberOrNull(product?.price);
  const discountedPrice = toNumberOrNull(product?.discounted_price);
  const discountPercent = toNumberOrNull(product?.discount_percent);

  const hasDiscount =
    (discountPercent !== null && discountPercent > 0) ||
    (discountedPrice !== null && price !== null && discountedPrice < price);

  const finalPrice = hasDiscount && discountedPrice !== null ? discountedPrice : price;

  return {
    ...product,
    price: price ?? product?.price,
    discounted_price: discountedPrice,
    discount_percent: discountPercent,
    finalPrice,
    hasDiscount,
  };
};

/**
 * Get products ready for frontend display
 */
export const getProductsForDisplay = async (filters) => {
  const products = await productApi.fetchProducts(filters);
  return products.map(normalizeProductPricing);
};

export const getProductDetailForDisplay = async (productId) => {
  const product = await productApi.fetchProductDetail(productId);
  return normalizeProductPricing(product);
};

/**
 * Wrapper for hooks - alias names
 */
export const getProducts = getProductsForDisplay;
export const getProductDetails = getProductDetailForDisplay;
