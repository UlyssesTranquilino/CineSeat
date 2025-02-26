import { useState } from "react";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="p-5 rounded-sm bg-[#1A1A1A] w-fuil">
      <h2 className="text-left text-lg font-semibold">Create an Account</h2>
      <form className="mt-5">
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

        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-sm text-gray-200 mb-2 text-left "
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            autoComplete="off"
            name="email"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:border-[#FD1513] focus:outline-none focus:ring-1 focus:ring-[#FD1513] text-sm rounded-sm"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
