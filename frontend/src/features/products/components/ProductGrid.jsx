// import React from "react";
// import ProductCard from "./ProductCard";

// function ProductGrid({ products }) {

//     if (!products || products.length === 0) {
//         return (
//         <p className="text-center text-gray-600 dark:text-gray-400">
//             No products available.
//         </p>
//         );
//     }

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xlg:grid-cols-5 gap-6">

//             {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//             ))}
//         </div>
//     );
// }

// export default ProductGrid;

import React from "react";
import { Row, Col, Empty } from "antd";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

  if (!products || products.length === 0) {
    return (
      <div className="py-12">
        <Empty
          description="No products available"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {products.map((product) => (
        <Col
          key={product.id}
          xs={24}   // 1 column on mobile
          sm={12}   // 2 columns on small screens
          md={8}    // 3 columns on medium screens
          lg={6}    // 4 columns on large screens
          xl={4}    // 5 columns on extra-large screens
        >
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductGrid;
