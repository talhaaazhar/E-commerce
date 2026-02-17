// import React from "react";
// import { InputNumber, Button, Space, Typography } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import "./CartItem.css";

// const { Text } = Typography;

// function CartItem({ item, updateQuantity, removeFromCart }) {
//     const priceAfterSale = item.sale ? item.price * (1 - item.sale) : item.price;

//     return (
//         <div className="cart-item-container">
//             <img src={item.images?.[0]} alt={item.name} className="cart-item-image" />
//             <div className="cart-item-details">
//                 <h3 className="cart-item-name">{item.name}</h3>
//                 <div className="cart-item-price">
//                     <Text strong>${priceAfterSale.toFixed(2)}</Text>
//                     {item.sale > 0 && (
//                         <Text className="cart-item-original-price">
//                             ${item.price.toFixed(2)}
//                         </Text>
//                     )}
//                 </div>
//                 <div className="cart-item-actions">
//                     <InputNumber
//                         className="cart-item-quantity"
//                         min={1}
//                         value={item.quantity}
//                         onChange={(value) => updateQuantity(item.productId, value)}
//                         size="small"
//                     />
//                     <Button
//                         danger
//                         type="text"
//                         icon={<DeleteOutlined />}
//                         onClick={() => removeFromCart(item.productId)}
//                     >
//                         Remove
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CartItem;
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
