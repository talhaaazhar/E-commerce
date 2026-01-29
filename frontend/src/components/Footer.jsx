import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <footer className="bg-gray-900 text-gray-200 mt-auto">
    {/* // <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200"> */}

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Customer Service */}
        <div>
          <h3 className="font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Returns</li>
            <li>Shipping Policy</li>
            <li>Showrooms</li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-bold mb-4">Account</h3>
          <ul className="space-y-2">
            <li>My Account</li>
            <li>Order Status</li>
            <li>Wishlist</li>
            <li><Link to="/cart">My Cart</Link></li>
            <li>Newsletter</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-bold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>Learning Center</li>
            <li>Affiliate Programs</li>
            <li>Special Pricing</li>
            <li>Savings</li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="font-bold mb-4">Company Info</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Corporate Information</li>
            <li>Site Map</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
        <p>(+92) 304-3212345 | support@NovaGoods.com</p>
        <p>751 Lakecity Commons Newport News, VA 23606</p>
        <p>©2026 NovaGoods Enterprises, LLC. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
