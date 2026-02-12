import React from "react";
import { Layout, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import "./NotFound.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const NotFound = () => {
  return (
    <Layout className="notfound-layout">
      <Content className="notfound-content">
        <div className="notfound-container">
          <Title level={1} className="notfound-code">404</Title>
          <Title level={3} className="notfound-title">Page Not Found</Title>
          <Paragraph className="notfound-text">
            Sorry, the page you are looking for does not exist or has been moved.
          </Paragraph>
          <Link to="/">
            <Button type="primary" size="large">
              Go Back Home
            </Button>
          </Link>
        </div>
      </Content>
    </Layout>
  );
};

export default NotFound;
