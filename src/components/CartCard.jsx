import { BASE_URL } from "@/utils/apiConfig";
import React from "react";
import { useDispatch } from "react-redux";
import { setCart, setLoading } from "@/slices/cartSlice";
import axios from "axios";

const CartCard = ({ dish, quantity, loading }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = async (itemId, increment) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.patch(`${BASE_URL}/cart/${itemId}`, {
        increment: increment,
      });
      const updatedCart = response.data.cart;
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
      const response = await axios.delete(`${BASE_URL}/cart/${itemId}`);
      const updatedCart = response.data.cart;
      dispatch(setCart(updatedCart));
    } catch (err) {
      console.log("Error in deleting cart card", err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="cart-item card w-72 h-auto p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h4 className="text-lg font-semibold text-center text-gray-800">
        {dish.name}
      </h4>
      <p className="text-center text-gray-600">{dish.price}</p>

      <div className="button-div flex justify-center items-center gap-4 mt-2">
        

       
        {/* Conditional Rendering for Minus/Delete Button */}
        {quantity > 1 ? (
          <button onClick={() => handleUpdateQuantity(dish._id, -1)} disabled={loading}>
            <i className="fi fi-rs-minuss"></i>
          </button>
        ) : (
          <button onClick={() => handleDeleteCartCard(dish._id)} disabled={loading}>
            <i className="fi fi-rs-trash"></i>
          </button>
        )}

         {/* Quantity */}
         <span className="text-center text-gray-600"> {quantity}</span>

        {/* Plus Button */}
        <button onClick={() => handleUpdateQuantity(dish._id, 1)} disabled={loading}>
          <i className="fi fi-rr-plus"></i>
        </button>

        <button onClick={()=>handleDeleteCartCard(dish._id)} disabled={loading}>Remove dish</button>
      </div>
    </div>
  );
};

export default CartCard;
