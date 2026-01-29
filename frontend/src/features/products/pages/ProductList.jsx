import React from "react";
import ProductGrid from "../components/ProductGrid";
import { MOCK_PRODUCTS } from "../services/mockProducts.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTermFromURL = queryParams.get("search")?.toLowerCase() || "";

  const [searchTerm, setSearchTerm] = useState(searchTermFromURL);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    onSale: false,
  });

  // by this we will keep term sinkw ith url
  useEffect(() => {
    setSearchTerm(searchTermFromURL);
  }, [searchTermFromURL]);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const price = product.price ?? 0;
    const rating = product.rating ?? 0;
    const sale = product.sale ?? false;

    const matchesSearch =
      name.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory = filters.category
      ? category === filters.category.toLowerCase()
      : true;
    const matchesName = filters.name
    ? product.name?.toLowerCase().includes(filters.name.toLowerCase())
    : true;
    const matchesPrice =
      (!filters.minPrice || price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || price <= Number(filters.maxPrice));
    const matchesRating =
      !filters.minRating || rating >= Number(filters.minRating);
    const matchesSale = filters.onSale ? sale : true;

    return (
      matchesSearch &&
      matchesName &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesSale
    );
  });

  //   const filteredProducts = MOCK_PRODUCTS.filter((product) =>
  //   (product.name?.toLowerCase().includes(searchTerm)) ||
  //   (product.description?.toLowerCase().includes(searchTerm))
  // );

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

      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilters
          onFilterChange={(updatedFilters) => setFilters(updatedFilters)}
        />
      </div>
      <div className="flex-1">
        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
}

export default ProductList;
