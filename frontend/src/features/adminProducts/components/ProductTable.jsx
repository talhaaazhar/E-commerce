import React, { useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Popconfirm,
  message,
  Badge,
  Dropdown,
  Menu,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  useFetchProducts,
  useDeactivateProduct,
  useActivateProduct,
  useRemoveProduct,
} from "../hooks/useAdminProducts";
import ProductModal from "./ProductModal";

export default function ProductTable() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch products
  const { data: products = [], isLoading } = useFetchProducts({ limit: 50 });

  // Mutations
  const deactivateMutation = useDeactivateProduct();
  const activateMutation = useActivateProduct();
  const removeMutation = useRemoveProduct();

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateMutation.mutateAsync(id);
      message.success("Product deactivated successfully");
    } catch {
      message.error("Failed to deactivate product");
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateMutation.mutateAsync(id);
      message.success("Product activated successfully");
    } catch {
      message.error("Failed to activate product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeMutation.mutateAsync(id);
      message.success("Product deleted successfully");
    } catch {
      message.error("Failed to delete product");
    }
  };

  // Responsive action menu for small screens
  const renderActionMenu = (record) => (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={() => handleEdit(record)}>
        Edit
      </Menu.Item>
      {record.is_active ? (
        <Menu.Item icon={<StopOutlined />} onClick={() => handleDeactivate(record.id)}>
          Deactivate
        </Menu.Item>
      ) : (
        <Menu.Item icon={<CheckOutlined />} onClick={() => handleActivate(record.id)}>
          Activate
        </Menu.Item>
      )}
      <Menu.Item icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["sm"],
      render: (_, record) => {
        if (record.discounted_price) {
          return (
            <span>
              <del>${record.price}</del>{" "}
              <b>${record.discounted_price.toFixed(2)}</b>
            </span>
          );
        }
        return `$${record.price}`;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      responsive: ["sm"],
      render: (stock) =>
        stock > 0 ? (
          <Badge status="success" text={stock} />
        ) : (
          <Badge status="error" text="Out of stock" />
        ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      responsive: ["lg"],
      render: (tags) => (
        <Space size={[4, 4]} wrap>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      responsive: ["sm"],
      render: (active) =>
        active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          {/* Show buttons on large screens */}
          <div className="desktop-actions">
            <Button size="small" type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            {record.is_active ? (
              <Popconfirm
                title="Deactivate this product?"
                onConfirm={() => handleDeactivate(record.id)}
              >
                <Button size="small" type="link" danger>
                  Deactivate
                </Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Activate this product?"
                onConfirm={() => handleActivate(record.id)}
              >
                <Button size="small" type="link">
                  Activate
                </Button>
              </Popconfirm>
            )}
            <Popconfirm
              title="Delete this product permanently?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button size="small" type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>

          {/* Show dropdown on small screens */}
          <Dropdown overlay={renderActionMenu(record)} trigger={['click']}>
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => {
          setSelectedProduct(null);
          setModalVisible(true);
        }}
      >
        Add Product
      </Button>

      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 800 }}
      />

      {modalVisible && (
        <ProductModal
          visible={modalVisible}
          product={selectedProduct}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
}