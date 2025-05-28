import { useEffect, useActionState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { useUserStore } from "../global/mode";

const SignUpPage = () => {
  const { registerUser } = useUserStore();

  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && errorMessage === null) navigate("/login");
    else console.log("NOT");
  }, [errorMessage, isPending, navigate]);

  return (
    <div className="p-5 sm:p-10 rounded-sm bg-[#1A1A1A] w-fuil light:bg-gray-100 w-fuil text-white light:text-black  mt-15 max-w-[500px] mx-auto">
      <h2 className="text-center text-xl font-semibold md:text-2xl">
        Create an Account
      </h2>
      <form action={formAction} className="mt-5 flex flex-col gap-2">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-sm text-gray-200  light:text-gray-900 mb-2 text-left "
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            name="name"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm text-gray-200  light:text-gray-900 mb-2 text-left "
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            autoComplete="off"
            name="email"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm text-gray-200  light:text-gray-900 mb-2 text-left "
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
            name="password"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-200  light:text-gray-900 mb-2 text-left "
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            autoComplete="off"
            name="confirmPassword"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer rounded-sm bg-[#FD1513]  hover:bg-[#D90D0B] h-10 font-semibold mt-3 text-black light:text-white"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-3 flex items-center justify-center gap-3">
        <p className="text-sm text-gray-300  light:text-gray-900">
          Already have an account?
        </p>
        <Link to="/login">
          <span className="text-[#FD1513] hover:border-b-1 ">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
