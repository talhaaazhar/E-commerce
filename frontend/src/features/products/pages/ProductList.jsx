import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters.jsx";
import { useProducts } from "../hooks/useProducts";
import { Spin, Empty, Typography } from "antd";

const { Text } = Typography;

function ProductList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTermFromURL = queryParams.get("search") || "";

  const [filters, setFilters] = useState({
    search: searchTermFromURL,
    category: "",
    min_price: "",
    max_price: "",
    min_rating: "",
    on_sale: false,
    skip: 0,
    limit: 20,
  });

  const { products, loading, error } = useProducts(filters);

  // Keep search term synced with URL
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchTermFromURL }));
  }, [searchTermFromURL]);

  return (
    <section className="space-y-6 dark:bg-gray-900 dark:text-gray-100 p-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Browse our latest collection
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilters
          onFilterChange={(updatedFilters) =>
            setFilters({ ...filters, ...updatedFilters, skip: 0 })
          }
        />
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-12">{error.message}</div>
        ) : products.length === 0 ? (
          <Empty
            description="No products found"
            style={{ marginTop: 48, marginBottom: 48 }}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
}

export default ProductList;
