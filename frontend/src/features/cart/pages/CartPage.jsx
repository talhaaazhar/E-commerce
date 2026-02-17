// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import CartItem from "../components/CartItem";
// import CartSummary from "../components/CartSummary";
// import { selectCart, updateQuantity, removeFromCart, selectCartTotal } from "../cartSlice";

// function CartPage() {
//   const cart = useSelector(selectCart);
//   const total = useSelector(selectCartTotal);
//   const dispatch = useDispatch();

//   if (cart.length === 0) {
//     return (
//       <main className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
//           Your Cart is Empty
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">Add some products to get started!</p>
//       </main>
//     );
//   }

//   return (
//     <main className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
//       <div className="grid md:grid-cols-3 gap-6 dark:bg-gray-900">
//         <div className="md:col-span-2 space-y-4">
//           {cart.map((item) => (
//             <CartItem
//               key={item.productId}
//               item={item}
//               updateQuantity={(id, qty) => dispatch(updateQuantity({ productId: id, quantity: qty }))}
//               removeFromCart={(id) => dispatch(removeFromCart(id))}
//             />
//           ))}
//         </div>
//         <CartSummary totalPrice={total} />
//       </div>
//     </main>
//   );
// }

// export default CartPage;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import {
  fetchCart,
  updateQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  selectCartStatus,
} from "../cartSlice";
import { Spin, Empty } from "antd";

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const status = useSelector(selectCartStatus);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <main className="container mx-auto px-4 py-12">
        <Empty description="Your cart is empty" />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.product_id}
              item={item}
              onUpdateQuantity={(id, qty) =>
                dispatch(updateQuantity({ productId: id, quantity: qty }))
              }
              onRemove={(id) =>
                dispatch(removeFromCart(id))
              }
            />
          ))}
        </div>

        <CartSummary totalPrice={total} />
      </div>
    </main>
  );
}

export default CartPage;
