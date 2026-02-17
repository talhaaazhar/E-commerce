import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Checkbox, Space, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserAddresses,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
  selectAddresses,
} from "../profileSlice";

export default function AddressList() {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  const openModal = (address = null) => {
    setEditingAddress(address);
    form.setFieldsValue(address || { is_default: false });
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingAddress) {
        await dispatch(updateUserAddress({ id: editingAddress.id, payload: values })).unwrap();
        message.success("Address updated!");
      } else {
        await dispatch(createUserAddress(values)).unwrap();
        message.success("Address added!");
      }
      setModalOpen(false);
      form.resetFields();
    } catch {
      message.error("Failed to save address.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUserAddress(id)).unwrap();
      message.success("Address deleted!");
    } catch {
      message.error("Failed to delete address.");
    }
  };

  const columns = [
    { title: "Label", dataIndex: "label" },
    { title: "Address", dataIndex: "address_line1", render: (_, record) => `${record.address_line1}, ${record.city}, ${record.country}` },
    { title: "Default", dataIndex: "is_default", render: (val) => (val ? "Yes" : "No") },
    { title: "Actions", render: (_, record) => (
      <Space>
        <Button size="small" onClick={() => openModal(record)}>Edit</Button>
        <Button size="small" danger onClick={() => handleDelete(record.id)}>Delete</Button>
      </Space>
    )}
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md mt-6">
      <Button type="primary" onClick={() => openModal()}>Add Address</Button>
      <Table
        columns={columns}
        dataSource={addresses}
        rowKey="id"
        style={{ marginTop: 16 }}
        pagination={false}
        bordered
      />

      <Modal
        title={editingAddress ? "Edit Address" : "Add Address"}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Label" name="label">
            <Input />
          </Form.Item>
          <Form.Item label="Address Line 1" name="address_line1" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address Line 2" name="address_line2">
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input />
          </Form.Item>
          <Form.Item label="Postal Code" name="postal_code">
            <Input />
          </Form.Item>
          <Form.Item label="Country" name="country" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="is_default" valuePropName="checked">
            <Checkbox>Set as default</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

