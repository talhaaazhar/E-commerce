import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../profileSlice";

const { Title } = Typography;

export default function PasswordForm() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      await dispatch(changeUserPassword(values)).unwrap();
      message.success("Password changed successfully!");
      form.resetFields();
    } catch (err) {
      message.error(err?.message || "Failed to change password.");
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md mt-6">
      <Title level={4} className="text-gray-900 dark:text-gray-100">Change Password</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Old Password" name="old_password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="New Password" name="new_password" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Update Password</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
