import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, DatePicker, Switch, Select, Space, Typography } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Text } = Typography;

export const DiscountFormModal = ({
  open,
  onClose,
  onSubmit,
  discount = {},
}) => {
  const [form] = Form.useForm();
  const isEditMode = !!discount?.id;

  useEffect(() => {
    if (discount?.id) {
      form.setFieldsValue({
        ...discount,
        start_end: discount.start_at && discount.end_at 
          ? [discount.start_at ? dayjs(discount.start_at) : null, discount.end_at ? dayjs(discount.end_at) : null]
          : undefined
      });
    } else {
      form.resetFields();
    }
  }, [discount, form, open]);

  const handleFinish = (values) => {
    const payload = {
      ...values,
      start_at: values.start_end?.[0]?.toISOString(),
      end_at: values.start_end?.[1]?.toISOString(),
    };
    delete payload.start_end;
    onSubmit(payload);
  };

  return (
    <Modal
      title={isEditMode ? "✏️ Edit Discount" : "➕ Create New Discount"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={isEditMode ? "Update" : "Create"}
      cancelText="Cancel"
      destroyOnClose
      width={500}
      className="dark:bg-gray-800"
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish}
        className="pt-4"
      >
        <Form.Item
          name="name"
          label={<Text strong>Discount Name</Text>}
          rules={[{ required: true, message: "Please enter discount name" }]}
        >
          <Input placeholder="e.g., Summer Sale 2024" size="large" />
        </Form.Item>

        <Form.Item
          name="discount_type"
          label={<Text strong>Discount Type</Text>}
          rules={[{ required: true, message: "Please select type" }]}
        >
          <Select
            placeholder="Select type"
            size="large"
            options={[
              { label: "📊 Percentage (%)", value: "percentage" },
              { label: "💵 Flat Amount ($)", value: "flat" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="discount_value"
          label={<Text strong>Discount Value</Text>}
          rules={[{ required: true, type: "number", min: 0, message: "Enter a valid amount" }]}
        >
          <InputNumber placeholder="0.00" size="large" style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item name="start_end" label={<Text strong>Valid Period</Text>}>
          <RangePicker showTime style={{ width: "100%" }} size="large" />
        </Form.Item>

        <Form.Item
          name="is_active"
          label={<Text strong>Active Status</Text>}
          valuePropName="checked"
          initialValue={true}
        >
          <Space>
            <Switch />
            <Text type="secondary" className="text-sm">Enable this discount immediately</Text>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DiscountFormModal;