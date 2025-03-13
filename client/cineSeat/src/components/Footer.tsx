import React from "react";
import Logo from "../assets/Logo/CineSeatRed.png";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center mt-25">
      <div className="  h-[1px] w-full bg-gray-400 light:bg-black" />
      <div className="flex flex-col items-center gap-2 bg-black light:bg-white absolute px-5">
        <img src={Logo} alt="CineSeat Logo" className="w-10 md:w-13" />
        <div>
          <h1 className="font-bold text-lg light:text-black md:text-xl -mt-2">
            CineSeat
          </h1>

          <p className=" text-sm text-gray-400 light:text-gray-600 pt-3 ">
            @2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
