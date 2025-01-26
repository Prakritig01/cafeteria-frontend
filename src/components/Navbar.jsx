import { selectTotalQuantity } from "@/slices/cartSlice";
import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Navbar = () => {
  const quantity = useSelector(selectTotalQuantity);

  return (
    <div className="navbar flex items-center justify-between px-4 py-2  bg-gray-100">
      {/* Left part */}
      <div className="left-part">
        <h3 className="text-lg font-bold text-gray-800">Cafeteria</h3>
      </div>

      {/* Middle part */}
      <div className="middle-part hidden md:flex space-x-4">
        <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
          <Link to="/">Home</Link>
        </button>
        
        <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
          <Link to="/profile">Profile</Link>
        </button>
        <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
          <Link to="/users">Users</Link>
        </button>
      </div>

      {/* Right part */}
      <div className="right-part flex items-center space-x-4">
        <button
          className="relative px-4 py-2 text-2xl"
        >
          <Link to="/cart">
          <i className="fi fi-rs-shopping-cart"></i>
          </Link>
          {/* Cart count badge */}
          <span className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-2 -translate-y-2">
            {quantity}
          </span>
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          
        >
          Login
        </button>
      </div>

      {/* Mobile menu */}
      <div className="middle-part md:hidden">
        <button className="text-gray-700 bg-gray-200 rounded px-2 py-1">
          ☰ Menu
        </button>
      </div>
    </div>
  );
};

export default Navbar;
