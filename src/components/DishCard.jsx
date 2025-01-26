import React from "react";
import { selectItemFromCart, setCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";
import { useState } from "react";
import EditDishModal from "./EditDishModal";
import { deleteDish } from "@/slices/counterSlice";
import { useNavigate } from "react-router-dom";

const DishCard = ({ dish }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItemFromCart);
  // console.log("cartItems", cartItems);
  const isItemInCart = (dish) => {
    // console.log("cartItems", cartItems);
    // console.log("dish", dish);

    return cartItems.some((item) => item.dish._id === dish._id);
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

  const handleDeleteDish = async (id) => {
    try{
        const dishId = id;
        const response = await axios.delete(`${BASE_URL}/dishes/${dishId}`);
        dispatch(deleteDish(response.data.dish));
        console.log("Dish deleted successfully", response.data);
    }
    catch(error){
        console.error("Failed to delete dish", error);
    }
  }

  const handleEditDish = () => {
    setIsEditModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false); // Close the modal
  };

  const navigateToCart = () => {
    navigate("/cart");
  }
  return (
    <div
      key={dish._id}
      className="dish card w-72 h-auto p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      {/* Image Section */}
      <img
        src={dish.image} // Assuming dish.image contains the URL
        alt={dish.name}
        className="w-full h-44 object-contain rounded-lg mb-4"
      />
      <h4 className="text-lg font-semibold text-center text-gray-800">
        {dish.name}
      </h4>
      <p className="text-center text-gray-600">{dish.price}</p>
      <p className="text-center text-gray-500">{dish.description}</p>
      <p className="text-center text-gray-500">{dish.category}</p>

      <p className="text-center text-gray-500">
        {dish.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <div className="button-div flex justify-evenly items-center  ">
      <button
  onClick={() => (isItemInCart(dish) ? navigateToCart() : handleAddToCart(dish))}
  className={`p-3 font-medium rounded-lg shadow-md transition-colors ${
    isItemInCart(dish)
      ? "bg-gray-400 cursor-pointer text-white hover:bg-gray-500"
      : "bg-blue-500 text-white hover:bg-blue-600"
  }`}
>
  {isItemInCart(dish) ? "Go to Cart" : "Add to Cart"}
</button>

        <button
          onClick={handleEditDish}
          className="p-3  bg-gray-600 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition-colors"
        >
          <i className="fi fi-rr-edit"></i>
        </button>

        <button
          onClick={() => handleDeleteDish(dish._id)}
          className="p-3  bg-red-400 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors"
        >
          <i className="fi fi-rs-trash"></i>
        </button>

        {/* Render the modal */}
        {isEditModalOpen && (
          <EditDishModal
            dish={dish} // Pass the current dish details to the modal
            onClose={handleModalClose} // Handle closing of the modal
          />
        )}
      </div>
    </div>
  );
};

export default DishCard;
