import {
  createDiscount as createDiscountApi,
  updateDiscount as updateDiscountApi,
  listDiscounts as listDiscountsApi,
  assignDiscount as assignDiscountApi,
  deassignDiscount as deassignDiscountApi,
  activateDiscount as activateDiscountApi,
  deactivateDiscount as deactivateDiscountApi,
  deleteDiscount as deleteDiscountApi,
  getDiscountMappings as getDiscountMappingsApi,
} from "../../../api/adminDiscounts";

// -------------------- CREATE --------------------
export const createDiscount = async (data) => {
  const res = await createDiscountApi(data);
  return res.data;
};

// -------------------- UPDATE --------------------
export const updateDiscount = async (discountId, data) => {
  const res = await updateDiscountApi(discountId, data);
  return res.data;
};

// -------------------- LIST --------------------
export const listDiscounts = async () => {
  const res = await listDiscountsApi();
  return res.data;
};

// Backward-compatible alias
export const fetchDiscounts = listDiscounts;

// -------------------- ASSIGN --------------------
export const assignDiscount = async (data) => {
  const res = await assignDiscountApi(data);
  return res.data;
};

// -------------------- DEASSIGN --------------------
export const deassignDiscount = async (discountId, data) => {
  const res = await deassignDiscountApi(discountId, data);
  return res.data;
};

// -------------------- ACTIVATE --------------------
export const activateDiscount = async (discountId) => {
  const res = await activateDiscountApi(discountId);
  return res.data;
};

// -------------------- DEACTIVATE --------------------
export const deactivateDiscount = async (discountId) => {
  const res = await deactivateDiscountApi(discountId);
  return res.data;
};

// -------------------- DELETE --------------------
export const deleteDiscount = async (discountId) => {
  const res = await deleteDiscountApi(discountId);
  return res.data;
};

// -------------------- MAPPINGS --------------------
export const fetchDiscountMappings = async () => {
  const res = await getDiscountMappingsApi();
  return res.data;
};