import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../global/mode";

const Confirmation = () => {
  const { currentUser } = useUserStore();
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("state: ", state, " Current user: ", currentUser);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Confirmation Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold light:text-gray-900 text-white">
          Booking Confirmed!
        </h1>
        <p className="mt-2 text-lg light:text-gray-600 text-gray-300">
          Your tickets have been successfully booked.
        </p>
      </div>

      {/* Ticket Card */}
      <div className="light:bg-white bg-gray-800/40 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
        {/* Movie Details */}
        <div className="p-6 border-b light:border-gray-200 border-gray-700">
          <h2 className="text-xl font-bold light:text-gray-900 text-white mb-2">
            {state?.title}
          </h2>

          <p className="light:text-red-600 text-red-400 font-medium">
            {state?.theaterName} {state?.location} | Cinema {state?.screen}
          </p>

          <p className="light:text-red-600 text-red-400 font-medium">
            {state?.day?.week}, {state?.day?.month} {state?.day?.day} |{" "}
            {state?.time}
          </p>
        </div>

        {/* Seats Section */}
        <div className="p-6 border-b light:border-gray-200 border-gray-700">
          <h3 className="text-lg font-semibold light:text-gray-900 text-white mb-3">
            Your Seats
          </h3>
          <div className="flex flex-wrap gap-3">
            {state?.seats?.length > 0 ? (
              state.seats.map((seat) => (
                <div
                  key={seat}
                  className="light:bg-red-100 bg-red-900/30 light:text-red-800 text-red-200 font-medium px-3 py-2 rounded-md border light:border-red-200 border-red-800"
                >
                  {seat}
                </div>
              ))
            ) : (
              <p className="light:text-gray-500 text-gray-400">
                No seats selected
              </p>
            )}
          </div>
        </div>

        {/* Customer Details */}
        <div className="p-6 border-b light:border-gray-200 border-gray-700">
          <h3 className="text-lg font-semibold light:text-gray-900 text-white mb-3">
            Customer Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="light:text-gray-600 text-gray-300">Name:</span>
              <span className="font-medium light:text-gray-900 text-white">
                {currentUser.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="light:text-gray-600 text-gray-300">Email:</span>
              <span className="font-medium light:text-gray-900 text-white">
                {currentUser.email}
              </span>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="p-6 light:bg-gray-50 bg-gray-700/20">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold light:text-gray-900 text-white">
              Total Amount
            </h3>
            <p className="text-2xl font-bold light:text-red-700 text-red-400">
              ₱{state?.price}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer light:bg-red-600 light:hover:bg-red-700 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Back to Home
        </button>
        <p className="mt-4 light:text-gray-600 text-gray-400">
          Need help?{" "}
          <a
            href="#"
            className="light:text-red-600 text-red-400 hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
