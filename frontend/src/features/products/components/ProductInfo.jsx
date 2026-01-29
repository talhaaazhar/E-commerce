import React from "react";
import AddToCartButton from "./AddToCartButton";
import { useReviews } from "../hooks/useReviews";
// import {Link} from "react-router-dom";
// import { useSelector } from "react-redux";

function ProductInfo({ product }) {
  // Fetch reviews dynamically
  const { reviews, loading } = useReviews(product.id);

  // Calculate sale price if sale exists
  const hasSale = product.sale && product.sale > 0;
  const salePrice = hasSale ? (product.price * (1 - product.sale)).toFixed(2) : null;

  // Calculate average rating for display
  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

    //   const cart = useSelector((state) => state.cart.items);
    //   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <div className="w-full md:w-1/2 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {product.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {product.category}
        </p>

        {/* Price & Sale */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-semibold text-green-600">
            ${hasSale ? salePrice : product.price}
          </span>
          {hasSale && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                Save {Math.round(product.sale * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({averageRating}) {reviews.length} reviews
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Add to Cart */}
      <div className="border-t pt-6">
        <AddToCartButton product={product} />
        {/* {cartCount > 0 && (
    
    <button>
            <Link to="/cart">
              View Cart
            </Link>
    </button>
        //   <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        //     You have {cartCount} item{cartCount > 1 ? 's' : ''} in your cart.
        //   </div>
        )} */}
      </div>
    </div>
  );
}

export default ProductInfo;
