import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

const { Text } = Typography;

const Register = () => {
  const onFinish = (values) => {
    console.log("Register Data:", values);
  };

  return (
    <AuthCard title="Create Account">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password placeholder="Create password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Register
        </Button>

        <Text className="block text-center mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </Text>
      </Form>
    </AuthCard>
  );
};

export default Register;
