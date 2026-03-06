// src/pages/admin/AdminOrdersPage.jsx
import React, { useState } from "react";
import { Typography, Space, Select, Input, Button, Alert } from "antd";
import OrdersTable from "../components/OrdersTable";
import { useFetchOrders } from "../hooks/useAdminOrders";

const { Title } = Typography;
const { Option } = Select;

const AdminOrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState("");

  const { data: orders, isLoading, isError, error, refetch } = useFetchOrders({
    status: statusFilter || undefined,
    user_id: userIdFilter || undefined,
  });

  const handleFilterChange = () => {
    refetch();
  };

  return (
    <div className="p-6">
      <Space orientation="vertical" size="large" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <Title level={3}>Admin Orders</Title>
          <Space wrap>
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              allowClear
              style={{ minWidth: 160 }}
            >
              <Option value="pending">Pending</Option>
              <Option value="paid">Paid</Option>
              <Option value="shipped">Shipped</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
            <Input
              placeholder="Filter by User ID"
              value={userIdFilter}
              onChange={(e) => setUserIdFilter(e.target.value)}
              style={{ minWidth: 140 }}
            />
            <Button type="primary" onClick={handleFilterChange}>
              Apply Filters
            </Button>
          </Space>
        </div>

        {isError ? (
          <Alert
            type="error"
            showIcon
            message="Failed to load orders"
            description={error?.response?.data?.detail || error?.message || "Unknown error"}
          />
        ) : (
          <OrdersTable orders={orders || []} isLoading={isLoading} />
        )}
      </Space>
    </div>
  );
};

export default AdminOrdersPage;