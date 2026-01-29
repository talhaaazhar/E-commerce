// import React from "react";
// import { Layout, Typography, Row, Col, Card, Divider } from "antd";

// const { Content } = Layout;
// const { Title, Paragraph, Text } = Typography;

// const AboutUs = () => {
//   return (
//     <Layout>
//       <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <Title level={2}>About NovaGoods</Title>
//           <Paragraph type="secondary" className="max-w-2xl mx-auto">
//             NovaGoods is a modern e-commerce platform built to deliver trusted
//             products, seamless experiences, and customer-centric innovation.
//           </Paragraph>
//         </div>

//         {/* Mission / Vision */}
//         <Row gutter={[32, 32]} className="mb-16">
//           <Col xs={24} md={12}>
//             <Card bordered={false}>
//               <Title level={4}>Our Mission</Title>
//               <Paragraph>
//                 To simplify online shopping by offering reliable products,
//                 transparent pricing, and a smooth purchasing experience for
//                 everyone.
//               </Paragraph>
//             </Card>
//           </Col>

//           <Col xs={24} md={12}>
//             <Card bordered={false}>
//               <Title level={4}>Our Vision</Title>
//               <Paragraph>
//                 To become a globally trusted e-commerce ecosystem that empowers
//                 customers and businesses through technology.
//               </Paragraph>
//             </Card>
//           </Col>
//         </Row>

//         <Divider />

//         {/* Values */}
//         <div className="mb-16">
//           <Title level={3} className="text-center mb-10">
//             Our Core Values
//           </Title>

//           <Row gutter={[24, 24]}>
//             <Col xs={24} sm={12} md={8}>
//               <Card bordered={false} hoverable>
//                 <Title level={5}>Customer First</Title>
//                 <Text type="secondary">
//                   We prioritize user experience and long-term trust in every
//                   decision.
//                 </Text>
//               </Card>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Card bordered={false} hoverable>
//                 <Title level={5}>Quality Assurance</Title>
//                 <Text type="secondary">
//                   Every product is vetted to meet our quality and reliability
//                   standards.
//                 </Text>
//               </Card>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Card bordered={false} hoverable>
//                 <Title level={5}>Innovation</Title>
//                 <Text type="secondary">
//                   We continuously evolve using modern technologies and best
//                   practices.
//                 </Text>
//               </Card>
//             </Col>
//           </Row>
//         </div>

//         <Divider />

//         {/* Closing */}
//         <div className="text-center max-w-3xl mx-auto">
//           <Title level={4}>Built for Modern Commerce</Title>
//           <Paragraph>
//             NovaGoods is designed to scale, perform, and adapt — giving customers
//             confidence and businesses the tools they need to grow.
//           </Paragraph>
//         </div>
//       </Content>
//     </Layout>
//   );
// };

// export default AboutUs;

import React from "react";
import { Layout, Typography, Row, Col, Card, Divider } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  RocketOutlined,
  GlobalOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import "./AboutUs.css";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const AboutUs = () => {
  const values = [
    { icon: <UserOutlined />, title: "Customer First", desc: "We prioritize user experience and long-term trust in every decision.", colorClass: "value-blue" },
    { icon: <HeartOutlined />, title: "Passion & Care", desc: "Every product and service is delivered with heart and attention.", colorClass: "value-pink" },
    { icon: <RocketOutlined />, title: "Fast Delivery", desc: "Ensuring your products reach you quickly and safely.", colorClass: "value-orange" },
    { icon: <GlobalOutlined />, title: "Global Reach", desc: "We aim to provide access to quality products worldwide.", colorClass: "value-green" },
    { icon: <BulbOutlined />, title: "Innovation", desc: "Continuously improving our platform and products.", colorClass: "value-purple" },
  ];

  return (
    <Layout>
      <Content className="about-container">
        {/* Header */}
        <div className="about-header">
          <Title level={2} className="about-title">About NovaGoods</Title>
          <Paragraph className="about-subtitle">
            NovaGoods is a modern e-commerce platform built to deliver trusted products, seamless experiences, and customer-centric innovation.
          </Paragraph>
        </div>

        {/* Mission / Vision */}
        <Row gutter={[32, 32]} className="about-mission-vision">
          <Col xs={24} md={12}>
            <Card bordered={false} className="hover-card">
              <Title level={4}>Our Mission</Title>
              <Paragraph>
                To simplify online shopping by offering reliable products, transparent pricing, and a smooth purchasing experience for everyone.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card bordered={false} className="hover-card">
              <Title level={4}>Our Vision</Title>
              <Paragraph>
                To become a globally trusted e-commerce ecosystem that empowers customers and businesses through technology.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Core Values */}
        <div className="about-values">
          <Title level={3} className="about-values-title">Our Core Values</Title>
          <Row gutter={[24, 24]} justify="center">
            {values.map((val, idx) => (
              <Col xs={24} sm={12} md={8} key={idx}>
                <Card bordered={false} hoverable className="hover-card text-center">
                  <div className={`value-icon ${val.colorClass}`}>
                    {val.icon}
                  </div>
                  <Title level={5}>{val.title}</Title>
                  <Text type="secondary">{val.desc}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Divider />

        {/* Closing */}
        <div className="about-closing">
          <Title level={4}>Built for Modern Commerce</Title>
          <Paragraph>
            NovaGoods is designed to scale, perform, and adapt — giving customers confidence and businesses the tools they need to grow.
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
};

export default AboutUs;
