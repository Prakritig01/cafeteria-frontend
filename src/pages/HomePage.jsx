import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";
import {
  setCounter,
  setCurrentCounter,
  setLoading,
  selectAllCounters,
  selectLoading,
} from "./../slices/counterSlice";
import { useNavigate } from "react-router-dom";
import CounterList from "@/components/CounterList";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import NavbarLayout from "@/components/NavbarLayout";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCounter = async () => {
    const token = localStorage.getItem("token");
    try {
      dispatch(setLoading(true)); // Set loading to true before fetching data
      const response = await axios.get(`${BASE_URL}/counter` ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { counters } = response.data;
      dispatch(setCounter(counters));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); // Set loading to false after fetching data
    }
  };

  const counters = useSelector(selectAllCounters);
  const isLoading = useSelector(selectLoading); // Get loading state
  // console.log("counters", counters);

  useEffect(() => {
    fetchCounter();
  }, []);

  const handleCardClick = (counter) => {
    dispatch(setCurrentCounter(counter)); // Set the current counter name
    navigate(`/counter/${counter._id}`); // Navigate to the counter page
  };

  return (
    <div className="home-page py-6 px-4 mt-11">
      <div className="counter-container max-w-52-lg mx-auto p-5">
        <h1 className="text-4xl font-bold text-center mb-6">Counters</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <CircularProgress />
          </div>
        ) : (
          <CounterList
            counters={counters}
            isLoading={isLoading}
            handleCardClick={handleCardClick}
          />
        )}
      </div>
    </div>
  );
};

export default function (){
  return <>
  <NavbarLayout>
    <HomePage />
  </NavbarLayout>
  </>
}


