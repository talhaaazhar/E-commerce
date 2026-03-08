import React from "react";
import { Card, Statistic } from "antd";
import "./SummaryCard.css";

const SummaryCard = ({ title, value, prefix, suffix, icon, color }) => {
  return (
    <Card className="summary-card-modern" variant="borderless">
      <div className="summary-card-layout">
        <div className="summary-info">
          <div className="summary-label">{title}</div>
          <Statistic
            value={value}
            prefix={prefix}
            suffix={suffix}
            valueStyle={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#111827",
            }}
          />
        </div>
        {icon && (
          <div className="summary-icon-modern" style={{ backgroundColor: color }}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SummaryCard;