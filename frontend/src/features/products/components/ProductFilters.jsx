import React, { useState } from "react";
import { Button, Input, Select, Checkbox, Popover, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const ProductFilters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    min_rating: "",
    min_price: "",
    max_price: "",
    on_sale: false,
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      category: "",
      min_rating: "",
      min_price: "",
      max_price: "",
      on_sale: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const filterContent = (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-lg p-5">
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filters</h3>

        {/* Product Name/Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <Input
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="All"
            value={filters.category || undefined}
            onChange={(value) => handleChange("category", value || "")}
            options={[
              { label: "All", value: "" },
              { label: "Electronics", value: "electronics" },
              { label: "Furniture", value: "furniture" },
              { label: "Books", value: "books" },
              { label: "Home", value: "home" },
            ]}
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Price Range
          </label>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters.min_price}
              onChange={(e) => handleChange("min_price", e.target.value)}
              className="flex-1 rounded-md"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.max_price}
              onChange={(e) => handleChange("max_price", e.target.value)}
              className="flex-1 rounded-md"
            />
          </div>
        </div>

        {/* Min Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Min Rating
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="Any"
            value={filters.minRating || undefined}
            onChange={(value) => handleChange("minRating", value || "")}
            options={[
              { label: "Any", value: "" },
              { label: "1 star & up", value: "1" },
              { label: "2 stars & up", value: "2" },
              { label: "3 stars & up", value: "3" },
              { label: "4 stars & up", value: "4" },
              { label: "5 stars", value: "5" },
            ]}
          />
        </div>

        {/* On Sale Checkbox */}
        <Checkbox
          checked={filters.onSale}
          onChange={(e) => handleChange("onSale", e.target.checked)}
          className="text-gray-700 dark:text-gray-300"
        >
          On Sale Only
        </Checkbox>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            onClick={handleReset} 
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-none hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Reset
          </Button>
          <Button 
            type="primary" 
            danger 
            onClick={handleApply} 
            className="flex-1"
          >
            Apply
          </Button>
        </div>
      </Space>
    </div>
  );

  return (
    <Popover
      content={filterContent}
      title={null}
      placement="bottomLeft"
      trigger="click"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        className="bg-red-600 text-white border-none hover:bg-red-700"
        icon={<FilterOutlined />}
      >
        Filters
      </Button>
    </Popover>
  );
};

export default ProductFilters;
