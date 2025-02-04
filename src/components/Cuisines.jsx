import React from 'react';
import BigDishCard from '@/components/BigDishDemoCard';
import CuisineCard from '@/components/CuisineCard';
import SmallDishCard from '@/components/SmallDishDemoCard';

const Cuisines = () => {
  return (
    <div className="p-8 bg-[#f9f9f9]">
      {/* Main heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mt-12 mb-8">Cuisines</h2>

      {/* Cuisine Variants (hover effect) */}
      <div className="flex flex-wrap justify-center mb-16 gap-6">
        <CuisineCard cuisine="Italian" />
        <CuisineCard cuisine="Indian" />
        <CuisineCard cuisine="Mexican" />
        <CuisineCard cuisine="Chinese" />
      </div>

      {/* Big Dish Card */}
      <div className="mb-16">
        <BigDishCard />
      </div>

      {/* Small Dish Cards with dynamic image links */}
      <div className="p-7">
        <div className="flex flex-wrap justify-center gap-8">
          <SmallDishCard image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Pizzas.png" />
          <SmallDishCard image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/897bc750-6b57-4e7d-9365-87c1ab2c6d7e_Chinese2.png" />
          <SmallDishCard image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_cake.png" />
          <SmallDishCard image="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_coffee.png" />
        </div>
      </div>
    </div>
  );
};

export default Cuisines;
