import React from "react";
import { Table, Button, Space, Tag, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, LinkOutlined } from "@ant-design/icons";

export const DiscountTable = ({
  discounts,
  onEdit,
  onDelete,
  onToggleActive,
  onDeassign,
}) => {
  const getDiscountId = (record) => record?.id ?? record?.discount_id;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Type & Value",
      key: "discount_info",
      width: 120,
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Tag color={record.discount_type === "percentage" ? "blue" : "green"}>
            {record.discount_type === "percentage" ? "Percentage" : "Flat"}
          </Tag>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {record.discount_type === "percentage" ? `${record.discount_value}%` : `$${record.discount_value}`}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "active",
      width: 100,
      render: (_, record) => (
        <Tag color={record.is_active ? "green" : "red"} className="font-semibold">
          {record.is_active ? "✓ Active" : "○ Inactive"}
        </Tag>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      width: 150,
      responsive: ["lg"],
      render: (products = []) =>
        products.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {products.slice(0, 2).map((p, index) => (
              <Tag key={`${p}-${index}`} color="cyan" className="text-xs">
                {typeof p === "string" ? p : p?.name}
              </Tag>
            ))}
            {products.length > 2 && (
              <Tooltip title={products.slice(2).join(", ")}>
                <Tag className="text-xs">+{products.length - 2}</Tag>
              </Tooltip>
            )}
          </div>
        ) : (
          <span className="text-gray-400 dark:text-gray-500">-</span>
        ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      width: 150,
      responsive: ["lg"],
      render: (cats = []) =>
        cats.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {cats.slice(0, 2).map((c, index) => (
              <Tag key={`${c}-${index}`} color="purple" className="text-xs">
                {c}
              </Tag>
            ))}
            {cats.length > 2 && (
              <Tooltip title={cats.slice(2).join(", ")}>
                <Tag className="text-xs">+{cats.length - 2}</Tag>
              </Tooltip>
            )}
          </div>
        ) : (
          <span className="text-gray-400 dark:text-gray-500">-</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      fixed: "right",
      render: (_, record) => (
        <Space size="small" wrap>
          <Tooltip title="Edit">
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          {(record.products?.length > 0 || record.categories?.length > 0) && (
            <Tooltip title="Deassign">
              <Button
                type="default"
                size="small"
                icon={<LinkOutlined />}
                onClick={() => onDeassign(record)}
              />
            </Tooltip>
          )}
          <Popconfirm
            title={`${record.is_active ? "Deactivate" : "Activate"} this discount?`}
            onConfirm={() => onToggleActive(getDiscountId(record), record.is_active)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title={record.is_active ? "Deactivate" : "Activate"}>
              <Button
                type={record.is_active ? "default" : "primary"}
                size="small"
                icon={record.is_active ? <LockOutlined /> : <UnlockOutlined />}
                danger={record.is_active}
              />
            </Tooltip>
          </Popconfirm>
          <Popconfirm
            title="Delete this discount?"
            description="This action cannot be undone."
            onConfirm={() => onDelete(getDiscountId(record))}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <Button type="default" size="small" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={discounts}
      columns={columns}
      rowKey={(record) => getDiscountId(record)}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      scroll={{ x: 800 }}
      size="middle"
    />
  );
};

export default DiscountTable;