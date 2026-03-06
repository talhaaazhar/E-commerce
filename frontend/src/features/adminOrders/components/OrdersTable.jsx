// src/features/adminOrders/components/OrdersTable.jsx
import React, { useState } from "react";
import { Table, Button, Space, Select, message, Modal } from "antd";
import { EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import OrderStatusTag from "./OrderStatusTag";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import { useUpdateOrderStatus } from "../hooks/useAdminOrders";

export default function OrdersTable({ orders, isLoading }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const updateStatusMutation = useUpdateOrderStatus();

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "shipped", label: "Shipped" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const formatAmount = (amt) => {
    const value = typeof amt === "number" ? amt : Number(amt);
    if (Number.isNaN(value)) return "$0.00";
    return `$${value.toFixed(2)}`;
  };

  const showDetails = (order) => {
    setSelectedOrder(order);
    setDrawerVisible(true);
  };

  const handleStatusChange = (record, nextStatus) => {
    if (record.status === nextStatus) return;

    Modal.confirm({
      title: "Change order status?",
      icon: <ExclamationCircleOutlined style={{ color: "#1677ff" }} />,
      content: `Order #${record.id}: ${record.status} → ${nextStatus}`,
      okText: "Update",
      cancelText: "Cancel",
      okButtonProps: { type: "primary" },
      centered: true,
      async onOk() {
        try {
          await updateStatusMutation.mutateAsync({
            orderId: record.id,
            status: nextStatus,
          });
          message.success(`Order #${record.id} marked as ${nextStatus}`);
        } catch {
          message.error("Failed to update order status");
        }
      },
    });
  };

  const columns = [
    { title: "Order ID", dataIndex: "id", width: 80 },
    { title: "User ID", dataIndex: "user_id", width: 80 },
    { title: "Total Amount", dataIndex: "total_amount", render: (amt) => formatAmount(amt) },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <div className="flex items-center gap-2">
          <OrderStatusTag status={status} />
          <Select
            size="small"
            value={status}
            options={statusOptions}
            onChange={(value) => handleStatusChange(record, value)}
            className="min-w-[130px]"
            variant="outlined"
            disabled={updateStatusMutation.isPending}
          />
        </div>
      ),
    },
    { title: "Created At", dataIndex: "created_at", render: (date) => new Date(date).toLocaleString() },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Button icon={<EyeOutlined />} size="small" onClick={() => showDetails(record)}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={orders || []}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />

      <OrderDetailsDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        order={selectedOrder}
      />
    </>
  );
}