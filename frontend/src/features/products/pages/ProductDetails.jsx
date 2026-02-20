// import React from "react";
// import ProductImageGallery from "../components/ProductImageGallery";
// import ProductInfo from "../components/ProductInfo";
// import { useParams, Link } from "react-router-dom";
// import { MOCK_PRODUCTS } from "../services/mockProducts";
// import { useReviews } from "../hooks/useReviews";
// import ProductCard from "../components/ProductCard";
// import { Breadcrumb, Tabs, Card, Empty, Spin, Rate, Space, Typography, Divider } from "antd";
// import { HomeOutlined } from "@ant-design/icons";

// const { Title, Paragraph, Text } = Typography;

// function ProductDetails() {
//   const { id } = useParams();
//   const product = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
//   const { reviews, loading } = useReviews(parseInt(id));

//   if (!product) {
//     return (
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <Empty
//           description="Product Not Found"
//           style={{ marginTop: 48, marginBottom: 48 }}
//         />
//       </main>
//     );
//   }

//   // Mock related products (excluding current product)
//   // i   will update thes logic later 
//   const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

//   const breadcrumbItems = [
//     {
//       title: <Link to="/"><HomeOutlined /></Link>,
//     },
//     {
//       title: <Link to="/products">{product.category}</Link>,
//     },
//     {
//       title: product.name,
//     },
//   ];

//   const detailsItems = [
//     {
//       key: "specifications",
//       label: "Specifications",
//       children: (
//         <div className="space-y-3">
//           <div className="flex justify-between border-b pb-2">
//             <Text strong>Category:</Text>
//             <Text>{product.category}</Text>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <Text strong>Material:</Text>
//             <Text>Premium quality materials</Text>
//           </div>
//           <div className="flex justify-between pb-2">
//             <Text strong>Dimensions:</Text>
//             <Text>Standard size</Text>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "features",
//       label: "Features",
//       children: (
//         <ul className="space-y-2 list-disc list-inside">
//           <li>High-quality</li>
//           <li>Modern design</li>
//           <li>Easy to maintain</li>
//           <li>Eco-friendly materials</li>
//         </ul>
//       ),
//     },
//   ];

//   return (
//     <main className="flex-grow bg-gray-50 dark:bg-gray-900">
//       {/* Breadcrumb */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
//         <div className="container mx-auto px-4">
//           <Breadcrumb items={breadcrumbItems} />
//         </div>
//       </div>

//       {/* Main Product Section */}
//       <div className="container mx-auto px-4 py-8">
//         <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
//           <div className="flex flex-col lg:flex-row gap-8">
//             <ProductImageGallery images={product.images} />
//             <ProductInfo product={product} />
//           </div>
//         </Card>

//         {/* Product Details Tabs */}
//         <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
//           <Title level={2}>Product Details</Title>
//           <Tabs items={detailsItems} />
//         </Card>

//         {/* Customer Reviews */}
//         <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
//           <Title level={2}>Customer Reviews</Title>
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <Spin />
//             </div>
//           ) : reviews.length === 0 ? (
//             <Empty
//               description="No Reviews Yet"
//               style={{ marginTop: 24, marginBottom: 24 }}
//             />
//           ) : (
//             <Space direction="vertical" style={{ width: "100%" }} size="large">
//               {reviews.map((review) => (
//                 <Card
//                   key={review.id}
//                   className="dark:bg-gray-700 dark:border-gray-600"
//                   size="small"
//                 >
//                   <Space direction="vertical" style={{ width: "100%" }}>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Rate
//                           value={review.rating}
//                           disabled
//                           className="text-sm"
//                         />
//                         <Text strong>{review.user}</Text>
//                       </div>
//                       <Text type="secondary" className="text-sm">
//                         {new Date(review.date).toLocaleDateString()}
//                       </Text>
//                     </div>
//                     <Paragraph className="m-0">
//                       {review.comment}
//                     </Paragraph>
//                   </Space>
//                 </Card>
//               ))}
//             </Space>
//           )}
//         </Card>

//         {/* Related Products */}
//         <Card className="dark:bg-gray-800 dark:border-gray-700">
//           <Title level={2} className="mb-6">Related Products</Title>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((relatedProduct) => (
//               <ProductCard key={relatedProduct.id} product={relatedProduct} />
//             ))}
//           </div>
//         </Card>
//       </div>
//     </main>
//   );
// }

// export default ProductDetails;

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductCard from "../components/ProductCard";
import { Breadcrumb, Tabs, Card, Empty, Spin, Rate, Space, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(parseInt(id));

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );

  if (error || !product)
    return (
      <main className="flex-grow container mx-auto px-4 py-12">
        <Empty description="Product Not Found" style={{ marginTop: 48, marginBottom: 48 }} />
      </main>
    );

  // Mock related products for now (can replace with API later)
  const relatedProducts = product.related_products || [];

  const breadcrumbItems = [
    { title: <Link to="/"><HomeOutlined /></Link> },
    { title: <Link to="/products">{product.category}</Link> },
    { title: product.name },
  ];

  const detailsItems = [
    {
      key: "specifications",
      label: "Specifications",
      children: (
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <Text strong>Category:</Text>
            <Text>{product.category}</Text>
          </div>
          <div className="flex justify-between border-b pb-2">
            <Text strong>Material:</Text>
            <Text>Premium quality materials</Text>
          </div>
          <div className="flex justify-between pb-2">
            <Text strong>Dimensions:</Text>
            <Text>Standard size</Text>
          </div>
        </div>
      ),
    },
    {
      key: "features",
      label: "Features",
      children: (
        <ul className="space-y-2 list-disc list-inside">
          <li>High-quality</li>
          <li>Modern design</li>
          <li>Easy to maintain</li>
          <li>Eco-friendly materials</li>
        </ul>
      ),
    },
  ];

  return (
    <main className="flex-grow bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-8">
            <ProductImageGallery images={product.images} />
            <ProductInfo product={product} />
          </div>
        </Card>

        {/* Product Details Tabs */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <Title level={2}>Product Details</Title>
          <Tabs items={detailsItems} />
        </Card>

        {/* Customer Reviews */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <Title level={2}>Customer Reviews</Title>
          {product.reviews.length === 0 ? (
            <Empty description="No Reviews Yet" style={{ marginTop: 24, marginBottom: 24 }} />
          ) : (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              {product.reviews.map((review) => (
                <Card key={review.id} className="dark:bg-gray-700 dark:border-gray-600" size="small">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Rate value={review.rating} disabled className="text-sm" />
                        <Text strong>{review.user_name}</Text>
                      </div>
                      <Text type="secondary" className="text-sm">
                        {new Date(review.created_at).toLocaleDateString()}
                      </Text>
                    </div>
                    <Paragraph className="m-0">{review.review}</Paragraph>
                  </Space>
                </Card>
              ))}
            </Space>
          )}
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <Title level={2} className="mb-6">Related Products</Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}

export default ProductDetails;

