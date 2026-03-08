import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import { Pie } from "@ant-design/plots";
import { PieChartOutlined } from "@ant-design/icons";
import "./AnalyticsChart.css";

const CategoryDistributionChart = ({ data }) => {
  const config = {
    data,
    angleField: "value",
    colorField: "name",
    radius: 1,
    innerRadius: 0.64,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{percentage}",
      style: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    legend: {
      position: "bottom",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: {
        offsetY: -8,
        style: {
          fontSize: "14px",
          color: "#6b7280",
        },
        content: "Total",
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#111827",
        },
      },
    },
  };

  return (
    <Card
      title={
        <div className="chart-header">
          <PieChartOutlined className="chart-icon" />
          <span>Overview</span>
        </div>
      }
      className="analytics-chart-card"
      variant="borderless"
    >
      <Pie {...config} />
    </Card>
  );
};

export default CategoryDistributionChart;
