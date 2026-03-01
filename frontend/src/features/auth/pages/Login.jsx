import { Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";

const { Text } = Typography;

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const user = await login(values);
      message.success("Login successful");
      
      // Redirect based on role
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      // error handled in hook
    }
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

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
        >
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
