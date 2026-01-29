import React, { useState } from "react";

const ProductFilters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false); // dropdown open/close
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minRating: "",
    minPrice: "",
    maxPrice: "",
    onSale: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFilters({ ...filters, [name]: newValue });
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsOpen(false); // close dropdown after apply
  };

  const handleReset = () => {
    const resetFilters = {
      name: "",
      category: "",
      minRating: "",
      minPrice: "",
      maxPrice: "",
      onSale: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Filters
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filters</h2>

          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Search by name..."
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
              <option value="home">Home</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min"
                className="w-1/2 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max"
                className="w-1/2 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Min Rating</label>
            <select
              name="minRating"
              value={filters.minRating}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="">Any</option>
              <option value="1">1 star & up</option>
              <option value="2">2 stars & up</option>
              <option value="3">3 stars & up</option>
              <option value="4">4 stars & up</option>
              <option value="5">5 stars</option>
            </select>
          </div>

          {/* On Sale */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="onSale"
              checked={filters.onSale}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 rounded"
            />
            <label className="text-gray-700 dark:text-gray-200">On Sale</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;

// import React, { useState } from "react";
// import { Button, Input, Select, InputNumber, Checkbox, Popover, Space } from "antd";
// const { Option } = Select;

// const ProductFilters = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     name: "",
//     category: "",
//     minRating: "",
//     minPrice: "",
//     maxPrice: "",
//     onSale: false,
//   });

//   const handleChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleApply = () => {
//     onFilterChange(filters);
//   };

//   const handleReset = () => {
//     const resetFilters = {
//       name: "",
//       category: "",
//       minRating: "",
//       minPrice: "",
//       maxPrice: "",
//       onSale: false,
//     };
//     setFilters(resetFilters);
//     onFilterChange(resetFilters);
//   };

//   const content = (
//     <div style={{ width: 300 }}>
//       <Space direction="vertical" style={{ width: "100%" }}>
//         {/* Product Name */}
//         <div>
//           <label>Product Name</label>
//           <Input
//             placeholder="Search by name..."
//             value={filters.name}
//             onChange={(e) => handleChange("name", e.target.value)}
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label>Category</label>
//           <Select
//             value={filters.category}
//             onChange={(value) => handleChange("category", value)}
//             style={{ width: "100%" }}
//             placeholder="Select category"
//             allowClear
//           >
//             <Option value="electronics">Electronics</Option>
//             <Option value="furniture">Furniture</Option>
//             <Option value="books">Books</Option>
//             <Option value="home">Home</Option>
//           </Select>
//         </div>

//         {/* Price Range */}
//         <div>
//           <label>Price Range</label>
//           <Input.Group compact>
//             <InputNumber
//               placeholder="Min"
//               value={filters.minPrice}
//               onChange={(value) => handleChange("minPrice", value)}
//               style={{ width: "50%" }}
//             />
//             <InputNumber
//               placeholder="Max"
//               value={filters.maxPrice}
//               onChange={(value) => handleChange("maxPrice", value)}
//               style={{ width: "50%" }}
//             />
//           </Input.Group>
//         </div>

//         {/* Min Rating */}
//         <div>
//           <label>Min Rating</label>
//           <Select
//             value={filters.minRating}
//             onChange={(value) => handleChange("minRating", value)}
//             style={{ width: "100%" }}
//             placeholder="Any rating"
//             allowClear
//           >
//             <Option value="1">1 star & up</Option>
//             <Option value="2">2 stars & up</Option>
//             <Option value="3">3 stars & up</Option>
//             <Option value="4">4 stars & up</Option>
//             <Option value="5">5 stars</Option>
//           </Select>
//         </div>

//         {/* On Sale */}
//         <Checkbox
//           checked={filters.onSale}
//           onChange={(e) => handleChange("onSale", e.target.checked)}
//         >
//           On Sale
//         </Checkbox>

//         {/* Buttons */}
//         <Space style={{ width: "100%", justifyContent: "space-between" }}>
//           <Button onClick={handleReset}>Reset</Button>
//           <Button type="primary" onClick={handleApply}>
//             Apply
//           </Button>
//         </Space>
//       </Space>
//     </div>
//   );

//   return (
//     <Popover content={content} title="Filters" trigger="click" placement="bottomLeft">
//       <Button type="primary">Filters</Button>
//     </Popover>
//   );
// };

// export default ProductFilters;


