// src/features/adminDiscounts/pages/DiscountsPage.jsx
import React, { useState } from "react";
import { Button, Space, Typography, Spin, Card, Row, Col } from "antd";
import { PlusOutlined, LinkOutlined } from "@ant-design/icons";

import DiscountTable from "../components/DiscountTable";
import DiscountFormModal from "../components/DiscountFormModal";
import AssignDiscountModal from "../components/AssignDiscountModal";
import DeassignDiscountModal from "../components/DeassignDiscountModal";

import { useDiscounts } from "../hooks/useDiscounts";

const { Title, Text } = Typography;

export default function DiscountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDeassignModalOpen, setIsDeassignModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);

  // ----------------- Hooks -----------------
  const {
    discounts,
    loading: isLoading,
    createDiscount,
    updateDiscount,
    assignDiscount,
    deassignDiscount,
    deleteDiscount,
    activateDiscount,
    deactivateDiscount,
    fetchDiscounts,
  } = useDiscounts();

  // ----------------- Handlers -----------------
  const handleOpenModal = (discount = null) => {
    setEditingDiscount(discount);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingDiscount(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    if (editingDiscount) {
      await updateDiscount(editingDiscount.id, data);
    } else {
      await createDiscount(data);
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await deleteDiscount(id);
  };

  const handleAssignDiscount = async (payload) => {
    await assignDiscount(payload);
    await fetchDiscounts();
    setIsAssignModalOpen(false);
  };

  const handleToggleActive = async (id, isActive) => {
    if (isActive) {
      await deactivateDiscount(id);
    } else {
      await activateDiscount(id);
    }
  };

  const handleDeassignDiscount = async (discount) => {
    setEditingDiscount(discount);
    setIsDeassignModalOpen(true);
  };

  const handleSubmitDeassign = async (data) => {
    await deassignDiscount(data.discount_id, data);
    setIsDeassignModalOpen(false);
  };

  // ----------------- Render -----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <Card className="mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} sm={12}>
            <div>
              <Title level={2} className="mb-0 dark:text-gray-100">
                💰 Discounts
              </Title>
              <Text type="secondary" className="text-sm dark:text-gray-400">
                Manage all promotional discounts and assign them to products
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <Space wrap size="small" className="w-full justify-end">
              <Button
                icon={<LinkOutlined />}
                onClick={() => setIsAssignModalOpen(true)}
                className="w-full sm:w-auto"
              >
                Assign
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleOpenModal()}
                className="w-full sm:w-auto"
              >
                New Discount
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Table Card */}
      <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DiscountTable
              discounts={discounts}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              onDeassign={handleDeassignDiscount}
            />
          </div>
        )}
      </Card>

      <DiscountFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        discount={editingDiscount}
      />

      <AssignDiscountModal
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onSubmit={handleAssignDiscount}
        discounts={discounts}
      />

      <DeassignDiscountModal
        open={isDeassignModalOpen}
        onClose={() => setIsDeassignModalOpen(false)}
        onSubmit={handleSubmitDeassign}
        discount={editingDiscount}
      />
    </div>
  );
}