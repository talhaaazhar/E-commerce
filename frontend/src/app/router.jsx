import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import ProductList from "../features/products/pages/ProductList";
import ProductDetails from "../features/products/pages/ProductDetails";
import CartPage from "../features/cart/pages/CartPage";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/about" element={<AboutUs />} />
      
   
    </Routes>
  );
}

export default AppRouter;
