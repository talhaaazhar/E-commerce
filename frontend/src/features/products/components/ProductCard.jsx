import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { name, category, price, images, description, id } = product;
  const mainImage = images && images.length > 0 ? images[0] : null;
  // if (mainImage==null){
  //   mainImage=images; // Don't render if no image is available
  // }

  return (
    <Link to={`/products/${id}`} className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition">
      
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={name}
          className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description || "High-quality product crafted with care."}
        </p>

        <div className="flex items-center justify-between pt-3">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            ${price}
          </span>

          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition">
            View Details
          </button>
        </div>
     
      </div>
    </Link>
  );
}

export default ProductCard;
