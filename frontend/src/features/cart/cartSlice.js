import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
} from "./services/cartService";

/* ------------------ THUNKS ------------------ */

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    return await getCart();
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    return await addItemToCart(productId, quantity);
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }) => {
    return await updateCartItem(productId, quantity);
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    return await removeItemFromCart(productId);
  }
);

/* ------------------ SLICE ------------------ */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalItems = action.payload.total_items;
        state.totalPrice = action.payload.total_price;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.total_items;
        state.totalPrice = action.payload.total_price;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.total_items;
        state.totalPrice = action.payload.total_price;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.total_items;
        state.totalPrice = action.payload.total_price;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCartState } = cartSlice.actions;

/* ------------------ SELECTORS ------------------ */

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalPrice;
export const selectCartCount = (state) => state.cart.totalItems;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;


