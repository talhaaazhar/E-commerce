import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Divider,
} from "antd";
import { UploadOutlined, CloseCircleOutlined, XOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function ProductModal({ visible, product, onClose, onSubmit }) {
  const [form] = Form.useForm();
  const [images, setImages] = useState(product?.images || []);
  const [tags, setTags] = useState(product?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
      });
      setImages(product.images || []);
      setTags(product.tags || []);
    } else if (visible) {
      form.resetFields();
      setImages([]);
      setTags([]);
    }
  }, [visible, product, form]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (removedTag) => {
    setTags(tags.filter((t) => t !== removedTag));
  };

  const handleFinish = async (values) => {
    const payload = { ...values, tag_names: tags, images };
    try {
      setLoading(true);
      await onSubmit(payload);
      onClose();
    } catch (err) {
      message.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={window.innerWidth > 768 ? 800 : "95%"}
      style={{ maxWidth: "100vw" }}
      bodyStyle={{ maxHeight: "80vh", overflowY: "auto", padding: "24px" }}
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            {product ? "✏️ Edit Product" : "➕ Add New Product"}
          </span>
        </div>
      }
      className="modern-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ price: 0, stock: 0 }}
        className="space-y-4"
      >
        {/* Basic Information Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
            📋 Basic Information
          </h3>

          <Form.Item
            label={<span className="font-medium text-gray-700 dark:text-gray-200">Product Name</span>}
            name="name"
            rules={[{ required: true, message: "Product name is required" }]}
          >
            <Input
              placeholder="e.g., Premium Wireless Headphones"
              className="h-10 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-gray-700 dark:text-gray-200">Description</span>}
            name="description"
          >
            <TextArea
              rows={3}
              placeholder="Describe your product features and benefits..."
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-gray-700 dark:text-gray-200">Category</span>}
            name="category"
          >
            <Input
              placeholder="e.g., Electronics, Fashion, Home"
              className="h-10 rounded-lg"
            />
          </Form.Item>
        </div>

        {/* Pricing & Inventory Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
            💰 Pricing & Inventory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-medium text-gray-700 dark:text-gray-200">Price ($)</span>}
              name="price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                className="w-full h-10"
                placeholder="0.00"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-gray-700 dark:text-gray-200">Stock Quantity</span>}
              name="stock"
            >
              <InputNumber
                min={0}
                className="w-full h-10"
                placeholder="0"
              />
            </Form.Item>
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
            🏷️ Tags
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full text-sm font-medium hover:shadow-md transition"
              >
                <span>{tag}</span>
                <XOutlined
                  onClick={() => handleRemoveTag(tag)}
                  className="cursor-pointer hover:text-yellow-200 transition"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              size="middle"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onPressEnter={handleAddTag}
              placeholder="Add a tag..."
              className="flex-1 h-9 rounded-lg"
            />
            <Button
              type="primary"
              onClick={handleAddTag}
              className="rounded-lg"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Images */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
            🖼️ Product Images
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
            {images.map((img) => (
              <div
                key={img}
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  src={img}
                  alt="product"
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <CloseCircleOutlined
                    onClick={() => setImages(images.filter((image) => image !== img))}
                    className="text-white text-2xl cursor-pointer hover:text-red-300 transition"
                  />
                </div>
              </div>
            ))}

            <Upload
              customRequest={({ file }) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const dataUrl = e.target.result;
                  if (!images.includes(dataUrl)) {
                    setImages([...images, dataUrl]);
                  }
                  message.success("Image added successfully");
                };
                reader.readAsDataURL(file);
              }}
              showUploadList={false}
              accept=".jpg,.jpeg,.png,.webp"
            >
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-lg p-4 text-center hover:border-blue-500 transition cursor-pointer h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-700">
                <UploadOutlined className="text-2xl text-blue-500 mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Upload</span>
              </div>
            </Upload>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Drag and drop or click to upload images. Supported formats: JPG, PNG, WebP
          </p>
        </div>

        {/* Submit Buttons */}
        <Divider className="my-4" />
        <div className="flex gap-2 justify-end">
          <Button
            onClick={onClose}
            className="rounded-lg px-6"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="rounded-lg px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            {product ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </Form>

      <style>{`
        .modern-modal .ant-modal-content {
          border-radius: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }

        .modern-modal.dark .ant-modal-content {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        }

        .modern-modal .ant-modal-header {
          border-radius: 12px 12px 0 0;
          border-bottom: 2px solid #e5e7eb;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }

        .modern-modal.dark .ant-modal-header {
          border-bottom: 2px solid #374151;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        }

        .modern-modal .ant-input,
        .modern-modal .ant-input-number {
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .modern-modal .ant-input:focus,
        .modern-modal .ant-input-number-input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        .modern-modal .ant-input-textarea {
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .modern-modal .ant-modal {
            margin: 0;
          }

          .modern-modal .ant-modal-content {
            border-radius: 16px;
          }
        }
      `}</style>
    </Modal>
  );
}