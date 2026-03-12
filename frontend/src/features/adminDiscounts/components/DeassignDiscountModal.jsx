import React, { useState, useMemo } from "react";
import { Modal, Form, Checkbox, Alert, Divider, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const DeassignDiscountModal = ({
  open,
  onClose,
  onSubmit,
  discount = {},
}) => {
  const [form] = Form.useForm();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const products = useMemo(() => discount?.products || [], [discount]);
  const categories = useMemo(() => discount?.categories || [], [discount]);

  const handleReset = () => {
    form.resetFields();
    setSelectedProducts([]);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = () => {
    if (selectedProducts.length === 0 && !selectedCategory) {
      Modal.error({
        title: "No Selection",
        content: "Please select at least one product or category to deassign.",
      });
      return;
    }

    onSubmit({
      discount_id: discount.id,
      product_names: selectedProducts,
      category: selectedCategory || null,
      remove_category_products: true,
    });

    handleReset();
  };

  const hasSelections = selectedProducts.length > 0 || selectedCategory;

  return (
    <Modal
      title="🚫 Remove Discount Assignments"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          icon={<DeleteOutlined />}
          disabled={!hasSelections}
          onClick={handleSubmit}
        >
          Deassign
        </Button>,
      ]}
      destroyOnClose
      width={550}
      className="dark:bg-gray-800"
    >
      <Alert
        message="Select products or categories to remove from this discount"
        type="warning"
        showIcon
        className="mb-6"
      />

      <Form form={form} layout="vertical">
        {/* Products Section */}
        {products.length > 0 && (
          <>
            <Form.Item label={<Text strong>📦 Products ({products.length})</Text>}>
              <div className="border rounded-lg p-4 dark:border-gray-600">
                {products.map((product) => (
                  <div key={product} className="mb-3 last:mb-0">
                    <Checkbox
                      checked={selectedProducts.includes(product)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts([...selectedProducts, product]);
                        } else {
                          setSelectedProducts(
                            selectedProducts.filter((p) => p !== product)
                          );
                        }
                      }}
                      className="dark:text-gray-200"
                    >
                      {product}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </Form.Item>
          </>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <>
            {products.length > 0 && <Divider />}
            <Form.Item label={<Text strong>🏷️ Categories ({categories.length})</Text>}>
              <div className="border rounded-lg p-4 dark:border-gray-600">
                {categories.map((category) => (
                  <div key={category} className="mb-3 last:mb-0">
                    <Checkbox
                      checked={selectedCategory === category}
                      onChange={(e) => {
                        setSelectedCategory(e.target.checked ? category : null);
                      }}
                      className="dark:text-gray-200"
                    >
                      {category}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </Form.Item>
          </>
        )}

        {products.length === 0 && categories.length === 0 && (
          <Alert
            message="No assignments found"
            description="This discount has no products or categories assigned to it."
            type="info"
            showIcon
          />
        )}
      </Form>

      {hasSelections && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <Text type="danger" className="text-sm">
            ⚠️ {selectedProducts.length > 0 && `${selectedProducts.length} product(s)`}
            {selectedProducts.length > 0 && selectedCategory && " and "}
            {selectedCategory && `category "${selectedCategory}"`} will be deassigned
          </Text>
        </div>
      )}
    </Modal>
  );
};

export default DeassignDiscountModal;
