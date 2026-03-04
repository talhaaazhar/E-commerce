import React, { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import { useReviews } from "../hooks/useReviews";
import { Tag, Tooltip, Rate, Button, Typography, Divider, Space } from "antd";
import { getSalePrice, getDiscountPercent } from "../services/priceService";
import { getAverageRating } from "../services/reviewService";

const { Title, Paragraph, Text } = Typography;

function ProductInfo({ product }) {
  if (!product) {
    return <div className="text-red-500">Product data not available</div>;
  }

  const { reviews } = useReviews(product.id);

  const salePrice = getSalePrice(product);
  const discountPercent = getDiscountPercent(product);
  const hasSale = Boolean(product?.hasDiscount && salePrice !== null);
  const averageRating = getAverageRating(reviews);

  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-6">
      {/* Product Header */}
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={1} className="mb-2">{product.name}</Title>

          {/* Category as Tag */}
          <Tag color="blue" className="capitalize mb-4 inline-block">
            {product.category}
          </Tag>

          {/* Price & Sale */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Text className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${hasSale ? Number(salePrice).toFixed(2) : Number(product.price).toFixed(2)}
            </Text>
            {hasSale && (
              <>
                <Text delete className="text-gray-400">
                  ${Number(product.price).toFixed(2)}
                </Text>
                <Tag color="red">
                  {discountPercent > 0 ? `Save ${discountPercent}%` : "On Sale"}
                </Tag>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <Rate value={Math.round(averageRating)} disabled className="text-base" />
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
          {showFullDesc ? product.description : `${product.description?.slice(0, 200) || "No description"}...`}
        </Paragraph>
        {product.description && product.description.length > 200 && (
          <Button type="link" onClick={() => setShowFullDesc(!showFullDesc)} className="p-0">
            {showFullDesc ? "Show Less" : "Read More"}
          </Button>
        )}
      </div>

      <Divider />

      <AddToCartButton product={product} />
    </div>
  );
}

export default ProductInfo;
