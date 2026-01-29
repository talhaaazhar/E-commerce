import React from "react";
import { Layout, Carousel, Row, Col, Card, Typography, Button } from "antd";
import { ShoppingCartOutlined, StarOutlined, HeartOutlined } from "@ant-design/icons";
import "./Home.css";

import loungeChairs from "../../assets/images/loungechairs.jpg";
import sofaSet from "../../assets/images/sofaset.jpg";
import sofa from "../../assets/images/sofa.jpeg";
import bluetoothSpeaker from "../../assets/images/loungechairs.jpg";
import smartTv from "../../assets/images/sofaset.jpg";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// Hero slides
const heroSlides = [
  {
    title: "Modern Furniture",
    desc: "Stylish, comfortable, and built to last.",
    buttonText: "Shop Furniture",
    image: loungeChairs,
  },
  {
    title: "Electronics",
    desc: "Smart gadgets for modern living.",
    buttonText: "Shop Electronics",
    image: sofaSet,
  },
];

// Categories
const categories = [
  { title: "Furniture", image: loungeChairs },
  { title: "Electronics", image: sofaSet },
  { title: "Decor", image: sofaSet },
  { title: "Lighting", image: sofaSet },
];

// Featured Products
const products = [
  { title: "Modern Sofa", price: "$499", image: sofa },
  { title: "Smart TV 55''", price: "$799", image: smartTv },
  { title: "Office Chair", price: "$199", image: sofa },
  { title: "Bluetooth Speaker", price: "$99", image: bluetoothSpeaker },
];

// Highlights
const highlights = [
  { icon: <StarOutlined />, title: "Top Quality", desc: "Curated products with best quality." },
  { icon: <HeartOutlined />, title: "Customer First", desc: "Your satisfaction is our priority." },
  { icon: <ShoppingCartOutlined />, title: "Fast Delivery", desc: "Quick shipping to your doorstep." },
];

const HomePage = () => {
  return (
    <Layout className="bg-gray-50 dark:bg-gray-900">
      <Content className="w-full px-2 sm:px-4 lg:px-8 py-10">

        {/* Hero Carousel */}
        <Carousel autoplay autoplaySpeed={3500} effect="fade" className="relative mb-16">
          {heroSlides.map((slide, idx) => (
            <div key={idx} className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover filter brightness-50"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <Title level={2} className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white">{slide.title}</Title>
                <Paragraph className="text-sm sm:text-lg md:text-xl text-white mb-6">{slide.desc}</Paragraph>
                <Button type="primary" size="large">{slide.buttonText}</Button>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Categories */}
        <section className="mb-16">
          <Title level={3} className="text-center mb-10 text-gray-800 dark:text-gray-100">Shop by Category</Title>
          <Row gutter={[16, 16]} justify="center">
            {categories.map((cat, idx) => (
              <Col xs={24} sm={12} md={6} key={idx}>
                <Card hoverable className="overflow-hidden rounded-lg shadow-md dark:shadow-gray-700">
                  <img src={cat.image} alt={cat.title} className="w-full h-48 md:h-56 object-cover rounded-lg" />
                  <Title level={5} className="mt-4 text-center text-gray-800 dark:text-gray-100">{cat.title}</Title>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <Title level={3} className="text-center mb-10 text-gray-800 dark:text-gray-100">Featured Products</Title>
          <Row gutter={[16, 16]}>
            {products.map((prod, idx) => (
              <Col xs={24} sm={12} md={6} key={idx}>
                <Card
                  hoverable
                  cover={<img src={prod.image} alt={prod.title} className="w-full h-48 md:h-56 object-cover rounded-lg" />}
                  className="overflow-hidden rounded-lg shadow-md dark:shadow-gray-700"
                >
                  <Title level={5} className="text-gray-800 dark:text-gray-100">{prod.title}</Title>
                  <Text type="secondary">{prod.price}</Text>
                  <Button type="primary" block className="mt-3">Add to Cart</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Highlights */}
        <section className="mb-16">
          <Title level={3} className="text-center mb-10 text-gray-800 dark:text-gray-100">Why Choose NovaGoods</Title>
          <Row gutter={[16, 16]} justify="center">
            {highlights.map((item, idx) => (
              <Col xs={24} sm={12} md={8} key={idx}>
                <Card hoverable className="text-center rounded-lg shadow-md dark:shadow-gray-700">
                  <div className="text-4xl mb-4 text-brandRed">{item.icon}</div>
                  <Title level={5} className="text-gray-800 dark:text-gray-100">{item.title}</Title>
                  <Paragraph className="text-gray-600 dark:text-gray-300">{item.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

      </Content>
    </Layout>
  );
};

export default HomePage;
