import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Radio,
  Divider,
  Empty,
  Space,
  Alert,
} from "antd";

import {
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

import { useCheckout } from "../hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../cart/cartSlice";

import "./CheckoutForm.css";

const { Title, Text } = Typography;

function CheckoutForm({ user }) {
  const navigate = useNavigate();

  const { checkout, loading } = useCheckout();

  const [form] = Form.useForm();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const cartItems = useSelector(selectCartItems);

  const cartTotal = useSelector(selectCartTotal);

  const subtotal = Number(cartTotal) || 0;

  const tax = subtotal * 0.1;

  const deliveryFee = subtotal > 500 ? 0 : 50;

  const finalTotal = subtotal + tax + deliveryFee;

  const onFinish = async () => {
    const order = await checkout();

    if (order) {
      navigate("/orders");
    }
  };

  return (
    <div className="checkout-container bg-gray-100 dark:bg-gray-900">
      <div className="checkout-wrapper px-3 md:px-6 py-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: user?.name || "",

            phone: user?.phone || "",

            address: user?.address || "",
          }}
        >
          <Row gutter={[24, 24]}>
            {/* LEFT */}

            <Col xs={24} lg={14}>
              <Card className="checkout-card">
                <Space className="mb-3">
                  <ShoppingCartOutlined />

                  <Title level={4} className="!m-0">
                    Order Summary
                  </Title>
                </Space>

                <Divider />

                {cartItems.length === 0 ? (
                  <Empty />
                ) : (
                  <>
                    <div className="order-items">
                      {cartItems.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex justify-between py-2 border-b"
                        >
                          <Text>
                            {item.name}x{item.quantity}
                          </Text>

                          <Text>${Number(item.subtotal).toFixed(2)}</Text>
                        </div>
                      ))}
                    </div>

                    <Divider />

                    <div>
                      <div className="summary-row">
                        <Text>Subtotal</Text>

                        <Text>${subtotal.toFixed(2)}</Text>
                      </div>

                      <div className="summary-row">
                        <Text>Tax</Text>

                        <Text>${tax.toFixed(2)}</Text>
                      </div>

                      <div className="summary-row">
                        <Text>Delivery</Text>

                        <Text>
                          {deliveryFee === 0 ? "FREE" : `$${deliveryFee}`}
                        </Text>
                      </div>

                      <Divider />

                      <div className="summary-row total-row">
                        <Text>Total</Text>

                        <Text>${finalTotal.toFixed(2)}</Text>
                      </div>
                    </div>

                    {deliveryFee === 0 && (
                      <Alert type="success" message="Free Delivery" />
                    )}
                  </>
                )}
              </Card>

              <Card className="checkout-card mt-5">
                <Space className="mb-3">
                  <HomeOutlined />

                  <Title level={4} className="!m-0">
                    Delivery Address
                  </Title>
                </Space>

                <Divider />

                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input prefix={<UserOutlined />} placeholder="Name" />
                </Form.Item>

                <Form.Item name="phone" rules={[{ required: true }]}>
                  <Input placeholder="Phone" />
                </Form.Item>

                <Form.Item name="address" rules={[{ required: true }]}>
                  <Input.TextArea rows={3} placeholder="Address" />
                </Form.Item>
              </Card>
            </Col>

            {/* RIGHT */}

            <Col xs={24} lg={10}>
              <Card className="checkout-card">
                <Space className="mb-3">
                  <CreditCardOutlined />

                  <Title level={4} className="!m-0">
                    Payment
                  </Title>
                </Space>

                <Divider />

                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value="cod">Cash on Delivery</Radio>

                    <Radio value="online">Online</Radio>
                  </Space>
                </Radio.Group>
              </Card>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="checkout-button mt-5"
              >
                Complete Order ${finalTotal.toFixed(2)}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default CheckoutForm;
