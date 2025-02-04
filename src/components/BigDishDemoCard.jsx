import React from "react";

const BigDishDemoCard = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg p-8 w-[90%] mx-auto">
      {/* Left side with image */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1698867575634-d39ef95fa6a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image URL
          alt="Dish"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right side with description */}
      <div className="w-full lg:w-1/2 lg:pl-8 flex flex-col justify-center items-center text-center lg:text-left">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Veggie & Tofu Salad Bowl</h3>
        <p className="text-base sm:text-lg text-gray-600">
          A vibrant and nutritious salad bowl packed with fresh veggies, hearty tofu, and a healthy dose of protein.
          This dish is perfect for those who want a refreshing yet filling meal, topped with a tangy dressing and a mix of flavorful spices.
        </p>
      </div>
    </div>
  );
};

export default BigDishDemoCard;
