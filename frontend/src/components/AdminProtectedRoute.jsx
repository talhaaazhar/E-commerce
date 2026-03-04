import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = ({ redirectPath = "/" }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth?.isAuthenticated;
  const user = auth?.user;
  const isAdmin = user?.role === "admin";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
