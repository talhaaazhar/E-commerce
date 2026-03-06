import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../features/auth/authSlice";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "";
    setSearchTerm(search);
  }, [location.search]);

  useEffect(() => {
    // Only navigate if we're already on the products page or if there's a search term
    const isOnProductsPage = location.pathname === "/admin/products";
    
    if (!isOnProductsPage && !searchTerm.trim()) {
      // Don't navigate away from other pages when search is empty
      return;
    }

    const handler = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        navigate(`/admin/products?search=${encodeURIComponent(searchTerm.trim())}`);
      } else if (isOnProductsPage) {
        // Only clear search if already on products page
        navigate("/admin/products");
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm, navigate, location.pathname]);

  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const isAuthenticated = auth?.isAuthenticated;
  const displayName = user?.name || user?.full_name || user?.email || user?.username;

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/admin" className="flex-shrink-0 text-lg sm:text-2xl font-bold text-gray-300">
            NovaGoods Admin
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-300"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 mr-4">
            <Link to="/admin/orders" className="text-gray-300 hover:text-red-600">Orders</Link>
            <Link to="/admin/products" className="text-gray-300 hover:text-red-600">Products</Link>
            <Link to="/admin/discounts" className="text-gray-300 hover:text-red-600">Discounts</Link>
            <Link to="/admin/analytics" className="text-gray-300 hover:text-red-600">Analytics</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Logout
                </button>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-200 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                  <Cog6ToothIcon className="h-4 w-4 text-gray-300" />
                  {displayName || "Profile"}
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Search */}
            <div className="px-4 pt-4 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-300"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <nav className="px-4 pt-2 pb-2 space-y-2">
              <Link
                to="/admin/orders"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out"
              >
                📦 Orders
              </Link>
              <Link
                to="/admin/products"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out"
              >
                🛍️ Products
              </Link>
              <Link
                to="/admin/discounts"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out"
              >
                💸 Discounts
              </Link>
              <Link
                to="/admin/analytics"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out"
              >
                📊 Analytics
              </Link>
            </nav>
            <div className="px-4 pt-2 pb-4 border-t border-gray-600">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                  <Link
                    to="/admin/settings"
                    className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg text-center mt-2 flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
                  >
                    <Cog6ToothIcon className="h-4 w-4 text-gray-300" />
                    {displayName || "Profile"}
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;