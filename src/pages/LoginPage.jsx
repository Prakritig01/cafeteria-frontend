import {
  setCurrentUser,
  selectCurrentUser,
  selectLoading,
} from "@/slices/authSlice";
import { BASE_URL } from "@/utils/apiConfig";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { setCart } from "@/slices/cartSlice";
import { NavLink } from "react-router-dom";

export function Auth() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const loading = useSelector(selectLoading);

  if (loading) {
    // return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    return;
  }
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Branding Section */}
      <div className="mb-8 text-center">
        <NavLink
          to="/"
          className="inline-block text-gray-800 hover:underline text-lg"
        >
          <h1 className="text-4xl font-bold text-gray-800">Palate Voyager</h1>
        </NavLink>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Login to Your Account
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
