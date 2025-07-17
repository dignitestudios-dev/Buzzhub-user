import React, { useState } from "react";
import axios from "../../axios"; // Importing axios instance
import { BiArrowBack } from "react-icons/bi";
import { Logo } from "../../assets/export";
import { useNavigate } from "react-router-dom";

// Custom Input Component
const AuthInput = ({ text, placeholder, type, value, setState, required }) => {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-700">{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setState(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        required={required}
      />
    </div>
  );
};

// Custom Submit Button Component
const AuthSubmitBtn = ({ text, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full p-3 mt-4 bg-green-600 text-white rounded-md ${disabled ? "opacity-50" : "hover:bg-green-800"}`}
    >
      {text}
    </button>
  );
};

const ForgotPassword = () => {
  const navigate = useNavigate(); // Using react-router's useNavigate hook for navigation
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("auth/forgot-password", { email });
      localStorage.setItem("forgot-password-email", email);
      if (response.status === 201) {
        navigate("/auth/verify-otp");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)} // Go back on click
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Forgot Password
          </h1>
          <p className="w-[90%] font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
            Enter your email to reset your password and swiftly resume your experience.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text="Email"
            placeholder="Type your email here"
            type="email"
            value={email}
            required
            setState={setEmail}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <AuthSubmitBtn text={loading ? "Processing..." : "Next"} disabled={loading} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <div className="relative flex justify-center items-center h-full">
          <img
            src={Logo}
            alt="login_mockup"
            className="relative w-[70%] h-auto mb-20 object-contain rounded-full "
          />
        </div>
        <div className="absolute bottom-10 text-[#074F57] text-center z-20">
          <div className="flex flex-col items-center space-y-2">
            <img src={Logo} alt="pill" className="w-[50px]" />
            <h3 className="text-lg font-medium">Forgot Password</h3>
            <p className="text-sm">Enter your email to reset your password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
