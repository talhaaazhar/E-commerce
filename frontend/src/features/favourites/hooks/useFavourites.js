import { useEffect, useState } from "react";
import {
  addToFavourites,
  removeFromFavourites,
  fetchFavourites,
} from "../services/favouritesService";
import { message } from "antd";
import { useSelector } from "react-redux";

export const useFavourites = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavourites = async () => {
    if (!isAuthenticated) {
      setFavourites([]);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchFavourites();
      setFavourites(data || []);
    } catch (err) {
      setError(err.message || "Failed to load favourites");
      setFavourites([]);
      
      if (err.response?.status !== 401) {
        message.error("Failed to load favourites");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async (productId) => {
    if (!isAuthenticated) {
      message.error("Please log in to add favourites");
      return;
    }

    try {
      const isLiked = favourites.some((like) => like.product_id === productId);

      if (isLiked) {
        await removeFromFavourites(productId);
        setFavourites((prev) =>
          prev.filter((like) => like.product_id !== productId)
        );
        message.success("Removed from favourites");
      } else {
        const newLike = await addToFavourites(productId);
        
        // Check if it's not already in the list before adding
        setFavourites((prev) => {
          const exists = prev.some(like => like.product_id === productId);
          if (exists) return prev;
          return [...prev, newLike];
        });
        
        message.success("Added to favourites");
      }
    } catch (err) {
      console.error("Failed to toggle favourite:", err);
      
      const errorMessage = err.response?.data?.detail || "Failed to update favourites";
    
      if (err.response?.status === 401) {
        message.error("Please log in to add favourites");
      } else if (err.response?.status === 404) {
        message.error("Product not found");
      } else {
        message.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    loadFavourites();
  }, [isAuthenticated]);

  return {
    favourites,
    loading,
    error,
    toggleFavourite,
    refreshFavourites: loadFavourites,
  };
};
