import React from "react";
import { Row, Col, Spin } from "antd";
import {
  DollarOutlined,
  ShoppingOutlined,
  RiseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import SummaryCard from "../components/SummaryCard";
import SalesOverTimeChart from "../components/SalesOverTimeChart";
import TopProductsTable from "../components/TopProductsTable";
import RevenueByProductTable from "../components/RevenueByProductTable";
import CategoryDistributionChart from "../components/CategoryDistributionChart";
import RevenueByProductFilter from "../components/RevenueByProductFilter";
import {
  useSalesSummary,
  useSalesOverTime,
  useTopProducts,
  useRevenueByProduct,
  useRevenueProductFilters,
} from "../hooks/useAdminAnalytics";

const AdminAnalyticsPage = () => {
  const { filters, handleFilterChange } = useRevenueProductFilters();

  const { data: summary, isLoading: loadingSummary } = useSalesSummary();
  const { data: salesOverTime, isLoading: loadingSalesOverTime } =
    useSalesOverTime();
  const { data: topProducts, isLoading: loadingTopProducts } =
    useTopProducts();
  const { data: revenueByProduct, isLoading: loadingRevenueByProduct } =
    useRevenueByProduct({
      product_id: filters.productId,
      product_name: filters.productName || undefined,
      category: filters.category || undefined,
    });

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        {loadingSummary ? (
          <Col span={24} className="flex justify-center py-12">
            <Spin size="large" />
          </Col>
        ) : (
          <>
            <Col xs={24} sm={12} md={6}>
              <SummaryCard
                title="Total Revenue"
                value={`$${Number(summary.total_revenue).toLocaleString()}`}
                icon={<DollarOutlined />}
                color="#3b82f6"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <SummaryCard
                title="Total Orders"
                value={summary.total_orders}
                icon={<ShoppingOutlined />}
                color="#10b981"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <SummaryCard
                title="Items Sold"
                value={summary.total_items_sold}
                icon={<BarChartOutlined />}
                color="#f59e0b"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <SummaryCard
                title="Avg Order Value"
                value={`$${Number(summary.avg_order_value).toLocaleString()}`}
                icon={<RiseOutlined />}
                color="#8b5cf6"
              />
            </Col>
          </>
        )}
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          {loadingSalesOverTime ? (
            <div className="flex justify-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <SalesOverTimeChart data={salesOverTime} />
          )}
        </Col>
        <Col xs={24} lg={8}>
          {loadingSummary ? (
            <div className="flex justify-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <CategoryDistributionChart
              data={[
                {
                  name: "Revenue",
                  value: Number(summary?.total_revenue || 0),
                },
                {
                  name: "Orders",
                  value: Number(summary?.total_orders || 0),
                },
                {
                  name: "Items Sold",
                  value: Number(summary?.total_items_sold || 0),
                },
              ]}
            />
          )}
        </Col>
      </Row>

      {/* Tables Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <TopProductsTable data={topProducts} loading={loadingTopProducts} />
        </Col>

        <Col xs={24} lg={12}>
          <div className="space-y-4">
            <RevenueByProductFilter onFilterChange={handleFilterChange} />
            <RevenueByProductTable
              data={revenueByProduct}
              loading={loadingRevenueByProduct}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAnalyticsPage;