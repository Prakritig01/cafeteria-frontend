import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { selectTotalQuantity } from "@/slices/cartSlice";
import { selectCurrentUser } from "@/slices/authSlice";
import { ROLE } from "@/constants";

const Navbar = () => {
  const quantity = useSelector(selectTotalQuantity);
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  const isLandingPage = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active style for NavLinks
  const getNavLinkStyle = ({ isActive }) => {
    const borderColor = isLandingPage ? "border-white" : "border-blue-500";
    return isActive
      ? `border-b-2 ${borderColor} px-4 py-2 text-xl`
      : "px-4 py-2 text-xl";
  };

  return (
    <>
      <div
        className={`navbar ${
          isLandingPage ? "absolute" : "fixed"
        } top-0 left-0 w-full flex items-center justify-between px-4 py-2 z-50 ${
          isLandingPage
            ? "bg-transparent text-white"
            : "bg-white text-gray-800 shadow-md"
        }`}
      >
        {/* Left part */}
        <div className="left-part">
          <h3 className="text-lg font-bold">
            <NavLink to="/">Palate Voyager</NavLink>
          </h3>
        </div>

        {/* Middle part - Desktop */}
        <div className="middle-part hidden md:flex space-x-4">
          {user?.role === ROLE.CUSTOMER && (
            <NavLink to="/home" className={getNavLinkStyle}>
              Food Counter
            </NavLink>
          )}

          <NavLink to="/profile" className={getNavLinkStyle}>
            Profile
          </NavLink>

          {user?.role === ROLE.ADMIN && (
            <NavLink to="/users" className={getNavLinkStyle}>
              Users
            </NavLink>
          )}

          {user?.role === ROLE.MERCHANT && (
            <NavLink to="/merchant" className={getNavLinkStyle}>
              Merchant Panel
            </NavLink>
          )}

          {user?.role === ROLE.ADMIN && (
            <NavLink to="/admin" className={getNavLinkStyle}>
              Admin Panel
            </NavLink>
          )}
        </div>

        {/* Right part */}
        <div className="right-part hidden md:flex items-center space-x-4">
          {user?.role === ROLE.CUSTOMER && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative px-4 py-2 text-2xl  ${
                  isActive
                    ? `border-b-2 ${
                        isLandingPage ? "border-white" : "border-blue-500"
                      }`
                    : ""
                }`
              }
            >
              <i className="fi fi-rs-shopping-cart"></i>
              <span className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full transform translate-x-2 -translate-y-2">
                {quantity}
              </span>
            </NavLink>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-700 bg-gray-200 rounded px-2 py-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰ Menu
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden absolute top-16 left-0 w-full shadow-lg z-50 bg-gray-100`}
        >
          <div className="flex flex-col space-y-4 p-4">
            {user?.role === ROLE.CUSTOMER && (
              <NavLink to="/home" className={getNavLinkStyle}>
                Food Counter
              </NavLink>
            )}

            <NavLink to="/profile" className={getNavLinkStyle}>
              Profile
            </NavLink>

            {user?.role === ROLE.ADMIN && (
              <NavLink to="/users" className={getNavLinkStyle}>
                Users
              </NavLink>
            )}

            {user?.role === ROLE.MERCHANT && (
              <NavLink to="/merchant" className={getNavLinkStyle}>
                Merchant Panel
              </NavLink>
            )}

            {user?.role === ROLE.ADMIN && (
              <NavLink to="/admin" className={getNavLinkStyle}>
                Admin Panel
              </NavLink>
            )}

            {/* Cart in mobile */}
            {/* Cart in mobile */}
            {user?.role === ROLE.CUSTOMER && (
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `flex items-center relative px-4 py-2 text-2xl ${
                    isActive
                      ? `border-b-2 ${
                          isLandingPage ? "border-white" : "border-blue-500"
                        }`
                      : ""
                  }`
                }
              >
                <div className="relative">
                  <i className="fi fi-rs-shopping-cart"></i>
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                    {quantity}
                  </span>
                </div>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
