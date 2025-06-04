import React from "react";
import { Link } from "react-router-dom";
import ErrorImg from "../assets/ErrorImg.png";

const Error = () => {
  return (
    <div>
      {" "}
      <section className="mt-30 md:mt-10 flex flex-col  items-center justify-center   w-full col-span-11 flex-1 rounded-md lg:px-15 ">
        <img
          src={ErrorImg}
          alt="Error"
          className="light:opacity-50 opacity-90 w-60 md:w-70 mx-auto"
        />
        <h1 className="font-semibold mb-5 text-xl md:text-2xl mt-1">
          Page Not Found
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Sorry, we couldn’t find the page you’re looking for. Looks like this
          page doesn’t exist or was moved.
        </p>
        <Link
          to="/"
          className="cursor-pointer bg-red-700 light:bg-red-600  p-3 px-2 sm:px-5 md:px-7 rounded-md font-semibold hover:shadow-lg shadow-red-500/50 light:shadow-red-500/30  transition-all duration-300 ease-in-out"
        >
          Back Home
        </Link>
      </section>
    </div>
  );
};

export default Error;
