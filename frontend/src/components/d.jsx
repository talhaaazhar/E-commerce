// import React from "react";

// function ProductCard({ product }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-54 object-cover"
//       />
//       <div className="p-4 flex flex-col">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//           {product.name}
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">{product.description}</p>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">{product.category}</p>

//         <p className="text-gray-900 dark:text-gray-100 font-bold mt-2">${product.price}</p>

//         <button className="mt-4 bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-4 rounded" onClick={() => alert(`Added ${product.name} to cart!`)}>
//           Add to Cart 
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;


// import React, { useState } from "react";
// import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// const Header = () => {
//   return (
//     <header className="bg-gray-900 shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 text-lg sm:text-2xl font-bold text-gray-300">
//             NovaGoods
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-md mx-2 sm:mx-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-300"
//               />
//               <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-6">
//             <a href="#" className="text-gray-300 hover:text-red-600">
//               Home
//             </a>
//             <a href="#" className="text-gray-300 hover:text-red-600">
//               Shop
//             </a>
//             <a href="#" className="text-gray-300 hover:text-red-600">
//               About
//             </a>
//             <a href="#" className="text-gray-300 hover:text-red-600">
//               Contact
//             </a>
//           </nav>

//           {/* Right Section */}
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             {/* Cart */}
//             <button className="relative p-2 rounded-full hover:bg-gray-800">
//               <ShoppingCartIcon className="h-6 w-6 text-gray-300" />
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 0
//               </span>
//             </button>

//             {/* Account */}
//             <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
//               Sign In
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
