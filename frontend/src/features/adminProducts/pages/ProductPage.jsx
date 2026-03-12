import React, { useState, useMemo } from "react";
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
import { useLocation } from "react-router-dom";

import {
  useFetchProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeactivateProduct,
  useActivateProduct,
  useRemoveProduct,
  useUploadImage,
  useRemoveImage,
} from "../hooks/useAdminProducts";

const { Title } = Typography;

const AdminProductsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const location = useLocation();

  // Get search term from URL params
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  const { data: products = [], isLoading } = useFetchProducts({ skip: 0, limit: 50 });

  // Filter products by search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deactivateMutation = useDeactivateProduct();
  const activateMutation = useActivateProduct();
  const removeMutation = useRemoveProduct();
  const uploadImageMutation = useUploadImage();
  const removeImageMutation = useRemoveImage();

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

  const dataUrlToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleModalSubmit = async (values) => {
    try {
      const { newImages = [], existingImages = [], ...productData } = values;

      console.log("handleModalSubmit called with:", {
        newImagesCount: newImages?.length || 0,
        existingImagesCount: existingImages?.length || 0,
        isEditing: !!editingProduct,
      });

      let productId;
      let hasImageErrors = false;

      // Step 1: Create or update product
      try {
        console.log("Step 1: Saving product...");
        if (editingProduct) {
          await updateProductMutation.mutateAsync({ id: editingProduct.id, data: productData });
          productId = editingProduct.id;
          console.log("Product updated, ID:", productId);
        } else {
          const res = await createProductMutation.mutateAsync(productData);
          productId = res.id;
          console.log("Product created, ID:", productId);
        }
      } catch (err) {
        console.error("Error saving product:", err);
        message.error("Failed to save product");
        return;
      }

      // Step 2: Remove images that were deleted
      if (editingProduct && editingProduct.images && editingProduct.images.length > 0) {
        const imagesToRemove = editingProduct.images.filter(img => !existingImages.includes(img));
        console.log("Step 2: Images to remove:", imagesToRemove.length);
        
        for (const imageUrl of imagesToRemove) {
          // Skip data URLs - they're corrupted data from old uploads
          if (imageUrl.startsWith('data:')) {
            console.warn("Skipping corrupted data URL");
            continue;
          }
          
          try {
            console.log("Removing image:", imageUrl);
            await removeImageMutation.mutateAsync({ productId, imageUrl });
            console.log("Image removed successfully");
          } catch (err) {
            console.error("Failed to remove image:", err);
            hasImageErrors = true;
          }
        }
      }

      // Step 3: Upload new images
      console.log("Step 3: Uploading new images, count:", newImages?.length || 0);
      if (newImages && Array.isArray(newImages) && newImages.length > 0) {
        console.log("Processing", newImages.length, "new images");
        for (let i = 0; i < newImages.length; i++) {
          const dataUrl = newImages[i];
          try {
            console.log(`Uploading image ${i + 1}/${newImages.length}...`);
            // Validate it's a data URL
            if (!dataUrl.startsWith('data:')) {
              console.error(`Invalid data URL at index ${i}`);
              hasImageErrors = true;
              continue;
            }
            // Convert data URL to File
            const file = dataUrlToFile(dataUrl, `product-${Date.now()}-${Math.random()}.jpg`);
            console.log(`Sending file to API: ${file.name}, size: ${file.size} bytes`);
            const uploadRes = await uploadImageMutation.mutateAsync({ productId, file });
            console.log(`Image ${i + 1} uploaded successfully:`, uploadRes);
          } catch (err) {
            console.error(`Failed to upload image ${i + 1}:`, err);
            hasImageErrors = true;
          }
        }
      } else {
        console.log("No new images to upload");
      }

      // Step 4: Show success message only after all operations
      console.log("Step 4: Showing completion message");
      if (editingProduct) {
        message.success("Product updated successfully");
      } else {
        message.success("Product created successfully");
      }

      if (hasImageErrors) {
        message.warning("Some images failed to upload/delete. Please check and try again.");
      }

      setModalVisible(false);
    } catch (err) {
      console.error("Error in modal submit:", err);
      message.error("An unexpected error occurred");
    }
  };

  // Dropdown menu for mobile actions
  const renderActionMenu = (record) => ({
    items: [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit',
        onClick: () => handleEdit(record),
      },
      record.is_active
        ? {
            key: 'deactivate',
            icon: <StopOutlined />,
            label: 'Deactivate',
            onClick: () => handleDeactivate(record.id),
          }
        : {
            key: 'activate',
            icon: <CheckOutlined />,
            label: 'Activate',
            onClick: () => handleActivate(record.id),
          },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: 'Delete',
        danger: true,
        onClick: () => {
          if (window.confirm('Are you sure you want to delete this product?')) {
            handleDelete(record.id);
          }
        },
      },
    ],
  });

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
      // Always visible - no responsive property
    },
    {
      title: "Category",
      dataIndex: "category",
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      // Always visible - no responsive property
      render: (price) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      responsive: ["md"],
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
      responsive: ["md"],
      render: (active) =>
        active ? <CheckOutlined style={{ color: "green" }} /> : <StopOutlined style={{ color: "red" }} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          {/* Desktop buttons - hidden on small screens */}
          <div className="hidden md:flex gap-2">
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

          {/* Mobile dropdown - shown only on small screens */}
          <div className="md:hidden">
            <Dropdown menu={renderActionMenu(record)} trigger={["click"]}>
              <Button icon={<MoreOutlined />} />
            </Dropdown>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", marginBottom: 16, marginTop: 40 }}
      >
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={3} style={{ margin: 0 }}>Admin Products</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 0 }}>
            Add Product
          </Button>
        </Space>
      </Space>

      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={filteredProducts || []}
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