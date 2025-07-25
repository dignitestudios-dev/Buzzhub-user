import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/export";
import { CiLock } from "react-icons/ci";
import { PiEnvelopeLight } from "react-icons/pi";
import axios from "../../axios"; // Adjust according to your path
import Cookies from "js-cookie"; // For setting token in cookies
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icon imports
import { ErrorToast, SuccessToast } from "../../components/global/Toaster"; // Import toast components
import SocialLogin from "./SocialLogin";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [loading, setLoading] = useState(false); // To manage loading state
  const [errors, setErrors] = useState({}); // To store validation errors

  const { fcmToken } = useContext(AppContext);
  const validateForm = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex pattern
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      formErrors.email = "Please enter a valid email.";
    }
    if (!password) {
      formErrors.password = "Password is required.";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
    }
    return formErrors;
  };
console.log(fcmToken,"fcmToken")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    const deviceIdentity = "123";

    try {
      // API call to login
      const response = await axios.post("/auth/login-user", {
        email,
        password,
        fcmToken: fcmToken,
        deviceIdentity,
      });

      if (response.data.success) {
        // Show success toast
        SuccessToast("Login successful!");

        // Save the response token in cookies
        Cookies.set("authToken", response.data.token, { expires: 7 }); // Token expires in 7 days

        // Stringify and save the user data in localStorage
        const userData = JSON.stringify(response.data.data);
        localStorage.setItem("userData", userData);

        // Redirect to dashboard
        navigate("/app/dashboard");
      } else {
        // If login fails (wrong email/password), show an error toast
        ErrorToast(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle errors and show generic error toast
      ErrorToast("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col  gap-8"
      >
        {/* Header */}
        <div className="flex flex-col items-start mt-16">
          <h3 className="text-[28px] font-medium text-[#1D7C42]">Log In</h3>
          <p className="text-sm">Enter the details below to login</p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="w-full text-red-500 text-sm text-center mt-4">
            {errors.general}
          </div>
        )}

        {/* Input Fields */}
        <div className="flex flex-col w-full justify-center items-center gap-4">
          {/* Email Input */}
          <div className="relative w-full">
            <PiEnvelopeLight
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              className={`w-full rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <CiLock
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full rounded-xl border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={12}
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {showPassword ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShowPassword(false)}
                  size={20}
                />
              ) : (
                <AiOutlineEye onClick={() => setShowPassword(true)} size={20} />
              )}
            </div>
          </div>

          <div className="flex w-full justify-end">
            <button
              type="button"
              className="text-xs font-medium text-green-600"
              onClick={() => navigate("/auth/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 text-white py-3 text-sm font-semibold hover:bg-green-700 transition duration-200"
        >
          {loading ? "Logging In..." : "Log in"}{" "}
          {/* Show loading text if loading */}
        </button>
        <div className="flex justify-center items-center mb-6">
          <SocialLogin />
        </div>
        {/* Signup Redirect */}
        <div className="w-full flex flex-col gap-1 justify-center items-center mt-4">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Don’t have an account?
            </span>
            <button
              type="button"
              className="outline-none text-[13px] border-none text-green-600 font-bold"
              onClick={() => navigate("/auth/signup")}
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
            <h3 className="text-lg font-medium ">Buzzhub</h3>
            <p className="text-sm">Login with your credentials to continue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
