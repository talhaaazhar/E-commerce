import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom"; 
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link , useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "";
    setSearchTerm(search);
  }, [location.search]);


  // const handleSearch = (e) => { 
  //   e.preventDefault(); 

  //   if (searchTerm.trim()!=="") {
  //     navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
  //   }
  //   else {
  //     navigate(`/products`);  
  //   }
  // };

  useEffect(() => {
  const handler = setTimeout(() => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/products");
    }
  }, 200); 

  return () => clearTimeout(handler); // cleanup previous timeout
}, [searchTerm]);


  // Geting cart from Redux
  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-lg sm:text-2xl font-bold text-gray-300">
            NovaGoods
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(e); }}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-300"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-red-600">Home</Link>
            <Link to="/products" className="text-gray-300 hover:text-red-600">Shop</Link>
            <Link to="/about" className="text-gray-300 hover:text-red-600">About Us</Link>
            <a href="#" className="text-gray-300 hover:text-red-600">Contact</a>
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
            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-800">
              <ShoppingCartIcon className="h-6 w-6 text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Sign In
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="px-4 pt-4 pb-2 space-y-2">
              <Link to="/" className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out">🏠 Home</Link>
              <Link to="/products" className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out">🛍️ Shop</Link>
              <Link to="/about" className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out">ℹ️ About Us</Link>
              <a href="#" className="block px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out">📞 Contact</a>
            </nav>
            <div className="px-4 pt-2 pb-4 border-t border-gray-600">
              <Link to="/cart" className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out mb-2">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Cart ({cartCount})
              </Link>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
