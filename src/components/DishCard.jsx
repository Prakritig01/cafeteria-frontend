import React, { useState } from "react";
import { selectItemFromCart, setCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";
import EditDishModal from "./EditDishModal";
import { deleteDish } from "@/slices/counterSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "@/slices/authSlice";
import { ROLE } from "@/constants";
import { CircularProgress } from "@mui/material";

const DishCard = ({ dish }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItemFromCart);
  const user = useSelector(selectCurrentUser);

  const isItemInCart = (dish) => {
    return cartItems.some((item) => item.dish._id === dish._id);
  };

  const handleAddToCart = async (dish) => {
    setIsAddingToCart(true);
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
      dispatch(setCart(dishResponse.data.cart));
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleDeleteDish = async (id) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`${BASE_URL}/dishes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(deleteDish(response.data.dish));
    } catch (error) {
      console.error("Failed to delete dish", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditDish = () => setIsEditModalOpen(true);
  const handleModalClose = () => setIsEditModalOpen(false);
  const navigateToCart = () => navigate("/cart");

  return (
    <div
      key={dish._id}
      className="dish-card w-full sm:w-72 min-h-[400px] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white">
          <span className="bg-slate-800/80 px-3 py-1 rounded-full text-sm">
            {dish.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full">
            <div
              className={`w-2 h-2 rounded-full ${
                dish.inStock ? "bg-green-400" : "bg-red-400"
              }`}
            />
            <span className="text-sm">{dish.inStock ? "Available" : "Sold Out"}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-xl font-semibold text-slate-800 mb-1 font-serif">
          {dish.name}
        </h4>
        <p className="text-slate-600 text-sm line-clamp-3 mb-2 min-h-[60px]">
          {dish.description}
        </p>
        <span className="text-lg font-bold text-slate-900">₹{dish.price.toFixed(2)}</span>

        {/* Action Buttons */}
        <div className="mt-auto border-t pt-3 flex justify-between">
          {user && user.role === ROLE.CUSTOMER && (
            <button
              onClick={() =>
                isItemInCart(dish) ? navigateToCart() : handleAddToCart(dish)
              }
              disabled={isAddingToCart}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                isItemInCart(dish)
                  ? "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } disabled:opacity-75 disabled:cursor-not-allowed`}
            >
              {isAddingToCart ? (
                <div className="flex items-center justify-center gap-2">
                  <CircularProgress size={16} className="text-white" />
                  Adding...
                </div>
              ) : isItemInCart(dish) ? (
                "View Cart"
              ) : (
                "Add to Cart"
              )}
            </button>
          )}

          {user && user.role === ROLE.MERCHANT && (
            <div className="flex gap-2">
              <button
                onClick={handleEditDish}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <i className="fi fi-rr-edit text-sm" />
              </button>
              <button
                onClick={() => handleDeleteDish(dish._id)}
                disabled={isDeleting}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <CircularProgress size={16} className="text-slate-600" />
                ) : (
                  <i className="fi fi-rs-trash text-sm" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && <EditDishModal dish={dish} onClose={handleModalClose} />}
    </div>
  );
};

export default DishCard;
