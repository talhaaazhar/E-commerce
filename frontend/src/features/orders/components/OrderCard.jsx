import React from "react";
import {
  Card,
  Typography,
  Divider,
  Tag,
  Button,
  Collapse,
  List,
  Space,
} from "antd";
import {
  CalendarOutlined,
  ShoppingOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";

const { Text } = Typography;

const getStatusColor = (status = "") => {
  const normalized = String(status).toLowerCase();

  if (normalized.includes("delivered")) return "green";
  if (normalized.includes("shipped")) return "blue";
  if (normalized.includes("processing") || normalized.includes("pending")) {
    return "gold";
  }
  if (normalized.includes("cancel")) return "red";

  return "default";
};

function OrderCard({ order }) {
  const [showDetails, setShowDetails] = useState(false);

  const totalItems = useMemo(
    () => (order?.items || []).reduce((acc, item) => acc + (item.quantity || 0), 0),
    [order]
  );

  const placedAt = order?.created_at
    ? new Date(order.created_at).toLocaleString()
    : "N/A";

  const totalAmount = Number(order?.total_amount || 0).toFixed(2);

  return (
    <Card
      hoverable
      styles={{ body: { paddingBottom: 12 } }}
      title={<Text strong>Order #{order.id}</Text>}
      extra={
        <Tag color={getStatusColor(order?.status)}>
          {String(order?.status || "unknown").toUpperCase()}
        </Tag>
      }
    >
      <Space direction="vertical" style={{ width: "100%" }} size={6}>
        <Text type="secondary">
          <CalendarOutlined /> Placed: {placedAt}
        </Text>

        <Text>
          <ShoppingOutlined /> {totalItems} item{totalItems !== 1 ? "s" : ""}
        </Text>

        <Text strong style={{ fontSize: 16 }}>
          Total: ${totalAmount}
        </Text>
      </Space>

      <Divider />

      <Button
        type={showDetails ? "default" : "primary"}
        icon={showDetails ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        onClick={() => setShowDetails((prev) => !prev)}
        block
      >
        {showDetails ? "Hide Order Details" : "View Order Details"}
      </Button>

      {showDetails && (
        <Collapse
          style={{ marginTop: 12 }}
          defaultActiveKey={["items"]}
          items={[
            {
              key: "items",
              label: "Items in this order",
              children: (
                <List
                  dataSource={order?.items || []}
                  locale={{ emptyText: "No items found" }}
                  renderItem={(item) => (
                    <List.Item>
                      <Space
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Space direction="vertical" size={0}>
                          <Text strong>{item?.name || "Product"}</Text>
                          <Text type="secondary">Qty: {item?.quantity || 0}</Text>
                          <Space size={8} wrap>
                            <Text type="secondary">
                              Unit: ${Number(item?.sold_price ?? 0).toFixed(2)}
                            </Text>
                            {Number(item?.original_price ?? 0) > Number(item?.sold_price ?? 0) && (
                              <Text delete type="secondary">
                                ${Number(item?.original_price ?? 0).toFixed(2)}
                              </Text>
                            )}
                          </Space>
                        </Space>
                        <Text strong>${Number(item?.subtotal || 0).toFixed(2)}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              ),
            },
          ]}
        />
      )}
    </Card>
  );
}

export default OrderCard;
