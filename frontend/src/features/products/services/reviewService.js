/**
 * Calculate the average rating for a list of reviews
 * @param {Array<{ rating: number }>} reviews - Array of review objects
 * @returns {number} Average rating (0 if no reviews)
 */
export function getAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return +(sum / reviews.length).toFixed(1);
}

/**
 * Count total reviews
 * @param {Array} reviews
 * @returns {number} Number of reviews
 */
export function getReviewCount(reviews) {
  return reviews ? reviews.length : 0;
}
