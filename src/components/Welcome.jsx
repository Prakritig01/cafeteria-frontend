import React from 'react';

const Welcome = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-white">
      {/* Left side with a landscape picture */}
      <div className="w-full sm:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cuisine"
          className="w-full h-auto object-cover shadow-lg"
        />
      </div>

      {/* Right side with welcome note */}
      <div className="w-full sm:w-1/2 pl-0 sm:pl-8 mt-4 sm:mt-0 flex flex-col justify-center items-center sm:items-start">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center sm:text-left">
          Welcome to Our Cafeteria
        </h2>
        <p className="text-base sm:text-lg text-gray-600 text-center sm:text-left">
          Welcome to our cafeteria! Here, you can explore various cuisine counters and choose dishes from a wide range of options. Whether you're craving Italian, Indian, or Mexican, we have something for every taste. Select your favorite cuisine, pick a dish, and enjoy your meal!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
