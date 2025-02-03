import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectTotalQuantity } from "@/slices/cartSlice";
import { selectCurrentUser } from "@/slices/authSlice";
import {ROLE} from '@/constants';

const Navbar = () => {
  const quantity = useSelector(selectTotalQuantity);
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  // Check if the current route is the landing page
  const isLandingPage = location.pathname === "/";

  return (
    <div
      className={`navbar fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 z-10 ${
        isLandingPage ? "bg-transparent text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Left part */}
      <div className="left-part">
        <h3 className="text-lg font-bold">
          <Link to="/">Cafeteria</Link>
        </h3>
      </div>

      {/* Middle part */}
      <div className="middle-part hidden md:flex space-x-4">
      {user && user.role === ROLE.CUSTOMER && (
        <button className="px-4 py-2 text-xl">
          <Link to="/home">Food Counter</Link>
        </button>
      )}

        <button className="px-4 py-2 text-xl">
          <Link to="/profile">Profile</Link>
        </button>


        {user && user.role === ROLE.ADMIN && (
          <button className="px-4 py-2 text-xl">
            <Link to="/users">Users</Link>
          </button>
        )}

        {user && user.role === ROLE.MERCHANT && (<button className="px-4 py-2 text-xl">
          <Link to="/merchant">Merchant Panel</Link>
        </button>
        )}

        {user && user.role === ROLE.ADMIN && (
        <button className="px-4 py-2 text-xl">
          <Link to="/admin">Admin Panel</Link>
        </button>
        )}
      </div>

      {/* Right part */}
      <div className="right-part flex items-center space-x-4">
      {user && user.role === ROLE.CUSTOMER && (
        <button className="relative px-4 py-2 text-2xl">
          <Link to="/cart">
            <i className="fi fi-rs-shopping-cart"></i>
          </Link>
          {/* Cart count badge */}
          <span className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full transform translate-x-2 -translate-y-2">
            {quantity}
          </span>
        </button>
      )}
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
