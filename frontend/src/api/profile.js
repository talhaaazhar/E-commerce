import { apiClient } from "./client";

// ---------- User Profile ----------
export const fetchUserProfileApi = () =>
  apiClient.get("/user/profile").then((res) => res.data);

export const updateUserProfileApi = (payload) =>
  apiClient.put("/user/profile", payload).then((res) => res.data);

export const changePasswordApi = (payload) =>
  apiClient.put("/user/profile/password", payload).then((res) => res.data);

// ---------- Addresses ----------
export const fetchAddressesApi = () =>
  apiClient.get("/user/profile/addresses").then((res) => res.data);

export const createAddressApi = (payload) =>
  apiClient.post("/user/profile/addresses", payload).then((res) => res.data);

export const updateAddressApi = (id, payload) =>
  apiClient.put(`/user/profile/addresses/${id}`, payload).then((res) => res.data);

export const deleteAddressApi = (id) =>
  apiClient.delete(`/user/profile/addresses/${id}`).then((res) => res.data);
