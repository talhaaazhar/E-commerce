import React from "react";

const AboutUs = () => {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">About NovaGoods</h1>

        <p className="text-lg mb-6">
          Welcome to <strong>NovaGoods</strong>, your go-to destination for high-quality products at affordable prices. 
          Our mission is to provide a seamless shopping experience for our customers with a wide range of products.
        </p>

        <p className="text-lg mb-6">
          At NovaGoods, we value transparency, quality, and customer satisfaction above all else. 
          Our team is dedicated to sourcing the best products and delivering them directly to your doorstep.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Customer-first approach</li>
          <li>High-quality products</li>
          <li>Fast and reliable shipping</li>
          <li>Ethical sourcing and sustainability</li>
          <li>Continuous improvement and innovation</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-lg mb-6">
          Our team consists of passionate professionals dedicated to creating an amazing shopping experience. 
          We believe in collaboration, transparency, and making a positive impact through our work.
        </p>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">© 2026 NovaGoods Enterprises, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;


// import React from "react";
// import { Layout, Typography, Row, Col, Card, Divider } from "antd";
// import {
//   UserOutlined,
//   HeartOutlined,
//   RocketOutlined,
//   GlobalOutlined,
//   BulbOutlined,
// } from "@ant-design/icons";
// import "./AboutUs.css"; // We'll add custom CSS for dark/light modes

// const { Title, Paragraph, Text } = Typography;
// const { Content } = Layout;

// const AboutUs = () => {
//   return (
//     <Layout className="about-layout">
//       <Content className="about-content">
//         {/* Header */}
//         <div className="about-header">
//           <Title className="about-title">About NovaGoods</Title>
//           <Divider className="about-divider" />
//         </div>

//         {/* Mission */}
//         <Paragraph className="about-paragraph">
//           Welcome to <Text strong>NovaGoods</Text>, your go-to destination for high-quality products at affordable prices. 
//           Our mission is to provide a seamless shopping experience for our customers with a wide range of products.
//         </Paragraph>

//         <Paragraph className="about-paragraph">
//           At NovaGoods, we value transparency, quality, and customer satisfaction above all else. 
//           Our team is dedicated to sourcing the best products and delivering them directly to your doorstep.
//         </Paragraph>

//         {/* Our Values */}
//         <div className="about-values">
//           <Title level={2} className="section-title">Our Values</Title>
//           <Row gutter={[24, 24]} justify="center">
//             {[
//               { icon: <UserOutlined />, title: "Customer-first", desc: "Putting our customers at the center of everything we do.", color: "#1890ff" },
//               { icon: <HeartOutlined />, title: "High-quality products", desc: "We carefully select products for durability and value.", color: "#eb2f96" },
//               { icon: <RocketOutlined />, title: "Fast & reliable shipping", desc: "Ensuring your products reach you quickly and safely.", color: "#fa8c16" },
//               { icon: <GlobalOutlined />, title: "Ethical sourcing", desc: "Committed to sustainable and responsible practices.", color: "#52c41a" },
//               { icon: <BulbOutlined />, title: "Innovation", desc: "Continuously improving and innovating for a better shopping experience.", color: "#722ed1" },
//             ].map((item, idx) => (
//               <Col xs={24} sm={12} md={8} key={idx}>
//                 <Card
//                   className="value-card"
//                   hoverable
//                   style={{ borderRadius: 12, textAlign: "center" }}
//                 >
//                   <div className="value-icon" style={{ color: item.color }}>{item.icon}</div>
//                   <Title level={4} className="value-title">{item.title}</Title>
//                   <Paragraph className="value-desc">{item.desc}</Paragraph>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         {/* Team */}
//         <div className="about-team">
//           <Title level={2} className="section-title">Our Team</Title>
//           <Paragraph className="about-paragraph">
//             Our team consists of passionate professionals dedicated to creating an amazing shopping experience. 
//             We believe in collaboration, transparency, and making a positive impact through our work.
//           </Paragraph>
//         </div>

//         {/* Footer */}
//         <div className="about-footer">
//           <Text>© 2026 NovaGoods Enterprises, LLC. All Rights Reserved.</Text>
//         </div>
//       </Content>
//     </Layout>
//   );
// };

// export default AboutUs;
