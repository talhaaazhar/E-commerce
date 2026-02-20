// src/features/profile/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getAddresses,
  addAddress,
  editAddress,
  removeAddress,
} from "./services/profileService";

// ---------- Thunks ----------
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => await getUserProfile());
export const updateProfile = createAsyncThunk("profile/updateProfile", async (payload) => await updateUserProfile(payload));
export const changeUserPassword = createAsyncThunk("profile/changePassword", async (payload) => await updatePassword(payload));

export const fetchUserAddresses = createAsyncThunk("profile/fetchAddresses", async () => await getAddresses());
export const createUserAddress = createAsyncThunk("profile/createAddress", async (payload) => await addAddress(payload));
export const updateUserAddress = createAsyncThunk("profile/updateAddress", async ({ id, payload }) => await editAddress(id, payload));
export const deleteUserAddress = createAsyncThunk("profile/deleteAddress", async (id) => await removeAddress(id));

// ---------- Slice ----------
const initialState = {
  user: null,
  addresses: [],
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.user = null;
      state.addresses = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Profile
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => { state.user = action.payload; state.status = "succeeded"; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(changeUserPassword.fulfilled, (state) => { /* optional: success msg */ })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => { state.addresses = action.payload; });

    // Addresses
    builder
      .addCase(createUserAddress.fulfilled, (state, action) => { state.addresses.push(action.payload); })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        const idx = state.addresses.findIndex(a => a.id === action.payload.id);
        if (idx >= 0) state.addresses[idx] = action.payload;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(a => a.id !== action.meta.arg);
      });
  },
});

// ---------- Selectors ----------
export const selectProfile = (state) => state.profile.user;
export const selectAddresses = (state) => state.profile.addresses;
export const selectProfileStatus = (state) => state.profile.status;

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;
