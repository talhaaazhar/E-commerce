import * as api from "../../../api/adminAnalytics";
import { message } from "antd";


const handleApiError = (error) => {
  const errorMsg =
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    "Something went wrong";

  message.error(errorMsg);
  throw error;
};

export const getSalesSummary = async () => {
  try {
    const response = await api.getSalesSummary();
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSalesOverTime = async (params) => {
  try {
    const response = await api.getSalesOverTime(params);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTopProducts = async (params) => {
  try {
    const response = await api.getTopProducts(params);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getRevenueByProduct = async (params) => {
  try {
    const response = await api.getRevenueByProduct(params);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};