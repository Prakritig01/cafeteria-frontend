import React from 'react';

const SmallDishCard = ({ image }) => {
  return (
    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-200 rounded-full flex justify-center items-center hover:scale-110 transition-all duration-300 shadow-lg">
      <img
        src={image} // Replace with actual image URL
        alt="Dish"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default SmallDishCard;
