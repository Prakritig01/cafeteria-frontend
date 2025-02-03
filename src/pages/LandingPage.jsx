import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Welcome from "@/components/Welcome";
import Cuisines from "@/components/Cuisines";
import { useDispatch } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <div className="landing-page-component bg-[#f9f9f9]">
        {/* Background Image Section */}
        <div className="background-photo h-[70vh] w-full relative">
          <img
            src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* App Name Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-7xl md:text-8xl font-bold text-roboto text-white tracking-wide 
              drop-shadow-2xl animate-fade-in">
              CAFETERIA
            </h1>
            <p className="text-xl md:text-2xl text-white mt-4 font-semibold 
              drop-shadow-lg">
              Discover Your Perfect Meal
            </p>
          </div>
        </div>
        {/* Pick Your Meal Button */}
        <div
          className="pick-your-meal-btn text-center relative"
          style={{ top: "-4vh" }}
        >
          <button
            className="p-5 rounded-2xl bg-red-100 font-bold text-xl cursor-pointer transition transform hover:scale-105 hover:bg-red-200"
            onClick={handleNavigate}
          >
            Pick your meal
          </button>
        </div>

        {/* Other Components */}
        <HowItWorks />
        <Welcome />
        <Cuisines />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
