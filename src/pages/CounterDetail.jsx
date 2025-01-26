import {
  selectAllDishes,
  selectCurrentCounter,
  setDishes,
  setLoading,
} from "@/slices/counterSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";

import DishCard from "@/components/DishCard";

const CounterPage = () => {
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const dishes = useSelector(selectAllDishes);
  const currentCounter = useSelector(selectCurrentCounter);




  const fetchDishes = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/dishes/counter/${counterId}`
      );
      const { dishes } = response.data;
      dispatch(setDishes(dishes));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="dishes-container py-6 px-4 w-full">
      <h3 className="text-3xl font-bold text-center mb-6">{currentCounter}</h3>

      <div className="dishes-wrapper mx-auto p-5 w-full">
        {dishes.length === 0 ? (
          <p className="text-center text-gray-600">
            No dishes available. Please add some!
          </p>
        ) : (
          <div className="dishes flex flex-wrap gap-6 justify-center p-6">
            {dishes.map((dish) => (
              <DishCard
                key={dish._id}
                dish={dish}
                
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterPage;
