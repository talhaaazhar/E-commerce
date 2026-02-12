import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

const { Title, Text } = Typography;

const Login = () => {
  const onFinish = (values) => {
    console.log("Login Data:", values);
    // later → call backend API
  };

  return (
    <AuthCard title="Sign In">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>

        <Text className="block text-center mt-4">
          Don’t have an account? <Link to="/register">Register</Link>
        </Text>
      </Form>
    </AuthCard>
  );
};

export default Login;
