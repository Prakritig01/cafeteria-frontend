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
const loading  = useSelector(selectLoading);
const dispatch = useDispatch();

  return (
    <div className="CartPage py-6 px-4 mt-11">
      <h3 className="text-2xl font-bold text-center mb-6">Cart Page</h3>

      {loading ? (
        // Show loading spinner when loading is true
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        // Show cart items when loading is false
        <div className="cart-items flex flex-wrap justify-center gap-4 p-4">
          {cartItems.length > 0 ? (
            cartItems.map(
              (item, index) =>
                item.dish && (
                  <CartCard
                    key={item.dish.id || `cart-item-${index}`}
                    dish={item.dish}
                    quantity={item.quantity}
                  />
                )
            )
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
      )}
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
