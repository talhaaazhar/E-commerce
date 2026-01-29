import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

    if (!products || products.length === 0) {
        return (
        <p className="text-center text-gray-600 dark:text-gray-400">
            No products available.
        </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xlg:grid-cols-5 gap-6">

            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductGrid;
