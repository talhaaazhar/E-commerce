import React from "react";
import ProductGrid from "../components/ProductGrid";
import { MOCK_PRODUCTS } from "../services/mockProducts.jsx";
import{useLocation} from"react-router-dom";


function ProductList() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  // Filter products based on search query
  const filteredProducts = MOCK_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="space-y-6 dark:bg-gray-900 dark:text-gray-100 p-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Browse our latest collection
        </p>
      </div>

      <ProductGrid products={MOCK_PRODUCTS} />
    </section>
  );
}

export default ProductList;
