// src/features/adminOrders/components/OrderDetailsDrawer.jsx
import React from "react";
import { Drawer, List, Typography, Divider } from "antd";

const { Text, Title } = Typography;

export default function OrderDetailsDrawer({ visible, onClose, order }) {
  if (!order) return null;

  const formatAmount = (amt) => {
    const value = typeof amt === "number" ? amt : Number(amt);
    if (Number.isNaN(value)) return "$0.00";
    return `$${value.toFixed(2)}`;
  };

  return (
    <Drawer
      title={`Order #${order.id} Details`}
      placement="right"
      width={500}
      onClose={onClose}
      open={visible}
    >
      <Title level={5}>Items</Title>
      <List
        dataSource={order.items || []}
        renderItem={(item) => (
          <List.Item className="flex justify-between">
            <Text>{item.name} x {item.quantity}</Text>
            <Text>{formatAmount(item.subtotal)}</Text>
          </List.Item>
        )}
      />
      <Divider />
      <div className="flex justify-between font-bold">
        <Text>Total:</Text>
        <Text>{formatAmount(order.total_amount)}</Text>
      </div>
    </Drawer>
  );
}