import Cuisines from "@/components/Cuisines";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import React from "react";
import Footer from "@/components/Footer";

const LandingPage = () => {

  return (
    <>
      <Navbar />
      <div className="landing-page-component bg-[#f9f9f9]">
        <div className="background-photo h-[70vh] w-full">
          <img
            src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="pick-your-meal-btn text-center relative mb-0   "
          style={{ top: "-4vh" }}
        >
          <button className="p-5 rounded-4xl bg-red-100 font-bold text-xl cursor-pointer transition transform hover:scale-105 hover:bg-red-200">
            Pick your meal
          </button>
        </div>

        <HowItWorks/>
        <Welcome/>
        <Cuisines/>
        <Footer/>
      </div>
    </>
  );
};

export default LandingPage;
