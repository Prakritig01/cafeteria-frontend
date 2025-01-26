import React from "react";
import { selectItemFromCart, setCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";

const DishCard = ({ dish}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectItemFromCart);
    const isItemInCart = (dish) => {
        return cartItems.some((item) => item._id === dish._id);
      };
    
      const handleAddToCart = async (dish) => {
        try {
          const dishResponse = await axios.post(`${BASE_URL}/cart`, { dish });
          dispatch(setCart(dishResponse.data.cart));
          console.log("Dish added to cart", dishResponse.data);
        } catch (error) {
          console.error("Failed to add item to cart", error);
        }
      };
  return (
    <div
      key={dish._id}
      className="dish card w-72 h-auto p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      {/* Image Section */}
      <img
        src={dish.image} // Assuming dish.image contains the URL
        alt={dish.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h4 className="text-lg font-semibold text-center text-gray-800">
        {dish.name}
      </h4>
      <p className="text-center text-gray-600">{dish.price}</p>
      <p className="text-center text-gray-500">{dish.description}</p>
      <p className="text-center text-gray-500">
        {dish.inStock ? "In Stock" : "Out of Stock"}
      </p>
      {isItemInCart(dish) ? (
        <span className="text-green-600 font-semibold">Added</span>
      ) : (
        <button
          onClick={() => handleAddToCart(dish)}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default DishCard;
