import { useState, useEffect } from "react";
import { getProductDetails } from "../services/productService";

export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    getProductDetails(productId)
      .then((data) => setProduct(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
};
