import React from "react";
import { Button, Space, Popconfirm, message } from "antd";
import { useUpdateOrderStatus } from "../hooks/useAdminOrders";

export default function OrderActions({ orderId, currentStatus }) {
  const updateStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status: newStatus });
      message.success(`Order status updated to ${newStatus}`);
    } catch {
      message.error("Failed to update status");
    }
  };

  const possibleStatuses = ["pending", "paid", "shipped", "completed", "cancelled"].filter(
    (s) => s !== currentStatus
  );

  return (
    <Space wrap>
      {possibleStatuses.map((status) => (
        <Popconfirm
          key={status}
          title={`Change status to ${status}?`}
          onConfirm={() => handleStatusChange(status)}
        >
          <Button size="small">{status}</Button>
        </Popconfirm>
      ))}
    </Space>
  );
}