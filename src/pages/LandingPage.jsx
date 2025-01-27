import Navbar from "@/components/Navbar";
import React from "react";

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <div className="landing-page-component">
      <div className="background-photo h-[70vh] w-full">
        <img
          src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    </>
  );
};

export default LandingPage;
