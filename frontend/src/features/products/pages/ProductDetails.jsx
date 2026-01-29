import React from "react";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import { useParams } from "react-router-dom";
import { MOCK_PRODUCTS } from "../services/mockProducts";
import { useReviews } from "../hooks/useReviews";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
  const {reviews, loading } = useReviews(parseInt(id));

  if (!product) {
    return (
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  // Mock related products (excluding current product)
  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="flex-grow">
      {/* Breadcrumb */}
      <div className="bg-gray-100 dark:bg-gray-800 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600 dark:text-gray-400">
            <span>Home</span> / <span>{product.category}</span> /{" "}
            <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <ProductImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* Product Details Tabs */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
                <li>
                  <strong>Material:</strong> Premium quality materials
                </li>
                <li>
                  <strong>Dimensions:</strong> Standard size
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• High-quality</li>
                <li>• Modern design</li>
                <li>• Easy to maintain</li>
                <li>• Eco-friendly materials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          {loading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-medium">{review.user}</span>
                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
