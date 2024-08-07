import React from "react";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 animate-spinClockwise rounded-full border-4 border-t-transparent border-red-500"></div>
        <div className="absolute inset-0 animate-spinCounterclockwise rounded-full border-4 border-t-transparent border-green-500"></div>
        <div className="absolute inset-0 animate-spinClockwise rounded-full border-4 border-t-transparent border-blue-500"></div>
      </div>
    </div>
  );
};

export default Spinner;
