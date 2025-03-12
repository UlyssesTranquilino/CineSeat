import React from "react";

const CircleGradient = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden bg-black -z-1">
      <div className="red-gradient w-[60vw] h-[60vw] fixed sm:top-110 -left-120 blur-3xl"></div>
      <div className="red-gradient w-[50vw] h-[50vw] fixed top-80 md:-right-80 blur-3xl"></div>
    </div>
  );
};

export default CircleGradient;
