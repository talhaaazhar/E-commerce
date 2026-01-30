/**
 * Calculate the sale price for a product
 * @param {Object} product - The product object containing price and sale info
 * @param {number} product.price - Original price
 * @param {number} [product.sale] - Sale fraction (0.2 = 20%)
 * @returns {number | null} Sale price or null if no sale
 */
export function getSalePrice(product) {
  if (!product.sale || product.sale <= 0) return null;
  return +(product.price * (1 - product.sale)).toFixed(2);
}

/**
 * Calculate the discount percentage for a product
 * @param {Object} product
 * @param {number} [product.sale] - Sale fraction
 * @returns {number} Discount percentage (0-100)
 */
export function getDiscountPercent(product) {
  return product.sale ? Math.round(product.sale * 100) : 0;
}
