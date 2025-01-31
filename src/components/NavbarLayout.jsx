import React from "react";
import Navbar from "./Navbar";

const NavbarLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default NavbarLayout;
