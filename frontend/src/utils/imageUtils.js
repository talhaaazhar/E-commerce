/**
 * Constructs full image URL from backend path
 * Backend serves images from /media endpoint
 * Image paths in DB are like: "/media/products/1/abc123.jpg"
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://via.placeholder.com/300x200?text=No+Image";
  }

  // If already a full URL (http/https), return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it's a relative path from backend (starts with /media)
  if (imagePath.startsWith("/media")) {
    return `${API_BASE_URL}${imagePath}`;
  }

  // If it's just the filename or relative path, prepend API base
  return `${API_BASE_URL}/media/products/${imagePath}`;
};

export const getProductImages = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return ["https://via.placeholder.com/300x200?text=No+Image"];
  }

  return images.map((img) => getImageUrl(img));
};

export const getFallbackImage = () => {
  return "https://via.placeholder.com/300x200?text=No+Image";
};
