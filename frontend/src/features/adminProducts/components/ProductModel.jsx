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
import "./ProductModal.css";

const { TextArea } = Input;

export default function ProductModal({ visible, product, onClose, onSubmit }) {
  const [form] = Form.useForm();
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [tags, setTags] = useState(product?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("ProductModal useEffect triggered", {
      visible,
      productId: product?.id,
      productImages: product?.images,
      imageType: typeof product?.images,
      isArray: Array.isArray(product?.images),
    });
    
    if (visible && product) {
      console.log("Setting form with product data", {
        name: product.name,
        images: product?.images,
      });
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
      });
      // Separate existing images from new ones
      // Only treat /media/... URLs as valid existing images
      let productImages = Array.isArray(product.images) ? product.images : [];
      const validImages = productImages.filter(img => 
        typeof img === 'string' && img.startsWith('/media/')
      );
      const corruptedImages = productImages.filter(img => 
        typeof img === 'string' && !img.startsWith('/media/')
      );
      
      if (corruptedImages.length > 0) {
        console.warn("Found corrupted image URLs (data URLs stored in DB):", corruptedImages);
      }
      
      console.log("Setting images state:", { validImages, corruptedImages });
      setExistingImages(validImages);
      setNewImages([]);
      setTags(product.tags || []);
    } else if (visible) {
      form.resetFields();
      setExistingImages([]);
      setNewImages([]);
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
    // Don't send images in the JSON payload - they'll be uploaded separately
    // Return both existing and new images for the parent to handle
    const payload = { 
      ...values, 
      tag_names: tags, 
      existingImages,
      newImages
    };
    
    console.log("ProductModal handleFinish - Payload:", {
      name: payload.name,
      existingImagesCount: existingImages.length,
      newImagesCount: newImages.length,
      totalImages: existingImages.length + newImages.length,
    });
    
    try {
      setLoading(true);
      console.log("Calling onSubmit with payload...");
      await onSubmit(payload);
      console.log("onSubmit completed successfully");
      onClose();
    } catch (err) {
      console.error("Error saving product:", err);
      message.error("Failed to save product: " + (err.response?.data?.detail || err.message));
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
      className="modern-modal product-modal-container"
      styles={{
        body: {
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "24px"
        }
      }}
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            {product ? "✏️ Edit Product" : "➕ Add New Product"}
          </span>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ price: 0, stock: 0 }}
        className="product-modal-form"
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

          <div className="tag-container">
            {tags.map((tag) => (
              <div
                key={tag}
                className="tag-item"
              >
                <span>{tag}</span>
                <XOutlined
                  onClick={() => handleRemoveTag(tag)}
                  className="tag-remove-icon"
                />
              </div>
            ))}
          </div>

          <div className="tag-input-container">
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
            🖼️ Product Images ({existingImages.length + newImages.length})
          </h3>

          <div className="image-grid">
            {/* Existing images */}
            {existingImages && existingImages.length > 0 && (
              existingImages.map((img) => {
                console.log("Rendering existing image:", { img });
                return (
                  <div
                    key={img}
                    className="image-item"
                  >
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}${img}`}
                      alt="product"
                      className="image-preview"
                      onError={(e) => {
                        console.error("Image failed to load:", img);
                        e.target.src = "https://via.placeholder.com/100?text=Error";
                      }}
                    />
                    <div className="image-badge image-badge-uploaded">
                      Uploaded
                    </div>
                    <div className="image-overlay">
                      <CloseCircleOutlined
                        onClick={() => {
                          console.log("Removing existing image:", img);
                          setExistingImages(existingImages.filter((image) => image !== img));
                        }}
                        className="image-delete-icon"
                      />
                    </div>
                  </div>
                );
              })
            )}
            
            {/* New images (data URLs) */}
            {newImages && newImages.length > 0 && (
              newImages.map((img) => {
                console.log("Rendering new image:", { img });
                return (
                  <div
                    key={img}
                    className="image-item"
                  >
                    <img
                      src={img}
                      alt="product"
                      className="image-preview"
                      onError={(e) => {
                        console.error("Image failed to load:", img);
                        e.target.src = "https://via.placeholder.com/100?text=Error";
                      }}
                    />
                    <div className="image-badge image-badge-new">
                      New
                    </div>
                    <div className="image-overlay">
                      <CloseCircleOutlined
                        onClick={() => {
                          console.log("Removing new image:", img);
                          setNewImages(newImages.filter((image) => image !== img));
                        }}
                        className="image-delete-icon"
                      />
                    </div>
                  </div>
                );
              })
            )}

            {existingImages.length === 0 && newImages.length === 0 && (
              <div className="no-images-message">
                No images yet
              </div>
            )}

            <Upload
              customRequest={({ file }) => {
                console.log("File selected:", file.name, "Type:", file.type);
                const reader = new FileReader();
                reader.onload = (e) => {
                  const dataUrl = e.target.result;
                  console.log("DataURL created, length:", dataUrl.length, "starts with:", dataUrl.substring(0, 30));
                  if (!newImages.includes(dataUrl)) {
                    console.log("Adding new image to state. Current count:", newImages.length);
                    setNewImages([...newImages, dataUrl]);
                  } else {
                    console.warn("Image already exists in newImages array");
                  }
                  message.success("Image added successfully");
                };
                reader.onerror = (err) => {
                  console.error("FileReader error:", err);
                  message.error("Failed to read file");
                };
                reader.readAsDataURL(file);
              }}
              showUploadList={false}
              accept=".jpg,.jpeg,.png,.webp"
            >
              <div className="upload-area">
                <UploadOutlined className="upload-icon" />
                <span className="upload-text">Upload</span>
              </div>
            </Upload>
          </div>

          <p className="upload-hint">
            💡 Drag and drop or click to upload images. Supported formats: JPG, PNG, WebP
          </p>
        </div>

        {/* Submit Buttons */}
        <Divider className="my-4" />
        <div className="modal-actions">
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
    </Modal>
  );
}