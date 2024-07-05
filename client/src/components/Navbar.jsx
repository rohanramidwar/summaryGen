import React from "react";
import SmmryLogo from "../assets/sm_logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-center py-3">
      <img src={SmmryLogo} alt="SMMRY" />
    </div>
  );
};

export default Navbar;
