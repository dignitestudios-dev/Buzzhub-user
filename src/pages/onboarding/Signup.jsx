import React, { useState } from "react";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { CiLock, CiUser, CiPhone } from "react-icons/ci";
import { PiEnvelopeLight } from "react-icons/pi";

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="flex justify-center items-center w-full py-2">
        <div className="h-full lg:w-[30%] md:w-[50%] w-[90%] p-6 rounded-xl">
          <form className="h-auto">
            <div className="mb-6">
              <p className="text-[28px] font-semibold  text-[#1D7C42]">Sign Up</p>
              <p className="text-[13px] text-[#5E5F62]">
                Enter the details below to Sign up
              </p>
            </div>

            {/* Full Name */}
            <div className="relative mb-4">
              <div className="w-full h-[56px]  rounded-[12px] flex items-center">
                <CiUser size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 text-sm bg-[#F3F3F3] text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <div className="w-full h-[56px]  rounded-[12px] flex items-center">
                <PiEnvelopeLight size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 text-sm bg-[#F3F3F3] text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
            </div>

            {/* Secondary Email/Icon */}
            {/* <div className="relative mb-4">
              <div className="w-full h-[56px] bg-light shadow-sm rounded-[12px] flex items-center">
                <FiMail size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="email"
                  placeholder="Confirm Email (optional)"
                  className="w-full pl-12 text-sm text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
            </div> */}

            {/* Phone */}
            <div className="relative mb-4">
              <div className="w-full h-[56px]  rounded-[12px] flex items-center">
                <CiPhone size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  maxLength="10"
                  className="w-full pl-12 text-sm bg-[#F3F3F3] text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
            </div>

            {/* Password */}
           <div className="relative mb-4">
              <div className="w-full h-[56px] rounded-[12px] flex items-center bg-[#F3F3F3]">
                <CiLock size={20} className="text-gray-600 absolute left-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password here"
                  maxLength="12"
                  className="w-full pl-12 pr-10 text-sm text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-[#F3F3F3]"
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-4">
              <div className="w-full h-[56px] rounded-[12px] flex items-center bg-[#F3F3F3]">
                <CiLock size={20} className="text-gray-600 absolute left-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  maxLength="12"
                  className="w-full pl-12 pr-10 text-sm text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-[#F3F3F3]"
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-600"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-4">
              <div className="w-full h-[56px]  rounded-[12px] flex items-center">
                <CiLock size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  maxLength="12"
                  className="w-full pl-12 text-sm bg-[#F3F3F3] text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1 mb-4">
              <button
                type="button"
                className="w-full h-[48px] bg-[#1D7C42] text-white rounded-[12px] flex items-center justify-center text-[14px] font-medium leading-[21.6px] tracking-[-0.24px]"
              >
                <span className="mr-1">Sign Up</span>
              </button>
            </div>
          </form>

          {/* OR separator */}
          <div className="flex items-center mt-4">
            <hr className="w-full border-t border-[#959393]" />
            <p className="px-2 text-[#959393]">OR</p>
            <hr className="w-full border-t border-[#959393]" />
          </div>

          {/* Signup Redirect */}
        <div className="w-full flex flex-col gap-1 justify-center items-center mt-4">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Already have an account?
            </span>
            <button
              type="button"
              className="outline-none text-[13px] border-none text-green-600 font-bold"
            >
              Log In
            </button>
          </div>
        </div>

          {/* Social Button */}
          {/* <div className="flex justify-center mt-4">
            <button className="text-blue-600 text-sm underline">
              Continue with Google
            </button>
          </div> */}

          {/* Terms */}
          {/* <div className="flex items-center mt-6  text-sm text-center text-secondary">
            By registering, you accept our  
            <a
              href="https://buzzhub-landing.vercel.app/termsandconditions2"
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Services 
            </a>{" "}
            and{" "}
            <a
              href="https://buzzhub-landing.vercel.app/privacypolicy2"
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>.
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
