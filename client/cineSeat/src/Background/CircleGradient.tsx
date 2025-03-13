import React from "react";

const CircleGradient = () => {
  return (
    <div>
      <div className="absolute top-130  h-full pointer-events-none overflow-hidden z-0 w-[100%]">
        <div className="red-gradient lg:w-200 lg:h-200 top:60 sm:top-150 -left-40 blur-3xl absolute"></div>
      </div>
    </div>
  );
};

export default CircleGradient;
