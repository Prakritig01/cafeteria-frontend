import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-gray-800 text-white py-8 mt-8 text-center">
      <p className="text-lg">
        Thank you for visiting our Cafeteria! We hope you enjoy your meal.
      </p>
      <div className="mt-4">
        <p>&copy; {new Date().getFullYear()} Cafeteria. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
