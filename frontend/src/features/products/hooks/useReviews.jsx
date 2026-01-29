// src/features/products/hooks/useReviews.js
import { useState, useEffect } from "react";
import { MOCK_REVIEWS } from "../services/mockreviews";

export function useReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with actual fetch to backend later
    const filtered = MOCK_REVIEWS.filter(r => r.productId === productId);
    setReviews(filtered);
    setLoading(false);
  }, [productId]);

  return { reviews, loading };
}
