import React from "react";
import { Row, Col, Typography, Empty, Spin, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../products/components/ProductCard";
import { useFavourites } from "../hooks/useFavourites";

const { Title } = Typography;

function FavouritesPage() {
  const { favourites, loading, error } = useFavourites();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!favourites || favourites.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Empty 
          description="No favourites yet" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Browse Products
          </button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2} className="mb-6 dark:text-gray-100">
        My Favourites ({favourites.length})
      </Title>

      <Row gutter={[16, 16]}>
        {favourites.map((like) => {
          // Handle case where product might not be loaded
          if (!like.product) {
            console.warn(`Product not found for like ${like.id}`);
            return null;
          }
          
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={like.id}>
              <ProductCard product={like.product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default FavouritesPage;
