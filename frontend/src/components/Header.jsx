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
                // onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(e); }}
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

// import React, { useState, useEffect } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Input, Badge, Button, Dropdown, Menu } from "antd";
// import {
//   ShoppingCartOutlined,
//   MenuOutlined,
//   CloseOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";

// const { Search } = Input;

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Sync search term with URL
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const search = queryParams.get("search") || "";
//     setSearchTerm(search);
//   }, [location.search]);

//   // Auto-navigate when searchTerm changes
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       if (searchTerm.trim() !== "") {
//         navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
//       } else {
//         navigate("/products");
//       }
//     }, 200);

//     return () => clearTimeout(handler);
//   }, [searchTerm, navigate]);

//   // Redux cart
//   const cart = useSelector((state) => state.cart.items);
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   // Mobile menu items
//   const mobileMenu = (
//     <Menu className="dark:bg-gray-800">
//       <Menu.Item key="home">
//         <Link to="/">🏠 Home</Link>
//       </Menu.Item>
//       <Menu.Item key="shop">
//         <Link to="/products">🛍️ Shop</Link>
//       </Menu.Item>
//       <Menu.Item key="about">
//         <Link to="/about">ℹ️ About Us</Link>
//       </Menu.Item>
//       <Menu.Item key="contact">
//         <a href="#">📞 Contact</a>
//       </Menu.Item>
//       <Menu.Item key="cart">
//         <Link to="/cart">
//           Cart <Badge count={cartCount} />
//         </Link>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <header className="bg-gray-900 shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex-shrink-0 text-lg sm:text-2xl font-bold text-gray-300"
//           >
//             NovaGoods
//           </Link>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-md mx-2 sm:mx-4">
//             <Search
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               enterButton={<SearchOutlined />}
//               className="rounded-lg"
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-4">
//             <Link className="text-gray-300 hover:text-red-600" to="/">
//               Home
//             </Link>
//             <Link className="text-gray-300 hover:text-red-600" to="/products">
//               Shop
//             </Link>
//             <Link className="text-gray-300 hover:text-red-600" to="/about">
//               About Us
//             </Link>
//             <a className="text-gray-300 hover:text-red-600" href="#">
//               Contact
//             </a>

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="relative text-gray-300 hover:text-white"
//             >
//               <Badge count={cartCount} offset={[0, 0]}>
//                 <ShoppingCartOutlined style={{ fontSize: "20px" }} />
//               </Badge>
//             </Link>

//             {/* Sign In */}
//             <Button type="primary" className="bg-red-600 hover:bg-red-700">
//               Sign In
//             </Button>
//           </nav>

//           {/* Mobile Menu Button */}
//           <Dropdown
//             overlay={mobileMenu}
//             trigger={["click"]}
//             visible={isMenuOpen}
//             onVisibleChange={(flag) => setIsMenuOpen(flag)}
//           >
//             <Button
//               className="md:hidden"
//               icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
//             />
//           </Dropdown>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
