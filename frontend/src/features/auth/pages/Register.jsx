import { Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";

const { Text } = Typography;

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await register(values); // values now include phone
      message.success("Account created successfully");
      navigate("/");
    } catch {
      // error handled in hook
    }
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
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Phone number is required" },
            { min: 8, message: "Invalid phone number" },
          ]}
        >
          <Input placeholder="Your phone number" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password placeholder="Create password" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
        >
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
