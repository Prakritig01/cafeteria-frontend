import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItemFromCart, selectLoading, setCart ,setLoading} from "@/slices/cartSlice"; // Import selectors
import CartCard from "@/components/CartCard"; // Import the CartCard component
import CircularProgress from "@mui/material/CircularProgress";
import NavbarLayout from "@/components/NavbarLayout";
import { BASE_URL } from "@/utils/apiConfig";
import axios from "axios";


const CartPage = () => {
  const cartItems = useSelector(selectItemFromCart);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
          Your Shopping Cart
        </h3>

        <div className="relative">
          {/* Blur effect and overlay during loading */}
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-10">
              <CircularProgress />
            </div>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 
            ${loading ? 'blur-sm pointer-events-none' : ''}`}>

            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartCard
                  key={item.dish._id || `cart-item-${index}`}
                  dish={item.dish}
                  quantity={item.quantity}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center space-x-4">
                  <svg 
                    className="w-12 h-12 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  <p className="text-xl text-gray-600 font-medium">
                    Your cart is empty. Start adding delicious dishes!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function () {
  return (
    <>
      <NavbarLayout>
        <CartPage />
      </NavbarLayout>
    </>
  );
}
