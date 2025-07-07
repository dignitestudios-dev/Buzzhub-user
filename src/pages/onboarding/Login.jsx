import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Step 1
import { Logo } from "../../assets/export";
import { CiLock } from "react-icons/ci";
import { PiEnvelopeLight } from "react-icons/pi";

const Login = () => {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // You could validate inputs here if needed
    navigate("/app/dashboard"); 
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
      >
        {/* Header */}
        <div className="flex flex-col items-start mt-16">
          <h3 className="text-[28px] font-medium text-[#1D7C42]">Log In</h3>
          <p className="text-sm">Enter the details below to login</p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col w-full justify-start items-start gap-4">
          <div className="relative w-full">
            <PiEnvelopeLight className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative w-full">
            <CiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
              maxLength={12}
            />
          </div>

          <div className="flex w-full justify-end">
            <button
              type="button"
              className="text-xs font-medium text-green-600"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 text-white py-3 text-sm font-semibold hover:bg-green-700 transition duration-200"
        >
          Log in
        </button>

        {/* Signup Redirect */}
        <div className="w-full flex flex-col gap-1 justify-center items-center mt-4">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Don’t have an account?
            </span>
            <button
              type="button"
              className="outline-none text-[13px] border-none text-green-600 font-bold"
            >
              Create one
            </button>
          </div>
        </div>
      </form>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <div className="relative flex justify-center items-center">
          <img
            src={Logo}
            alt="login_mockup"
            className="relative w-[95%] h-auto mb-20 object-contain rounded-full"
          />
        </div>
        <div className="absolute bottom-60 text-[#074F57] text-center z-20">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium">Buzzhub Dispensary Panel</h3>
            <p className="text-sm">Login with your credentials to continue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
 