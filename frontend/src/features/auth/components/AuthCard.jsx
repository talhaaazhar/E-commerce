import { Card } from "antd";

const AuthCard = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <Card
        title={title}
        className="w-full max-w-md shadow-lg"
        bordered={false}
      >
        {children}
      </Card>
    </div>
  );
};

export default AuthCard;
