import React from "react";
import { Tag } from "antd";

const statusColors = {
  pending: "orange",
  paid: "blue",
  shipped: "cyan",
  completed: "green",
  cancelled: "red",
};

export default function OrderStatusTag({ status }) {
  return <Tag color={statusColors[status] || "default"}>{status.toUpperCase()}</Tag>;
}