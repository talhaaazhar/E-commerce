// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Pages
// import ProductList from "../features/products/pages/ProductList";
// import ProductDetails from "../features/products/pages/ProductDetails";
// import CartPage from "../features/cart/pages/CartPage";
// import Home from "../pages/Home/Home";
// import AboutUs from "../pages/AboutUs/AboutUs";
// // import AuthPage from "../features/auth/pages/Auth";
// import Login from "../features/auth/pages/Login";
// import Register from "../features/auth/pages/Register";
// function AppRouter() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<ProductList />} />
//       <Route path="/products/:id" element={<ProductDetails />} />
//       <Route path="/cart" element={<CartPage />} />
//       <Route path="/about" element={<AboutUs />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       {/* <Route path="/auth/:mode" element={<AuthPage />} /> */}
//       {/* <Route path="/auth/signin" element={<AuthPage />} /> */}

      
   
//     </Routes>
//   );
// }

// export default AppRouter;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import ProductList from "../features/products/pages/ProductList";
import ProductDetails from "../features/products/pages/ProductDetails";
import CartPage from "../features/cart/pages/CartPage";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRouter() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/about" element={<AboutUs />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
