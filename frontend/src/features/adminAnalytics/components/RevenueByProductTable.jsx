import React from "react";
import { Card, Table, Tag } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import "./AnalyticsChart.css";

const RevenueByProductTable = ({ data, loading }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (name) => <span className="font-medium">{name}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "total_quantity",
      key: "total_quantity",
      align: "center",
      width: 100,
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      align: "right",
      width: 140,
      render: (value) => (
        <span className="font-semibold text-green-600">
          ${Number(value).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <Card
      title={
        <div className="chart-header">
          <DollarOutlined className="chart-icon" />
          <span>Revenue By Product</span>
        </div>
      }
      className="analytics-chart-card"
      variant="borderless"
    >
      <Table
        rowKey="product_id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5, showSizeChanger: false }}
        size="middle"
      />
    </Card>
  );
};

export default RevenueByProductTable;