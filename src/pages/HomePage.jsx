import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";
import { setCounter, setCurrentCounter, setLoading } from "./../slices/counterSlice";
import { selectAllCounters } from "@/slices/counterSlice";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCounter = async () => {
    try {
      dispatch(setLoading(true)); // Set loading to true before fetching data
      const response = await axios.get(`${BASE_URL}/counter`);
      const { counters } = response.data;
      dispatch(setCounter(counters));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); // Set loading to false after fetching data
    }
  };

  const counters = useSelector(selectAllCounters);
  const isLoading = useSelector((state) => state.counter.loading); // Get loading state

  useEffect(() => {
    fetchCounter();
  }, []);

  const handleCardClick = (counterId,counterName) => {
    // console.log("counterId", counterId);
    // console.log("counterName", counterName);
    dispatch(setCurrentCounter(counterName)); // Set the current counter ID
    navigate(`/counter/${counterId}`); // Navigates to the dishes page with the counter ID
  };

  return (
    <div className="home-page py-6 px-4">
      <div className="counter-container max-w-52-lg mx-auto p-5">
        <h1 className="text-4xl font-bold text-center mb-6">Counters</h1>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={210} height={118} sx={{ margin: 1 }} />
            ))}
          </Box>
        ) : (
          <div className="cards-wrapper">
            {counters.length === 0 ? (
              <p className="text-center text-gray-600">No counters available. Please add some!</p>
            ) : (
              <div className="boundary flex flex-wrap gap-6 justify-center">
                {counters.map((counter) => (
                  <div
                    key={counter._id}
                    onClick={() => handleCardClick(counter._id, counter.name)}
                    className="card w-40 h-28 border p-4 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex justify-center items-center"
                  >
                    <h2 className="text-lg font-semibold text-center text-gray-800">{counter.name}</h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
