import React from "react";

function CartSummary({  totalPrice }){

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl mb-4">Cart Summary</h2>
             
            <p className="text-lg font-semibold">
                Total: ${totalPrice.toFixed(2)}
            </p>

            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                Checkout
            </button>
        
        </div>
    );
}
export default CartSummary;