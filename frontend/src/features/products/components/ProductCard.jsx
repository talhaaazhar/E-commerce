import React from "react";
import { Link } from "react-router-dom";
import { Badge, Tag, Button } from "antd";
import { ShoppingOutlined, HeartOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    id,
    name,
    category,
    price,
    images,
    description,
    sale = false,
    tags = [], // [{ label: "New", color: "green" }]
    rating = 0,
  } = product;

  const mainImage =
    images && images.length > 0
      ? images[0]
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <Badge.Ribbon text={sale ? "SALE" : ""} color="red" style={{ display: sale ? "block" : "none" }}>
      <div className="product-card">
        {/* Image Section */}
        <div className="product-image relative">
          <img src={mainImage} alt={name} className="w-full h-48 object-cover rounded-t-xl" />
          {/* Category Tag */}
          <Tag className="category-tag">{category}</Tag>
          {/* Extra Tags */}
          <div className="extra-tags">
            {tags.map((tag, idx) => (
              <Tag key={idx} color={tag.color || "blue"}>
                {tag.label}
              </Tag>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="product-content p-4 flex flex-col justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description || "High-quality product crafted with care."}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${price}</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) =>
                i < rating ? (
                  <StarFilled key={i} style={{ color: "#f5b50a" }} />
                ) : (
                  <StarOutlined key={i} style={{ color: "#ccc" }} />
                )
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/products/${id}`} className="flex-1">
              <Button className="btn-black w-full flex justify-center items-center gap-2">
                <ShoppingOutlined /> View
              </Button>
            </Link>
            <Button className="btn-outline w-12 flex justify-center items-center">
              <HeartOutlined />
            </Button>
          </div>
        </div>
      </div>
    </Badge.Ribbon>
  );
}

export default ProductCard;











// import React from "react";
// import { Link } from "react-router-dom";

// function ProductCard({ product }) {
//   const { name, category, price, images, description, id } = product;
//   const mainImage = images && images.length > 0 ? images[0] : null;
//   // if (mainImage==null){
//   //   mainImage=images; // Don't render if no image is available
//   // }

//   return (
//     <Link to={`/products/${id}`} className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition">
      
//       <div className="relative overflow-hidden">
//         <img
//           src={mainImage}
//           alt={name}
//           className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />

//         {/* Category badge */}
//         <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
//           {category}
//         </span>
//       </div>

//       <div className="p-4 space-y-2">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//           {name}
//         </h3>

//         <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
//           {description || "High-quality product crafted with care."}
//         </p>

//         <div className="flex items-center justify-between pt-3">
//           <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
//             ${price}
//           </span>

//           <button className="px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition">
//             View Details
//           </button>
//         </div>
     
//       </div>
//     </Link>
//   );
// }

// export default ProductCard;


// import React from "react";
// import { Card, Typography, Button, Badge, Tag, Space } from "antd";
// import { Link } from "react-router-dom";
// import { ShoppingOutlined } from "@ant-design/icons";
// import "./ProductCard.css";

// const { Meta } = Card;
// const { Text, Paragraph } = Typography;

// function ProductCard({ product }) {
//   const { name, category, price, images, description, id, sale } = product;
//   const mainImage = images && images.length > 0 ? images[0] : null;

//   return (
//     <Badge.Ribbon
//       text={sale ? "SALE" : ""}
//       color="red"
//       style={{ display: sale ? "block" : "none" }}
//     >
//       <Card
//         hoverable
//         style={{
//           width: 260, // reduce card width
//           margin: "auto",
//           backgroundColor: "var(--ant-card-background)",
//         }}
//         cover={
//           mainImage ? (
//             <img
//               alt={name}
//               src={mainImage}
//               className="card-image card-cover"
//             />
//           ) : null
//         }
//         actions={[
//           <Link to={`/products/${id}`} key="view">
//             <Button className="ant-btn-black" icon={<ShoppingOutlined />}>
//               View Details
//             </Button>
//           </Link>,
//         ]}
//       >
//         {/* Category Tag */}
//         <Tag color="black" style={{ marginBottom: 8 }}>
//           {category}
//         </Tag>

//         <Meta
//           title={<Text strong>{name}</Text>}
//           description={
//             <Paragraph ellipsis={{ rows: 2, expandable: false }}>
//               {description || "High-quality product crafted with care."}
//             </Paragraph>
//           }
//         />

//         <Space
//           style={{ marginTop: 8, justifyContent: "space-between", width: "100%" }}
//         >
//           <Text strong style={{ fontSize: 16 }}>
//             ${price}
//           </Text>
//         </Space>
//       </Card>
//     </Badge.Ribbon>
//   );
// }

// export default ProductCard;


