import React from "react";
import { useOrders } from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";
import {
  Row,
  Col,
  Spin,
  Empty,
  Typography,
  Card,
  Skeleton,
  Space,
  Button,
} from "antd";
import { ShoppingOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function OrdersPage() {
  const navigate = useNavigate();
  const { orders, loading, reload } = useOrders();

  const totalOrders = orders.length;
  const totalSpent = orders.reduce(
    (acc, order) => acc + Number(order?.total_amount || 0),
    0
  );

  if (loading) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        <Skeleton active paragraph={{ rows: 1 }} />
        <Row gutter={[16, 16]}>
          {[1, 2, 3].map((n) => (
            <Col xs={24} md={12} xl={8} key={n}>
              <Card>
                <Skeleton active paragraph={{ rows: 4 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="You have not placed any orders yet"
          >
            <Button type="primary" onClick={() => navigate("/products")}>
              Start Shopping
            </Button>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
      <Space
        style={{ width: "100%", justifyContent: "space-between", marginBottom: 16 }}
        align="start"
        wrap
      >
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>
            My Orders
          </Title>
          <Text type="secondary">Track, review, and manage your purchases</Text>
        </div>

        <Button icon={<ReloadOutlined />} onClick={reload}>
          Refresh
        </Button>
      </Space>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Total Orders</Text>
            <Title level={3} style={{ margin: 0 }}>
              {totalOrders}
            </Title>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Total Spent</Text>
            <Title level={3} style={{ margin: 0 }}>
              ${totalSpent.toFixed(2)}
            </Title>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {orders.map((order) => (
          <Col xs={24} md={12} xl={8} key={order.id}>
            <OrderCard order={order} />
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Button icon={<ShoppingOutlined />} onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default OrdersPage;
