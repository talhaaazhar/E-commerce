import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import {
  listDiscounts as listDiscountsService,
  createDiscount as createDiscountService,
  updateDiscount as updateDiscountService,
  assignDiscount as assignDiscountService,
  deassignDiscount as deassignDiscountService,
  deactivateDiscount as deactivateDiscountService,
  activateDiscount as activateDiscountService,
  deleteDiscount as deleteDiscountService,
} from "../services/adminDiscountService";

export const useDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- Fetch Discounts ----------
  const fetchDiscounts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listDiscountsService();
      setDiscounts(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- Create Discount ----------
  const createDiscount = async (discountData) => {
    try {
      const newDiscount = await createDiscountService(discountData);
      setDiscounts((prev) => [newDiscount, ...prev]);
      message.success("Discount created successfully");
      return newDiscount;
    } catch (err) {
      console.error(err);
      message.error("Failed to create discount");
      throw err;
    }
  };

  // ---------- Update Discount ----------
  const updateDiscount = async (id, data) => {
    try {
      const updated = await updateDiscountService(id, data);
      setDiscounts((prev) =>
        prev.map((d) => (d.id === id ? updated : d))
      );
      message.success("Discount updated successfully");
      return updated;
    } catch (err) {
      console.error(err);
      message.error("Failed to update discount");
      throw err;
    }
  };

  // ---------- Assign Discount ----------
  const assignDiscount = async (assignData) => {
    try {
      const res = await assignDiscountService(assignData);
      message.success(res.message || "Discount assigned successfully");
      return res;
    } catch (err) {
      console.error(err);
      message.error("Failed to assign discount");
      throw err;
    }
  };

  // ---------- Deassign Discount ----------
  const deassignDiscount = async (id, deassignData) => {
    try {
      const res = await deassignDiscountService(id, deassignData);
      await fetchDiscounts();
      message.success(res.message || "Discount deassigned successfully");
      return res;
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.detail || "Failed to deassign discount");
      throw err;
    }
  };

  // ---------- Activate / Deactivate ----------
  const deactivateDiscount = async (id) => {
    try {
      const res = await deactivateDiscountService(id);
      setDiscounts((prev) =>
        prev.map((d) => (d.id === id ? { ...d, is_active: false } : d))
      );
      message.success(res.message);
      return res;
    } catch (err) {
      console.error(err);
      message.error("Failed to deactivate discount");
      throw err;
    }
  };

  const activateDiscount = async (id) => {
    try {
      const res = await activateDiscountService(id);
      setDiscounts((prev) =>
        prev.map((d) => (d.id === id ? { ...d, is_active: true } : d))
      );
      message.success(res.message);
      return res;
    } catch (err) {
      console.error(err);
      message.error("Failed to activate discount");
      throw err;
    }
  };

  // ---------- Delete Discount ----------
  const deleteDiscount = async (id) => {
    try {
      const res = await deleteDiscountService(id);
      setDiscounts((prev) => prev.filter((d) => d.id !== id));
      message.success(res.message || "Discount deleted successfully");
      return res;
    } catch (err) {
      console.error(err);
      message.error("Failed to delete discount");
      throw err;
    }
  };

  // ---------- Initial Fetch ----------
  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  return {
    discounts,
    loading,
    fetchDiscounts,
    createDiscount,
    updateDiscount,
    assignDiscount,
    deassignDiscount,
    deactivateDiscount,
    activateDiscount,
    deleteDiscount,
  };
};