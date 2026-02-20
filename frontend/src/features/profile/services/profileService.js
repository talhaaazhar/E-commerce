import {
  fetchUserProfileApi,
  updateUserProfileApi,
  changePasswordApi,
  fetchAddressesApi,
  createAddressApi,
  updateAddressApi,
  deleteAddressApi,
} from "../../../api/profile";

// ---------- User ----------
export const getUserProfile = async () => await fetchUserProfileApi();
export const updateUserProfile = async (payload) => await updateUserProfileApi(payload);
export const updatePassword = async (payload) => await changePasswordApi(payload);

// ---------- Addresses ----------
export const getAddresses = async () => await fetchAddressesApi();
export const addAddress = async (payload) => await createAddressApi(payload);
export const editAddress = async (id, payload) => await updateAddressApi(id, payload);
export const removeAddress = async (id) => await deleteAddressApi(id);
