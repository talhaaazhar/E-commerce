// src/features/products/hooks/useReviews.js
import { useState, useEffect } from "react";
import { apiClient } from "../../../api/client";

/**
 * Hook to fetch product reviews
 * @param {number} productId - Product ID to fetch reviews for
 * @param {Array} initialReviews - Optional initial reviews (e.g., from ProductDetail response)
 * @returns {Object} { reviews, loading, error }
 */
export function useReviews(productId, initialReviews = null) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [loading, setLoading] = useState(!initialReviews);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If reviews are already provided (from ProductDetail), don't fetch
    if (initialReviews && initialReviews.length > 0) {
      setReviews(initialReviews);
      setLoading(false);
      return;
    }

    // Only fetch if productId exists and reviews weren't provided
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get(`/user/reviews/product/${productId}`);
        setReviews(response.data || []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError(err.message);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, initialReviews]);

  return { reviews, loading, error };
}
