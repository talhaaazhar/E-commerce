import React from "react";
import { Card } from "antd";
import { Line } from "@ant-design/plots";
import { LineChartOutlined } from "@ant-design/icons";
import "./AnalyticsChart.css";

const SalesOverTimeChart = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "revenue",
    smooth: false,
    height: 350,
    padding: "auto",
    point: {
      size: 3,
      shape: "circle",
    },
    lineStyle: {
      lineWidth: 2,
    },
    color: "#3b82f6",
    tooltip: {
      formatter: (datum) => {
        return {
          name: "Revenue",
          value: `$${Number(datum.revenue).toLocaleString()}`,
        };
      },
    },
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `$${Number(v).toLocaleString()}`,
      },
    },
  };

  return (
    <Card
      title={
        <div className="chart-header">
          <LineChartOutlined className="chart-icon" />
          <span>Revenue Over Time</span>
        </div>
      }
      className="analytics-chart-card"
      variant="borderless"
    >
      <Line {...config} />
    </Card>
  );
};

export default SalesOverTimeChart;

