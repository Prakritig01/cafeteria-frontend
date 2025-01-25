import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";
import { setCounter, setLoading } from "./../slices/counterSlice";
import { selectAllCounters } from "@/slices/counterSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const fetchCounter = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/counter`);
      const { counters } = response.data;
      console.log(counters);
      dispatch(setCounter(counters));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
    fetchCounter();
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Counters</h1>
      </div>
    </div>
  );
};

export default HomePage;
