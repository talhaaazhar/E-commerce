import { useEffect, useState } from "react";
import { getOrders } from "../services/ordersService";

export function useOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();

      // Supports both array payloads and wrapped payloads
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.orders)
          ? data.orders
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setOrders(normalized);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    reload: loadOrders,
  };
}
