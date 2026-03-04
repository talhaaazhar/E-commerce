// src/api/adminDiscounts.js
import { apiClient } from "./client";

// -------------------- CREATE --------------------
export const createDiscount = (data) => {
  return apiClient.post("/admin/discounts/", data);
};

// -------------------- UPDATE --------------------
export const updateDiscount = (discountId, data) => {
  return apiClient.patch(`/admin/discounts/${discountId}`, data);
};

// -------------------- LIST --------------------
export const listDiscounts = () => {
  return apiClient.get("/admin/discounts/");
};

// -------------------- ASSIGN --------------------
export const assignDiscount = (data) => {
  return apiClient.post("/admin/discounts/assign", data);
};

// -------------------- DEASSIGN --------------------
export const deassignDiscount = (discountId, data) => {
  return apiClient.post(`/admin/discounts/${discountId}/deassign`, data);
};

// -------------------- ACTIVATE --------------------
export const activateDiscount = (discountId) => {
  return apiClient.patch(`/admin/discounts/${discountId}/activate`);
};

// -------------------- DEACTIVATE --------------------
export const deactivateDiscount = (discountId) => {
  return apiClient.patch(`/admin/discounts/${discountId}/deactivate`);
};

// -------------------- DELETE --------------------
export const deleteDiscount = (discountId) => {
  return apiClient.delete(`/admin/discounts/${discountId}`);
};

// -------------------- MAPPINGS --------------------
export const getDiscountMappings = () => {
  return apiClient.get("/admin/discounts/mappings");
};