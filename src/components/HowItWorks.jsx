import React from 'react';
import { FaUtensils, FaRegClipboard, FaShoppingCart } from 'react-icons/fa';

const InfoCard = ({ title, description, Icon }) => {
  return (
    <div
      className="w-full sm:w-80 h-auto sm:h-64 bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-red-100 hover:shadow-xl"
    >
      {/* Icon */}
      <div className="flex justify-center text-4xl sm:text-3xl text-red-600">
        <Icon />
      </div>

      {/* Content */}
      <div className="mt-4 text-center">
        <h5 className="text-lg sm:text-xl font-bold">{title}</h5>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="py-12 px-4 bg-[#f9f9f9] h-auto sm:h-[50vh]  flex flex-col items-center justify-center mt-0">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">How it works</h2>

      {/* Cards Container */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 flex-wrap">
        <InfoCard
          title="Pick a Cuisine"
          description="Choose your favorite cuisine to get started."
          Icon={FaUtensils}
        />
        <InfoCard
          title="Choose a Dish"
          description="Select a dish from the available options."
          Icon={FaRegClipboard}
        />
        <InfoCard
          title="Add to Cart"
          description="Add your chosen dishes to the cart."
          Icon={FaShoppingCart}
        />
      </div>
    </div>
  );
};

export default HowItWorks;
