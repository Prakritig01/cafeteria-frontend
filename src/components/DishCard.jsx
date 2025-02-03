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

  const isItemInCart = (dish) => {
    return cartItems.some((item) => item.dish._id === dish._id);
  };

  const handleAddToCart = async (dish) => {
    try {
      const dishResponse = await axios.post(
        `${BASE_URL}/cart`,
        { dish },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("dishResponse", dishResponse);
      dispatch(setCart(dishResponse.data.cart));
      console.log("Dish added to cart", dishResponse.data);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      const dishId = id;
      const response = await axios.delete(`${BASE_URL}/dishes/${dishId}`);
      dispatch(deleteDish(response.data.dish));
      console.log("Dish deleted successfully", response.data);
    } catch (error) {
      console.error("Failed to delete dish", error);
    }
  };

  const handleEditDish = () => {
    setIsEditModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false); // Close the modal
  };

  const navigateToCart = () => {
    navigate("/cart");
  };
  return (
    <div
      key={dish._id}
      className="dish card flex flex-col w-72 h-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex justify-between items-center text-white">
            <span className="bg-slate-800/80 px-3 py-1 rounded-full text-sm">
              {dish.category.toUpperCase()}
            </span>
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full">
              <div
                className={`w-2 h-2 rounded-full ${
                  dish.inStock ? "bg-green-400" : "bg-red-400"
                }`}
              />
              <span className="text-sm">
                {dish.inStock ? "Available" : "Sold Out"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-3">
          <h4 className="text-xl font-semibold text-slate-800 mb-1 font-serif">
            {dish.name}
          </h4>
          <p className="text-slate-600 text-sm line-clamp-2 mb-2">
            {dish.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">
              ₹{dish.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-div ">
          <div className="flex items-center justify-between border-t pt-3 ">
            <button
              onClick={() =>
                isItemInCart(dish) ? navigateToCart() : handleAddToCart(dish)
              }
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                isItemInCart(dish)
                  ? "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isItemInCart(dish) ? "View Cart" : "Add to Cart"}
            </button>

            <div className="flex gap-2 ml-3">
              <button
                onClick={handleEditDish}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <i className="fi fi-rr-edit text-sm" />
              </button>
              <button
                onClick={() => handleDeleteDish(dish._id)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <i className="fi fi-rs-trash text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditDishModal dish={dish} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default DishCard;
