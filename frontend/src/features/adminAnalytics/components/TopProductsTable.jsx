import React from "react";
import { Card, Table, Tag } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import "./AnalyticsChart.css";

const TopProductsTable = ({ data, loading }) => {
  const columns = [
    {
      title: "#",
      key: "rank",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold text-gray-600">{index + 1}</span>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (name) => <span className="font-medium">{name}</span>,
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
    {
      title: "Share",
      dataIndex: "revenue_percentage",
      key: "revenue_percentage",
      align: "center",
      width: 90,
      render: (value) => (
        <Tag color="blue">{value}%</Tag>
      ),
    },
  ];

  return (
    <Card
      title={
        <div className="chart-header">
          <TrophyOutlined className="chart-icon" />
          <span>Top Selling Products</span>
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
        pagination={false}
        size="middle"
      />
    </Card>
  );
};

export default TopProductsTable;
