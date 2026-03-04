// // src/pages/admin/AdminProductsPage.jsx
// import React, { useState } from "react";
// import { Table, Button, Space, Modal, Typography, Tag, Popconfirm, message } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined, StopOutlined } from "@ant-design/icons";
// import ProductModal from "../components/ProductModel";
// import {
//   useFetchProducts,
//   useCreateProduct,
//   useUpdateProduct,
//   useDeactivateProduct,
//   useActivateProduct,
//   useRemoveProduct,
// } from "../hooks/useProducts";

// const { Title } = Typography;

// const AdminProductsPage = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const { data: products, isLoading } = useFetchProducts({ skip: 0, limit: 50 });

//   const createProductMutation = useCreateProduct();
//   const updateProductMutation = useUpdateProduct();
//   const deactivateMutation = useDeactivateProduct();
//   const activateMutation = useActivateProduct();
//   const removeMutation = useRemoveProduct();

//   // Open modal for new product
//   const handleAdd = () => {
//     setEditingProduct(null);
//     setModalVisible(true);
//   };

//   // Open modal for editing
//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setModalVisible(true);
//   };

//   const handleDeactivate = async (id) => {
//     try {
//       await deactivateMutation.mutateAsync(id);
//       message.success("Product deactivated");
//     } catch {
//       message.error("Failed to deactivate product");
//     }
//   };

//   const handleActivate = async (id) => {
//     try {
//       await activateMutation.mutateAsync(id);
//       message.success("Product activated");
//     } catch {
//       message.error("Failed to activate product");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await removeMutation.mutateAsync(id);
//       message.success("Product deleted");
//     } catch {
//       message.error("Failed to delete product");
//     }
//   };

//   const handleModalSubmit = async (values) => {
//     try {
//       if (editingProduct) {
//         await updateProductMutation.mutateAsync({ id: editingProduct.id, data: values });
//         message.success("Product updated");
//       } else {
//         await createProductMutation.mutateAsync(values);
//         message.success("Product created");
//       }
//       setModalVisible(false);
//     } catch (err) {
//       message.error("Failed to save product");
//     }
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       width: 60,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       render: (price) => `$${price}`,
//     },
//     {
//       title: "Stock",
//       dataIndex: "stock",
//     },
//     {
//       title: "Tags",
//       dataIndex: "tags",
//       render: (tags) => (
//         <Space>
//           {tags.map((t) => (
//             <Tag color="blue" key={t}>{t}</Tag>
//           ))}
//         </Space>
//       ),
//     },
//     {
//       title: "Active",
//       dataIndex: "is_active",
//       render: (active) => (active ? <CheckOutlined style={{ color: "green" }} /> : <StopOutlined style={{ color: "red" }} />),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space>
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
//           {record.is_active ? (
//             <Button danger onClick={() => handleDeactivate(record.id)}>Deactivate</Button>
//           ) : (
//             <Button type="primary" onClick={() => handleActivate(record.id)}>Activate</Button>
//           )}
//           <Popconfirm
//             title="Are you sure delete this product?"
//             onConfirm={() => handleDelete(record.id)}
//           >
//             <Button danger icon={<DeleteOutlined />}>Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space style={{ marginBottom: 16 }}>
//         <Title level={3}>Admin Products</Title>
//         <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
//           Add Product
//         </Button>
//       </Space>
//       <Table
//         rowKey="id"
//         loading={isLoading}
//         columns={columns}
//         dataSource={products || []}
//         pagination={{ pageSize: 20 }}
//       />

//       {modalVisible && (
//         <ProductModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSubmit={handleModalSubmit}
//           product={editingProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminProductsPage;

// src/pages/admin/AdminProductsPage.jsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Popconfirm,
  message,
  Badge,
  Dropdown,
  Menu,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  StopOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ProductModal from "../components/ProductModel";

import {
  useFetchProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeactivateProduct,
  useActivateProduct,
  useRemoveProduct,
} from "../hooks/useProducts";

const { Title } = Typography;

const AdminProductsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { data: products = [], isLoading } = useFetchProducts({ skip: 0, limit: 50 });

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deactivateMutation = useDeactivateProduct();
  const activateMutation = useActivateProduct();
  const removeMutation = useRemoveProduct();

  const handleAdd = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateMutation.mutateAsync(id);
      message.success("Product deactivated");
    } catch {
      message.error("Failed to deactivate product");
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateMutation.mutateAsync(id);
      message.success("Product activated");
    } catch {
      message.error("Failed to activate product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeMutation.mutateAsync(id);
      message.success("Product deleted");
    } catch {
      message.error("Failed to delete product");
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      if (editingProduct) {
        await updateProductMutation.mutateAsync({ id: editingProduct.id, data: values });
        message.success("Product updated");
      } else {
        await createProductMutation.mutateAsync(values);
        message.success("Product created");
      }
      setModalVisible(false);
    } catch {
      message.error("Failed to save product");
    }
  };

  // Dropdown menu for mobile actions
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
      title: "ID",
      dataIndex: "id",
      width: 60,
      responsive: ["lg"],
    },
    {
      title: "Name",
      dataIndex: "name",
      responsive: ["sm"],
    },
    {
      title: "Category",
      dataIndex: "category",
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      responsive: ["sm"],
      render: (price) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      responsive: ["sm"],
      render: (stock) =>
        stock > 0 ? <Badge status="success" text={stock} /> : <Badge status="error" text="Out of stock" />,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      responsive: ["lg"],
      render: (tags) => (
        <Space size={[4, 4]} wrap>
          {tags.map((t) => (
            <Tag color="blue" key={t}>
              {t}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Active",
      dataIndex: "is_active",
      responsive: ["sm"],
      render: (active) =>
        active ? <CheckOutlined style={{ color: "green" }} /> : <StopOutlined style={{ color: "red" }} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          {/* Desktop buttons */}
          <div className="desktop-actions">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              Edit
            </Button>
            {record.is_active ? (
              <Button danger onClick={() => handleDeactivate(record.id)}>
                Deactivate
              </Button>
            ) : (
              <Button type="primary" onClick={() => handleActivate(record.id)}>
                Activate
              </Button>
            )}
            <Popconfirm
              title="Are you sure delete this product?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </div>

          {/* Mobile dropdown */}
          <Dropdown overlay={renderActionMenu(record)} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", marginBottom: 16 }}
      >
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={3}>Admin Products</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Product
          </Button>
        </Space>
      </Space>

      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={products || []}
        pagination={{ pageSize: 20, showSizeChanger: true }}
        scroll={{ x: 900 }}
      />

      {modalVisible && (
        <ProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleModalSubmit}
          product={editingProduct}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;