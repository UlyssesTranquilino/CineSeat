import { useState } from "react";

import { Link } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="p-5 sm:p-10 rounded-sm bg-[#1A1A1A] w-fuil text-white mt-15 max-w-[500px] mx-auto">
      <h2 className="text-left text-xl font-semibold md:text-2xl">
        Create an Account
      </h2>
      <form className="mt-5 flex flex-col gap-2">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-sm text-gray-200 mb-2 text-left "
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            name="email"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-sm text-gray-200 mb-2 text-left "
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            autoComplete="off"
            name="email"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-sm text-gray-200 mb-2 text-left "
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
            name="email"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="rounded-sm bg-[#FD1513] h-10 font-semibold mt-3">
          Log in
        </button>
      </form>

      <div className="mt-3 flex items-center justify-center gap-3">
        <p className="text-sm text-gray-300">Don't have an account?</p>
        <Link to="/signup">
          <span className="text-[#FD1513] hover:border-b-1">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
