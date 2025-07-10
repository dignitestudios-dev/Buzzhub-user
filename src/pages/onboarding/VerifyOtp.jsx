import React, { useState } from "react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));

  // Handle OTP input changes
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  // Handle Backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="flex justify-center min-h-screen w-full pt-10">
      <div className="flex justify-center w-full">
        <div className="bg-white lg:w-[30%] md:w-[50%] w-[90%] p-6 rounded-xl">
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-[32px] md:text-[48px] font-bold">Verification</h1>
            <p className="text-[#8A8A8A] font-normal md:text-[17px] text-[14px] mt-2">
              Enter the OTP sent to your email
            </p>
          </div>

          {/* OTP Fields */}
          <div className="grid grid-cols-4 gap-4 justify-center items-center mb-6 mt-12">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text" // changed from password to text to allow visibility
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-[78px] rounded-2xl border text-center md:text-2xl text-xl font-bold outline-none focus:bg-[#E8F2EC] focus:text-[#1D7C42]"
              />
            ))}
          </div>

          {/* Resend Section */}
          <div className="mb-10 md:mb-20 flex justify-center">
            <span className="text-[13px] font-medium text-[#8A8A8A]">
              Didn't receive OTP?
            </span>
            <button
              type="button"
              disabled
              className="text-[13px] font-bold text-primary ml-2 opacity-50 cursor-not-allowed"
            >
              Resend
            </button>
          </div>

          {/* Verify Button (Non-loading, Active) */}
          <button
            type="button"
            className="w-full h-[50px] bg-[#1D7C42] rounded-[12px] flex items-center justify-center text-[14px] text-white font-medium"
          >
            <span className="mr-2">Verify</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
