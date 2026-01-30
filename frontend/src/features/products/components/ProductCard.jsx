import React from "react";
import { Link } from "react-router-dom";
import { Badge, Tag, Button } from "antd";
import { ShoppingOutlined, HeartOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    id,
    name,
    category,
    price,
    images,
    description,
    sale = false,
    tags = [{ label: "New", color: "green" }], 
    rating = 0,
  } = product;

  const mainImage =
    images && images.length > 0
      ? images[0]
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <Badge.Ribbon text={sale ? "SALE" : ""} color="red" style={{ display: sale ? "block" : "none" }}>
      <div className="product-card">
        {/* Image Section */}
        <div className="product-image relative">
          <img src={mainImage} alt={name} className="w-full h-48 object-cover rounded-t-xl" />
          {/* Category Tag */}
          <Tag className="category-tag">{category}</Tag>
          {/* Extra Tags */}
          <div className="extra-tags">
            {tags.map((tag, idx) => (
              <Tag key={idx} color={tag.color || "blue"}>
                {tag.label}
              </Tag>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="product-content p-4 flex flex-col justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description || "High-quality product crafted with care."}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${price}</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) =>
                i < rating ? (
                  <StarFilled key={i} style={{ color: "#f5b50a" }} />
                ) : (
                  <StarOutlined key={i} style={{ color: "#ccc" }} />
                )
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/products/${id}`} className="flex-1">
              <Button className="btn-black w-full flex justify-center items-center gap-2">
                <ShoppingOutlined /> View
              </Button>
            </Link>
            <Button className="btn-outline w-12 flex justify-center items-center">
              <HeartOutlined />
            </Button>
          </div>
        </div>
      </div>
    </Badge.Ribbon>
  );
}

export default ProductCard;


