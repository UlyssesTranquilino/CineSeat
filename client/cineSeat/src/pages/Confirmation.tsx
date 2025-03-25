import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { state } = useLocation(); // Receives data from Payment component
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-8 mt-5 text-left text-white light:text-black">
      <h1 className="text-3xl font-bold">Booking Confirmation</h1>
      <p className="mt-2 text-lg">
        Your booking has been successfully processed.
      </p>

      {/* Movie Details */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Movie Details</h2>
        <p className="mt-1 text-lg">{state?.title}</p>
        <p className="text-gray-400">
          {state?.day?.week}, {state?.day?.month} {state?.day?.day} |{" "}
          {state?.time}
        </p>
      </div>

      {/* Selected Seats */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Selected Seats</h2>
        <div className="flex gap-2 mt-2">
          {state?.seats?.length > 0 ? (
            state.seats.map((seat) => (
              <div
                key={seat}
                className="border p-3 w-10 h-10 flex items-center justify-center rounded-md"
              >
                {seat}
              </div>
            ))
          ) : (
            <p>No seats selected</p>
          )}
        </div>
      </div>

      {/* Ticket Details */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Ticket Details</h2>
        <div className="flex flex-col space-y-2 mt-4">
          <div className="flex">
            <p className="font-semibold mr-2">Name:</p>
            <p className="text-lg">John Doe</p>
          </div>
          <div className="flex">
            <p className="font-semibold mr-2">Email:</p>
            <p className="text-lg">johndoe@gmail.com</p>
          </div>
          <div className="flex">
            <p className="font-semibold mr-2">Phone:</p>
            <p className="text-lg">0912345678</p>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Total Price</h2>
        <p className="text-[#FFD700] text-lg">₱{state?.price}</p>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-[#FFD700] text-black font-semibold p-3 mt-6 w-full max-w-md rounded-md shadow-md hover:shadow-lg transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
