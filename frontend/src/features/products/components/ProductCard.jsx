// import React from "react";
// import { Link } from "react-router-dom";
// import { Badge, Tag, Button } from "antd";
// import { ShoppingOutlined, HeartOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
// import "./ProductCard.css";

// function ProductCard({ product }) {
//   const {
//     id,
//     name,
//     category,
//     price,
//     images,
//     description,
//     sale = false,
//     tags = [{ label: "New", color: "green" }], 
//     rating = 0,
//   } = product;

//   const mainImage =
//     images && images.length > 0
//       ? images[0]
//       : "https://via.placeholder.com/300x200?text=No+Image";

//   return (
//     <Badge.Ribbon text={sale ? "SALE" : ""} color="red" style={{ display: sale ? "block" : "none" }}>
//       <div className="product-card">
//         <div className="product-image relative">
//           <img src={mainImage} alt={name} className="w-full h-48 object-cover rounded-t-xl" />
//           <Tag className="category-tag">{category}</Tag>
//           <div className="extra-tags">
//             {tags.map((tag, idx) => (
//               <Tag key={idx} color={tag.color || "blue"}>
//                 {tag.label}
//               </Tag>
//             ))}
//           </div>
//         </div>
//         <div className="product-content p-4 flex flex-col justify-between gap-3">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
//             {description || "High-quality product crafted with care."}
//           </p>

//           <div className="flex justify-between items-center">
//             <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${price}</span>
//             <div className="flex gap-1">
//               {Array.from({ length: 5 }).map((_, i) =>
//                 i < rating ? (
//                   <StarFilled key={i} style={{ color: "#f5b50a" }} />
//                 ) : (
//                   <StarOutlined key={i} style={{ color: "#ccc" }} />
//                 )
//               )}
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <Link to={`/products/${id}`} className="flex-1">
//               <Button className="btn-black w-full flex justify-center items-center gap-2">
//                 <ShoppingOutlined /> View
//               </Button>
//             </Link>
//             <Button className="btn-outline w-12 flex justify-center items-center">
//               <HeartOutlined />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Badge.Ribbon>
//   );
// }

// export default ProductCard;



import React from "react";
import { Link } from "react-router-dom";
import { Badge, Tag, Button, Tooltip } from "antd";
import { ShoppingOutlined, HeartOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { getSalePrice, getDiscountPercent } from "../services/priceService";
import { getAverageRating } from "../services/reviewService";
import { useReviews } from "../hooks/useReviews";
import { getProductImages } from "../../../utils/imageUtils";
import "./ProductCard.css";
import { useFavourites } from "../../favourites/hooks/useFavourites";


function ProductCard({ product }) {
  const {
    id,
    name,
    category,
    price,
    images,
    description,
    sale = 0,
    tags = [{ label: "New", color: "green" }],
    reviews: productReviews = null, // Get reviews from product if available
  } = product;

  // Fetch reviews for this product (or use provided reviews)
  const { reviews } = useReviews(id, productReviews);
  
  // Use favourites hook 
  const { favourites, toggleFavourite } = useFavourites();
  const isLiked = favourites.some((p) => p.product_id === id);

  // Get dynamic values from services
  const salePrice = getSalePrice(product);
  const discountPercent = getDiscountPercent(product);
  const averageRating = getAverageRating(reviews);

  // Get properly formatted image URLs
  const productImages = getProductImages(images);
  const mainImage = productImages[0];

  return (
    <Badge.Ribbon
      text={salePrice ? `SALE ${discountPercent}%` : ""}
      color="red"
      style={{ display: salePrice ? "block" : "none" }}
    >
      <div className="product-card">
        <div className="product-image relative overflow-visible">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <Tag className="category-tag absolute top-2 left-2 z-10">{category}</Tag>
          <div className="extra-tags absolute top-2 right-2 z-10">
            {tags.map((tag, idx) => (
              <Tag key={idx} color={tag.color || "blue"}>
                {tag.label}
              </Tag>
            ))}
          </div>
        </div>

        <div className="product-content p-4 flex flex-col justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description || "High-quality product crafted with care."}
          </p>

          {/* Price & Rating */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ${salePrice ? Number(salePrice).toFixed(2) : Number(price).toFixed(2)}
              </span>
              {salePrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${Number(price).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) =>
                i < Math.round(averageRating) ? (
                  <StarFilled key={i} style={{ color: "#f5b50a" }} />
                ) : (
                  <StarOutlined key={i} style={{ color: "#ccc" }} />
                )
              )}
              <Tooltip title={`${reviews.length} review(s)`}>
                <span className="text-sm text-gray-600 ml-1">
                  ({reviews.length})
                </span>
              </Tooltip>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Link to={`/products/${id}`} className="flex-1">
              <Button className="btn-black w-full flex justify-center items-center gap-2">
                <ShoppingOutlined /> View
              </Button>
            </Link>
            <Button className="btn-outline w-12 flex justify-center items-center"
            onClick={()=>toggleFavourite(id)}>
              <HeartOutlined style={{ color: isLiked ? "red" : "gray" }} />
            </Button>
          </div>
        </div>
      </div>
    </Badge.Ribbon>
  );
}

export default ProductCard;

