import React from "react";
import { Modal, Form, Select, Input, Alert, Divider, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

const AssignDiscountModal = ({
  open,
  onClose,
  onSubmit,
  discounts = [],
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const parsedIds = (values.product_ids_text || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .map((v) => Number(v))
      .filter((n) => Number.isInteger(n) && n > 0);

    onSubmit({
      discount_id: Number(values.discount_id),
      product_ids: parsedIds,
      category: values.category?.trim() || null,
    });

    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="🎯 Assign Discount to Products"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Assign"
      cancelText="Cancel"
      destroyOnClose
      width={550}
      className="dark:bg-gray-800"
    >
      <Alert
        message="Assign discounts to specific products or entire categories"
        type="info"
        icon={<InfoCircleOutlined />}
        showIcon
        className="mb-6"
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ product_ids_text: "", category: "" }}
      >
        <Form.Item
          name="discount_id"
          label={<Text strong>Select Discount</Text>}
          rules={[{ required: true, message: "Please select a discount" }]}
        >
          <Select
            placeholder="Choose a discount from the list"
            size="large"
            options={discounts.map((d) => ({
              value: d.id ?? d.discount_id,
              label: (
                <div className="flex justify-between">
                  <span>{d.name}</span>
                  <span className="text-gray-500 text-xs">
                    {d.discount_type === "percentage" ? `${d.discount_value}%` : `$${d.discount_value}`}
                  </span>
                </div>
              ),
            }))}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Divider>
          <Text type="secondary">Assign Method</Text>
        </Divider>

        <Form.Item
          name="product_ids_text"
          label={<Text strong>Product IDs (Optional)</Text>}
          extra=<div className="text-xs text-gray-500">
            Comma-separated list. Example: <code>1, 5, 12, 23</code>
          </div>
        >
          <TextArea 
            rows={3} 
            placeholder="Enter product IDs separated by commas..." 
            className="font-mono text-sm"
          />
        </Form.Item>

        <Form.Item
          name="category"
          label={<Text strong>Category (Optional)</Text>}
          extra="Apply discount to all products in a specific category"
        >
          <Input 
            placeholder="e.g., Electronics, Furniture" 
            size="large"
          />
        </Form.Item>

        <Alert
          message="At least one target is required: Product IDs or a Category"
          type="warning"
          showIcon
          className="mt-4"
        />
      </Form>
    </Modal>
  );
};

export default AssignDiscountModal;
