import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProducts(filters)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]); // re-fetch on filter changes

  return { products, loading, error };
};
