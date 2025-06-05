import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActionState } from "react";
import { useUserStore } from "../global/mode";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useUserStore();

  const [errorMessage, formAction, isPending] = useActionState(
    loginUser,
    undefined
  );

  useEffect(() => {
    if (!isPending && errorMessage === null) navigate("/");
  }, [errorMessage, isPending, navigate]);

  return (
    <div className="p-5  sm:p-10 rounded-sm bg-[#1A1A1A] light:bg-gray-100 w-fuil text-white light:text-black mt-15  max-w-[500px] mx-auto">
      <h2 className="text-center text-xl font-semibold md:text-2xl ">Log in</h2>
      <form action={formAction} className="mt-5 flex flex-col gap-2">
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm text-gray-200 light:text-gray-900 mb-2 text-left "
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            autoComplete="off"
            name="email"
            required
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm text-gray-200 light:text-gray-900 mb-2 text-left "
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
            name="password"
            required
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
          />
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer rounded-sm bg-[#FD1513]  hover:bg-[#D90D0B]  h-10 font-semibold mt-3 text-black light:text-white"
        >
          Log in
        </button>
      </form>

      <div className="mt-3 flex items-center justify-center gap-3">
        <p className="text-sm text-gray-300 light:text-gray-900">
          Don't have an account?
        </p>
        <Link to="/signup">
          <span className="text-[#FD1513] hover:border-b-1">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
