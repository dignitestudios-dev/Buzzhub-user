import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { CiLock, CiUser, CiPhone } from "react-icons/ci";
import { PiEnvelopeLight } from "react-icons/pi";
import {
  auth,
} from "../../firebase/firebase";
import axios from "../../axios.js";
import { getIdToken } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [fcmToken, setFcmToken] = useState("2314"); // Example: should fetch the real FCM token
  const [deviceIdentity, setDeviceIdentity] = useState("2334542"); // Example: fetch device identity dynamically

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });


  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email format is invalid";

    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits";

    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Fetching the ID Token from Firebase
      const token = await getIdToken(auth.currentUser);
  console.log("token== > ", token);

      // if (token) {
      //   setIdToken(token);
      // } else {
      //   console.error("Error fetching ID Token.");
      //   setLoading(false);
      //   return;
      // }

      // Prepare payload for the API call
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        idToken: token || "123",
        fcmToken: fcmToken,
        deviceIdentity: deviceIdentity,
      };

      // Send data to the API
      const response = await axios.post("/auth/sign-up", payload);
      if (response.status === 200 || response.status === 201) {
        navigate("/auth/user-info");
      } else {
        console.error("API Error:", response?.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full pt-6">
      <div className="flex justify-center items-center w-full py-2">
        <div className="h-full lg:w-[30%] md:w-[50%] w-[90%] p-6 rounded-xl">
          <form className="h-auto" onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-[28px] font-semibold text-[#1D7C42]">Sign Up</p>
              <p className="text-[13px] text-[#5E5F62]">Enter the details below to Sign up</p>
            </div>

            {/* Full Name */}
            <div className="relative mb-4">
              <div className="w-full h-[56px] rounded-[12px] flex items-center">
                <CiUser size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-12 text-sm bg-[#F3F3F3] text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
              {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <div className="w-full h-[56px] rounded-[12px] flex items-center">
                <PiEnvelopeLight size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-12 text-sm bg-[#F3F3F3] text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="relative mb-4">
              <div className="w-full h-[56px] rounded-[12px] flex items-center">
                <CiPhone size={20} className="text-gray-600 absolute left-4" />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  maxLength="10"
                  className="w-full pl-12 text-sm bg-[#F3F3F3] text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-light"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <div className="w-full h-[56px] rounded-[12px] flex items-center bg-[#F3F3F3]">
                <CiLock size={20} className="text-gray-600 absolute left-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-10 text-sm text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-[#F3F3F3]"
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-600"
                  onClick={() => setShowPassword(prev => !prev)}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-10 text-sm text-[#1D7C42] placeholder:text-black px-4 py-3 rounded-xl outline-none bg-[#F3F3F3]"
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-600"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative mb-6">
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white text-sm bg-[#1D7C42] hover:bg-[#155A2A]"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center justify-between">
              <hr className="flex-grow" />
              <span className="mx-2 text-[#5E5F62]">OR</span>
              <hr className="flex-grow" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
