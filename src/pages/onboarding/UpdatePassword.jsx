import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";  // Importing the eye icons
import { Logo } from "../../assets/export";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthInput = ({ text, placeholder, type, state, setState, showPassword, togglePasswordVisibility }) => {
  return (
    <div className="w-full relative">
      <label className="text-sm text-gray-700">{text}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md pr-10" // Added pr-10 for space for the eye icon
          required
        />
        {showPassword && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {type === "password" ? <BiShow size={24} /> : <BiHide size={24} />}
          </div>
        )}
      </div>
    </div>
  );
};

const AuthSubmitBtn = ({ text, loading, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full p-3 mt-4 bg-green-600 text-white rounded-lg ${disabled ? "opacity-50" : "hover:bg-green-800"}`}
    >
      {text}
    </button>
  );
};

const UpdatePassword = () => {
  const navigate = useNavigate();
  const otpEmail = localStorage.getItem("forgot-password-email");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);  // State to toggle visibility of the new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State to toggle visibility of the confirm password

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.buzzhubapp.com/auth/change-password-forgot",
        {
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.token) {
        setIsUpdated(true);
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 h-full bg-white px-4 py-4 lg:p-20 flex flex-col overflow-y-auto justify-start items-center gap-8">
        <div className="w-full flex justify-start -mt-6 items-start flex-col mt-8">
          <h1 className="text-[36px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Update Password
          </h1>
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text="New Password"
            placeholder="Enter Password"
            type={showNewPassword ? "text" : "password"}  // Toggle between text and password
            state={newPassword}
            setState={setNewPassword}
            showPassword={true}  // Enable the eye icon for password visibility toggle
            togglePasswordVisibility={toggleNewPasswordVisibility}
          />
          <AuthInput
            text="Confirm Password"
            placeholder="Enter Password"
            type={showConfirmPassword ? "text" : "password"}  // Toggle between text and password
            state={confirmPassword}
            setState={setConfirmPassword}
            showPassword={true}  // Enable the eye icon for password visibility toggle
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <AuthSubmitBtn text={loading ? "Updating..." : "Update Password"} disabled={loading} />

        {isUpdated && <p className="text-green-500 text-sm">Password updated successfully! Redirecting...</p>}
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <div className="relative flex justify-center items-center h-full">
          <img src={Logo} alt="logo" className="relative w-[70%] h-auto mb-20 object-contain rounded-full " />
        </div>
        <div className="absolute bottom-10 text-[#074F57] text-center z-20">
          <div className="flex flex-col items-center space-y-2">
            <img src={Logo} alt="pill" className="w-[50px]" />
            <h3 className="text-lg font-medium">Update Password</h3>
            <p className="text-sm">You are only one step away from updating your password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
