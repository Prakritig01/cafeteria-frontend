import { BASE_URL } from "@/utils/apiConfig";
import React from "react";
import { useDispatch } from "react-redux";
import { setCart, setLoading } from "@/slices/cartSlice";
import axios from "axios";
import { setCurrentUser } from "@/slices/authSlice";

const CartCard = ({ dish, quantity, loading }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = async (itemId, increment) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.patch(`${BASE_URL}/cart/${itemId}`, {
        increment: increment,
      },{
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const updatedCart = response.data.cart;
      // dispatch(setCurrentUser(response.data.user));
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.log("Error in updating quantity", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteCartCard = async (itemId) => {
    try {
      dispatch(setLoading(true));
      console.log("Deleting cart card with id:", itemId);
      const response = await axios.delete(`${BASE_URL}/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Delete cart card response:", response);
      dispatch(setCart(response.data.cart || []));
    } catch (err) {
      console.log("Error in deleting cart card", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 max-w-xs">
      <div className="flex flex-col h-full p-3">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        
        <div className="flex-grow">
          <h4 className="text-base font-semibold text-gray-900 mb-1">
            {dish.name}
          </h4>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {dish.description}
          </p>
          <p className="text-base font-medium text-gray-700 mb-3">
            ₹{dish.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center space-x-2">
            {quantity > 1 ? (
              <button
                onClick={() => handleUpdateQuantity(dish._id, -1)}
                disabled={loading}
                className="p-1.5 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => handleDeleteCartCard(dish._id)}
                disabled={loading}
                className="p-1.5 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            
            <span className="text-base font-medium w-6 text-center">
              {quantity}
            </span>
            
            <button
              onClick={() => handleUpdateQuantity(dish._id, 1)}
              disabled={loading}
              className="p-1.5 border rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={() => handleDeleteCartCard(dish._id)}
            disabled={loading}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-xs">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
