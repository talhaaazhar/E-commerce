import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Divider } from "antd";
import "./Footer.css";

const Footer = () => {
  const cart = useSelector((state) => state.cart.items);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  return (
    <footer className="bg-gray-900 text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Row gutter={[32, 32]}>
          {/* Customer Service */}
          <Col xs={24} sm={12} md={6}>
            <h3 className="footer-title">Customer Service</h3>
            <ul className="space-y-2">
              <li className="footer-item">Help Center</li>
              <li className="footer-item">Contact Us</li>
              <li className="footer-item">Returns</li>
              <li className="footer-item">Shipping Policy</li>
              <li className="footer-item">Showrooms</li>
            </ul>
          </Col>

          {/* Account */}
          <Col xs={24} sm={12} md={6}>
            <h3 className="footer-title">Account</h3>
            <ul className="space-y-2">
              <li className="footer-item">My Account</li>
              <li className="footer-item">Order Status</li>
              <li className="footer-item">Wishlist</li>
              <li>
                <Link to="/cart" className="footer-link">
                  My Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
              </li>
              <li className="footer-item">Newsletter</li>
            </ul>
          </Col>

          {/* Resources */}
          <Col xs={24} sm={12} md={6}>
            <h3 className="footer-title">Resources</h3>
            <ul className="space-y-2">
              <li className="footer-item">Learning Center</li>
              <li className="footer-item">Affiliate Programs</li>
              <li className="footer-item">Special Pricing</li>
              <li className="footer-item">Savings</li>
            </ul>
          </Col>

          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <h3 className="footer-title">Company Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li className="footer-item">Careers</li>
              <li className="footer-item">Corporate Information</li>
              <li className="footer-item">Site Map</li>
            </ul>
          </Col>
        </Row>

        <Divider className="border-gray-700 mt-6" />

        <div className="text-center text-gray-400 text-sm space-y-1">
          <p>(+92) 304-3212345 | support@NovaGoods.com</p>
          <p>751 Lakecity Commons Newport News, VA 23606</p>
          <p>©2026 NovaGoods Enterprises, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
