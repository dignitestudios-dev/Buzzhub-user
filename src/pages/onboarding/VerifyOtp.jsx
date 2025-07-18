import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";

const AuthSubmitBtn = ({ text, loading, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full h-[50px] rounded-[12px] text-white font-medium flex justify-center items-center text-[14px] ${
        disabled ? "bg-green-400 opacity-50 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 transition-colors"
      }`}
    >
      <div className="flex items-center">
        <span className="mr-2">{text}</span>
        {loading && <FiLoader className="animate-spin text-lg mx-auto mt-1" />}
      </div>
    </button>
  );
};

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  const inputs = useRef([]);
  const [otpEmail, setOtpEmail] = useState(null);

  // Fetch the email from localStorage (instead of sessionStorage)
  useEffect(() => {
    const email = localStorage.getItem("forgot-password-email");
    if (!email) {
      navigate("/auth/forgot-password");  // Redirect to the Forgot Password page if no email found
    } else {
      setOtpEmail(email);
    }
  }, [navigate]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const getOtpValue = () => {
    return otp.join("");
  };

  const isOtpFilled = otp.every((digit) => digit !== "");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!isOtpFilled) return;

    setLoading(true);
    try {
      let obj = { email: otpEmail, code: getOtpValue() };

      const response = await axios.post("/auth/validate-otp", obj);
      if (response?.status === 200) {
        sessionStorage.setItem("token", response?.data?.token);
        localStorage.setItem("token", response?.data?.token);
        setLoading(false);
        navigate("/auth/update-password"); // Or any other redirect path
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { email: otpEmail };
      const response = await axios.post("auth/send-otp", obj);

      if (response.status === 200) {
        SuccessToast("Otp has been sent to your email");
        setResendLoading(false);
        setOtp(Array(4).fill("")); // Reset OTP fields
        handleRestart();
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleRestart = () => {
    setSeconds(30);
    setIsActive(true);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex justify-center items-center w-full">
        <form onSubmit={handleVerifyOtp} className="bg-white h-full lg:w-[30%] md:w-[50%] w-[90%] p-6 rounded-xl">
          <div className="w-full flex justify-center items-center flex-col">
            <h1 className="text-[32px] md:text-[48px] font-bold">
              Verification
            </h1>
            <p className="text-[#8A8A8A] font-normal md:text-[17px] text-[14px]">
              Enter the OTP sent to your email
            </p>
          </div>
          <div className="w-full h-auto grid grid-cols-4 justify-center items-center gap-4 mb-6 mt-12">
            {otp.map((digit, index) => (
              <input
                inputMode="numeric"
                key={index}
                type="password"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputs.current[index] = el)}
                className="h-[78px] rounded-2xl outline-none text-center bg-light border
                 md:text-2xl text-xl font-bold focus:bg-[#E8F2EC] focus:text-[#1D7C42] focus-within:border-[#8A8A8A] flex items-center justify-center"
              />
            ))}
          </div>
          <div className="w-full h-auto flex justify-center lg:flex lg:flex-col mb-10 md:justify-start md:mb-20 gap-1">
            <div className="w-full lg:w-[434px] flex justify-center items-center lg:justify-center lg:items-center gap-1">
              <span className="text-[13px] font-medium text-[#8a8a8a]">
                Didn't receive OTP?
              </span>
              {isActive ? (
                <span className="text-[13px] text-gray-600">{seconds} seconds</span>
              ) : (
                <button
                  type="button"
                  disabled={resendLoading}
                  onClick={handleResendOtp}
                  className="outline-none text-[13px] border-none font-bold text-primary"
                >
                  {resendLoading ? "Resending..." : "Resend"}
                </button>
              )}
            </div>
          </div>
          <div>
            <AuthSubmitBtn
              text="Verify"
              loading={loading}
              disabled={!isOtpFilled || loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
