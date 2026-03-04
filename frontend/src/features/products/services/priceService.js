/**
 * Return discounted/final price if backend marks product as discounted.
 * Frontend does not perform discount business calculations.
 */
export function getSalePrice(product) {
  const original = Number(product?.price);
  const final = Number(product?.finalPrice ?? product?.discounted_price);
  const hasDiscount = Boolean(product?.hasDiscount);

  if (Number.isNaN(original) || Number.isNaN(final)) return null;
  if (!hasDiscount) return null;
  if (final >= original) return null;

  return +final.toFixed(2);
}

/**
 * Return backend-provided discount percentage.
 */
export function getDiscountPercent(product) {
  const percent = Number(product?.discount_percent);
  if (Number.isNaN(percent) || percent <= 0) return 0;
  return Math.round(percent);
}
