import React, { useEffect } from "react";
import { Form, Input, Button, Space, Typography, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateProfile, selectProfile } from "../profileSlice";

const { Title } = Typography;

export default function ProfileForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectProfile);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) form.setFieldsValue({ name: user.name, phone: user.phone });
  }, [user]);

  const handleFinish = async (values) => {
    try {
      await dispatch(updateProfile(values)).unwrap();
      message.success("Profile updated successfully!");
    } catch (err) {
      message.error("Failed to update profile.");
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <Title level={4} className="text-gray-900 dark:text-gray-100">Profile Settings</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Save</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
