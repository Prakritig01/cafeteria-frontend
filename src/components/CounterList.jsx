import React from "react";
import Box from "@mui/material/Box"; // You can remove this if no longer needed

const CounterList = ({ counters, handleCardClick }) => {
  
  return (
    <div className="counter-list">
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
                <h2 className="text-lg font-semibold text-center text-gray-800">
                  {counter.name}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterList;
