import {
  selectAllDishes,
  selectCurrentCounter,
  selectLoading,
  setCurrentCounter,
  setDishes,
  setLoading,
} from "@/slices/counterSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";

import DishCard from "@/components/DishCard";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import NavbarLayout from '@/components/NavbarLayout'

const CounterPage = () => {
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const dishes = useSelector(selectAllDishes);
  const currentCounter = useSelector(selectCurrentCounter);
  const isLoading = useSelector(selectLoading);
  console.log("currentCounter", currentCounter);
  console.log("counterId", counterId);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
  
      const [counterResponse, dishesResponse] = await Promise.all([
        axios.get(`${BASE_URL}/counter/${counterId}`),
        axios.get(`${BASE_URL}/dishes/counter/${counterId}`),
      ]);
  
      const { counter } = counterResponse.data;
      const { dishes } = dishesResponse.data;
  
      dispatch(setCurrentCounter(counter));
      dispatch(setDishes(dishes));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    fetchData();
    return () => {
      // Cleanup: Reset states on unmount
      dispatch(setDishes([]));
      dispatch(setCurrentCounter(null));  // Assuming you want to reset currentCounter as well
    };
  }, [counterId]);  // Added counterId as a dependency if it might change
  

  return (
    <div className="dishes-container py-6 px-4 w-full flex flex-col">
      {/* Show loading spinner if data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <>
          {/* Check if currentCounter is available */}
          {currentCounter ? (
            <h3 className="text-3xl font-bold text-center mb-6">{currentCounter.name}</h3>
          ) : (
            <p className="text-center text-gray-600">Counter information is not available.</p>
          )}
  
          <div className="add-dish-btn border text-end mr-[15px]">
            <button className="btn btn-primary">Add dish</button>
          </div>
  
          <div className="dishes-wrapper mx-auto p-5 w-full">
            {dishes.length === 0 ? (
              <p className="text-center text-gray-600">
                No dishes available. Please add some!
              </p>
            ) : (
              <div className="dishes flex flex-wrap gap-6 justify-center p-6">
                {dishes.map((dish) => (
                  <DishCard key={dish._id} dish={dish} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
  
};

export default function (){
  return <>
  <NavbarLayout>
    <CounterPage />
  </NavbarLayout>
  </>
}
