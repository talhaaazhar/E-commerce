import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice";
import { toast } from "react-toastify";
import { Button, InputNumber, Space, Typography, Divider } from "antd";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useFavourites } from "../../favourites/hooks/useFavourites";

const { Text, Paragraph } = Typography;

function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { favourites, toggleFavourite } = useFavourites();
  
  const isLiked = favourites.some((like) => like.product_id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }))
      .then(() => {
        toast.success(`${product.name} added to cart!`, {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.error(error?.payload?.detail || "Failed to add item to cart", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  const handleToggleFavourite = () => {
    toggleFavourite(product.id);
  };

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {/* Quantity Selector */}
      <Space align="center">
        <Text strong>Quantity:</Text>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value)}
          className="w-24"
        />
      </Space>

      {/* Action Buttons */}
      <Space className="w-full" size="middle">
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          className="flex-1"
        >
          Add to Cart
        </Button>
        <Button 
          icon={isLiked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />} 
          onClick={handleToggleFavourite}
          className="flex-none"
        />
      </Space>

      {/* Info / Policies */}
      <Divider className="my-0" />
      <Space direction="vertical" size={0}>
        <Paragraph className="text-gray-600 dark:text-gray-400 mb-0">
          ✓ Free shipping on orders over $50
        </Paragraph>
        <Paragraph className="text-gray-600 dark:text-gray-400 mb-0">
          ✓ 30-day return policy
        </Paragraph>
      </Space>
    </Space>
  );
}

export default AddToCartButton;

