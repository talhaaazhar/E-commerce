import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});
