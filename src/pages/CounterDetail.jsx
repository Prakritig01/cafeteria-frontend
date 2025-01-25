import { selectAllDishes, selectCurrentCounter, setDishes, setLoading } from "@/slices/counterSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";

const CounterPage = () => {
  const { counterId } = useParams();
  console.log("counterId", counterId);
  const dispatch = useDispatch();
  const dishes = useSelector(selectAllDishes);
  const currentCounter = useSelector(selectCurrentCounter);

  const fetchDishes = async () => {
    try {
      dispatch(setLoading(true));

      // Fetch dishes based on the counter ID
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

  console.log("dishesFromSlice", dishes);

  return (
    <div className="dishes-container py-6 px-4 w-full ">
      <h3 className="text-3xl font-bold text-center mb-6">{currentCounter}</h3>

      <div className="dishes-wrapper  mx-auto p-5  w-full">
        {dishes.length === 0 ? (
          <p className="text-center text-gray-600">No dishes available. Please add some!</p>
        ) : (
          <div className="dishes flex flex-wrap gap-6 justify-center   p-6">
            {dishes.map((dish) => (
              <div
                key={dish._id}
                className="dish card w-72 h-auto  p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer "
              >
                {/* Image Section */}
                <img
                  src={dish.image} // Assuming dish.image contains the URL
                  alt={dish.name}
                  className="w-full h-48 object-cover rounded-lg mb-4" // Tailwind classes for image styling
                />
                <h4 className="text-lg font-semibold text-center text-gray-800">{dish.name}</h4>
                <p className="text-center text-gray-600">{dish.price}</p>
                <p className="text-center text-gray-500">{dish.description}</p>
                <p className="text-center text-gray-500">{dish.inStock ? "In Stock" : "Out of Stock"}</p>
                <button className="button border">Add to cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterPage;
