import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || []
};

const saveCart = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.product;
      const quantity = action.payload.quantity || 1;
      const existing = state.items.find((item) => item.productId === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, productId: product.id, quantity });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(i => i.productId === productId);
      if (item) item.quantity = quantity;
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCart = state => state.cart.items;

export const selectCartCount = state => state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = state => state.cart.items.reduce((total, item) => {
  const priceAfterSale = item.sale ? item.price * (1 - item.sale) : item.price;
  return total + priceAfterSale * item.quantity;
}, 0);

export default cartSlice.reducer;
