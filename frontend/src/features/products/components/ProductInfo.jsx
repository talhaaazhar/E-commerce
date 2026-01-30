import React, { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import { useReviews } from "../hooks/useReviews";
import { Tag, Tooltip, Rate, Button, Typography, Divider, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

function ProductInfo({ product }) {
  const { reviews } = useReviews(product.id);

  const hasSale = product.sale && product.sale > 0;
  const salePrice = hasSale ? (product.price * (1 - product.sale)).toFixed(2) : null;
  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)
    : 0;

  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-6">
      {/* Product Header */}
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={1} className="mb-2">
            {product.name}
          </Title>

          {/* Category as Tag */}
          <Tag color="blue" className="capitalize mb-4 inline-block">
            {product.category}
          </Tag>

          {/* Price & Sale */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Text className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${hasSale ? salePrice : product.price.toFixed(2)}
            </Text>
            {hasSale && (
              <>
                <Text delete className="text-gray-400">
                  ${product.price.toFixed(2)}
                </Text>
                <Tag color="red">
                  Save {Math.round(product.sale * 100)}%
                </Tag>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <Rate 
              value={Math.round(averageRating)} 
              disabled 
              className="text-base"
            />
            <Tooltip title={`${reviews.length} reviews`}>
              <Text type="secondary" className="text-sm">
                {averageRating.toFixed(1)} ({reviews.length})
              </Text>
            </Tooltip>
          </div>
        </div>
      </Space>

      <Divider />

      {/* Description */}
      <div>
        <Title level={3}>Description</Title>
        <Paragraph className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {showFullDesc ? product.description : `${product.description.slice(0, 200)}...`}
        </Paragraph>
        {product.description.length > 200 && (
          <Button 
            type="link" 
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="p-0"
          >
            {showFullDesc ? "Show Less" : "Read More"}
          </Button>
        )}
      </div>

      <Divider />

      {/* Add To Cart */}
      <AddToCartButton product={product} />
    </div>
  );
}

export default ProductInfo;
