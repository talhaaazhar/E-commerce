import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as analyticsService from "../services/adminAnalyticsService";

/**
 * Fetch sales summary
 */
export const useSalesSummary = () => {
  return useQuery({
    queryKey: ["adminAnalytics", "summary"],
    queryFn: analyticsService.getSalesSummary,
  });
};

/**
 * Fetch sales over time
 */
export const useSalesOverTime = (params) => {
  return useQuery({
    queryKey: ["adminAnalytics", "salesOverTime", params],
    queryFn: () => analyticsService.getSalesOverTime(params),
  });
};

/**
 * Fetch top products
 */
export const useTopProducts = (params) => {
  return useQuery({
    queryKey: ["adminAnalytics", "topProducts", params],
    queryFn: () => analyticsService.getTopProducts(params),
  });
};

/**
 * Fetch revenue by product
 */
export const useRevenueByProduct = (params) => {
  return useQuery({
    queryKey: ["adminAnalytics", "revenueByProduct", params],
    queryFn: () => analyticsService.getRevenueByProduct(params),
    enabled: !!params,
  });
};

/**
 * Manage revenue by product filters
 */
export const useRevenueProductFilters = () => {
  const [filters, setFilters] = useState({
    productName: "",
    productId: null,
    category: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return {
    filters,
    handleFilterChange,
    setFilters,
  };
};