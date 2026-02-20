// import React from "react";
// import { Card, Button, Divider, Typography, Space } from "antd";
// import { ShoppingCartOutlined, LockOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import "./CartSummary.css";

// const { Title, Text } = Typography;

// function CartSummary({ totalPrice = 0 }) {
//   const navigate = useNavigate();
//   const safeTotal = Number(totalPrice || 0);

//   return (
//     <Card
//       className="cart-summary"
//       title={
//         <Space size="small">
//           <ShoppingCartOutlined />
//           <span>Cart Summary</span>
//         </Space>
//       }
//     >
//       <Space direction="vertical" size="large" style={{ width: "100%" }}>
//         <Divider className="cart-summary-divider" />

//         <div className="cart-summary-container">
//           <Text strong>Total Price</Text>
//           <Title level={4} className="cart-summary-total">
//             ${safeTotal.toFixed(2)}
//           </Title>
//         </div>

//         <Button
//           type="primary"
//           block
//           size="large"
//           icon={<LockOutlined />}
//           className="btn-checkout"
//           disabled={safeTotal === 0}
//           onClick={() => alert("Checkout functionality coming soon!")}
//         >
//           Proceed to Checkout
//         </Button>

//         <Button
//           type="default"
//           block
//           size="large"
//           onClick={() => navigate("/products")}
//         >
//           Continue Shopping
//         </Button>
//       </Space>
//     </Card>
//   );
// }

// export default CartSummary;

import React from "react";
import { Card, Button, Divider, Typography, Space } from "antd";
import { ShoppingCartOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./CartSummary.css";

const { Title, Text } = Typography;

function CartSummary({ totalPrice }) {
  const navigate = useNavigate();
  const safeTotal = Number(totalPrice || 0);

  return (
    <Card
      className="cart-summary"
      title={
        <Space size="small">
          <ShoppingCartOutlined />
          <span>Cart Summary</span>
        </Space>
      }
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Divider />

        <div className="cart-summary-container">
          <Text strong>Total Price</Text>
          <Title level={4}>
            ₹{safeTotal.toFixed(2)}
          </Title>
        </div>

        <Button
          type="primary"
          block
          size="large"
          icon={<LockOutlined />}
          disabled={safeTotal === 0}
          onClick={() => alert("Checkout coming soon")}
        >
          Proceed to Checkout
        </Button>

        <Button
          block
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Space>
    </Card>
  );
}

export default CartSummary;
