import React from 'react';

const CuisineCard = ({ cuisine }) => {
  return (
    <div className="w-45 p-4 border bg-white rounded-full hover:bg-gray-900 hover:text-white hover:shadow-xl hover:scale-105 transform transition-all duration-300  shadow-lg">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 hover:text-white">{cuisine}</h3>
        {/* Add an image here as needed */}
      </div>
    </div>
  );
};

export default CuisineCard;
