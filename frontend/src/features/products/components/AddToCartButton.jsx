// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../cart/cartSlice";
// import { toast } from "react-toastify";

// function AddToCartButton({ product }) {
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addToCart({ product, quantity }));
//     toast.success(`${product.name} added to cart!`, {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-4">
//         <label className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</label>
//         <div className="flex items-center border rounded-lg dark:bg-gray-700">
//           <button
//             onClick={() => setQuantity(Math.max(1, quantity - 1))}
//             className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
//           >
//             -
//           </button>
//           <input
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
//             className="w-16 text-center border-0 focus:ring-0 dark:bg-gray-700 dark:text-gray-100"
//           />
//           <button
//             onClick={() => setQuantity(quantity + 1)}
//             className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <button
//           onClick={handleAddToCart}
//           className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3"
//             />
//           </svg>
//           Add to Cart
//         </button>
//         <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//           <svg
//             className="w-5 h-5 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//             />
//           </svg>
//         </button>
//       </div>

//       <div className="text-sm text-gray-600 dark:text-gray-400">
//         <p>✓ Free shipping on orders over $50</p>
//         <p>✓ 30-day return policy</p>
//       </div>
//     </div>
//   );
// }

// export default AddToCartButton;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice";
import { toast } from "react-toastify";
import { Button, InputNumber, Space, Typography, Divider } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
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
        <Button icon={<HeartOutlined />} className="flex-none" />
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

