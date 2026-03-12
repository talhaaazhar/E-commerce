import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as service from "../services/adminOrderService";

/**
 * Fetch all orders
 */
export const useFetchOrders = (params) => {
  return useQuery({
    queryKey: ["adminOrders", params],
    queryFn: () => service.fetchOrders(params),
    keepPreviousData: true,
  });
};

/**
 * Fetch pending orders
 */
export const useFetchPendingOrders = () => {
  return useQuery({
    queryKey: ["adminPendingOrders"],
    queryFn: service.fetchPendingOrders,
  });
};

/**
 * Update order status
 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) =>
      service.changeOrderStatus(orderId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      queryClient.invalidateQueries({ queryKey: ["adminPendingOrders"] });
    },
  });
};