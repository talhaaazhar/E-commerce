import * as api from "../../../api/adminProduct";

export const fetchAllProducts = async (params) => {
  const res = await api.fetchProducts(params);
  return res.data;
};

export const addProduct = async (data) => {
  const res = await api.createProduct(data);
  return res.data;
};

export const editProduct = async (id, data) => {
  const res = await api.updateProduct(id, data);
  return res.data;
};

export const deactivate = async (id) => {
  const res = await api.deactivateProduct(id);
  return res.data;
};

export const activate = async (id) => {
  const res = await api.activateProduct(id);
  return res.data;
};

export const remove = async (id) => {
  await api.hardDeleteProduct(id);
};

export const uploadImage = async (id, file) => {
  const res = await api.uploadProductImage(id, file);
  return res.data;
};

export const removeImage = async (id, url) => {
  const res = await api.removeProductImage(id, url);
  return res.data;
};