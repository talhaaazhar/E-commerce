import React from "react";
import { InputNumber, Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const hasDiscount =
    item.discount_percent !== null &&
    item.discount_percent !== undefined &&
    item.discount_percent > 0;

  return (
    <div className="cart-item-container">
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>

        <div className="cart-item-price">
          <Text strong>
            ₹{Number(item.final_price).toFixed(2)}
          </Text>

          {hasDiscount && (
            <>
              <Text delete type="secondary">
                ₹{Number(item.original_price).toFixed(2)}
              </Text>
              <Text type="success">
                ({item.discount_percent}% OFF)
              </Text>
            </>
          )}
        </div>

        <div className="cart-item-actions">
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) =>
              onUpdateQuantity(item.product_id, value)
            }
            size="small"
          />

          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onRemove(item.product_id)}
          >
            Remove
          </Button>
        </div>

        <Text type="secondary">
          Subtotal: ₹{Number(item.subtotal).toFixed(2)}
        </Text>
      </div>
    </div>
  );
}

export default CartItem;
