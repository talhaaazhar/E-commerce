import React, { useState } from "react";
import { Button, Input, Popover, Space } from "antd";
import { FilterOutlined, ClearOutlined } from "@ant-design/icons";
import "./RevenueByProductFilter.css";

const RevenueByProductFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    productName: "",
    productId: null,
    category: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilterChange({
      productName: filters.productName,
      productId: filters.productId,
      category: filters.category,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      productName: "",
      productId: null,
      category: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const filterContent = (
    <div className="revenue-filter-popover">
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <h3 className="filter-title">
          <FilterOutlined className="filter-title-icon" />
          Filter Revenue by Product
        </h3>

        <div className="filter-field">
          <label className="filter-label">Product Name</label>
          <Input
            placeholder="Search by product name..."
            value={filters.productName}
            onChange={(e) => handleChange("productName", e.target.value)}
            allowClear
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Product ID</label>
          <Input
            type="number"
            placeholder="Enter product ID..."
            value={filters.productId || ""}
            onChange={(e) =>
              handleChange("productId", e.target.value ? parseInt(e.target.value) : null)
            }
            allowClear
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Category</label>
          <Input
            placeholder="Search by category..."
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            allowClear
            className="filter-input"
          />
        </div>

        <div className="filter-actions">
          <Button
            type="primary"
            onClick={handleApply}
            block
            className="apply-btn"
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            block
            icon={<ClearOutlined />}
            className="reset-btn"
          >
            Reset
          </Button>
        </div>
      </Space>
    </div>
  );

  return (
    <Popover
      content={filterContent}
      title={null}
      trigger="click"
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottomLeft"
      overlayClassName="revenue-filter-overlay"
    >
      <Button
        icon={<FilterOutlined />}
        type="default"
        size="large"
        className="filter-trigger-btn"
      >
        Filter
      </Button>
    </Popover>
  );
};

export default RevenueByProductFilter;
