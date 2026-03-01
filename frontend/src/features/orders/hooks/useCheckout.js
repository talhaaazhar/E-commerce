import { useState } from "react";
import { checkoutOrder } from "../services/ordersService";
import { message } from "antd";

export function useCheckout() {
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);

    try {
      const order = await checkoutOrder();

      message.success("Order placed successfully");

      return order;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    checkout,
    loading,
  };
}
