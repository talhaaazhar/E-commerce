import React from "react";

function CartItem({ item, updateQuantity, removeFromCart }) {
    const priceAfterSale = item.sale ? item.price * (1 - item.sale ) : item.price;
    
    return (

        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          ${priceAfterSale.toFixed(2)}{" "}
          {item.sale > 0 && <span className="line-through text-gray-400">${item.price}</span>}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
            className="w-16 p-1 border rounded text-center dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={() => removeFromCart(item.productId)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

}
export default CartItem;