import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "../../../axios"; // Importing axios instance
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster"; // Toaster components for feedback
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false); // Loading state to show during API request

  const [errors, setErrors] = useState({}); // Object to hold error messages for each field
  const navigate = useNavigate(); // Initialize navigate function

  // Validation Function
  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "New password and Confirm password do not match.";
    }

    setErrors(newErrors);

    // If there are errors, return false to prevent form submission
    return Object.keys(newErrors).length === 0;
  };

  // Handle password change request
  const handleUpdate = async () => {
    if (!validateForm()) return; // Validate form before submitting

    setLoading(true); // Set loading to true while making the API request

    try {
      const response = await axios.post("/user/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        SuccessToast("Password updated successfully.");
        // Redirect to the profile page after successful password change
        navigate("/app/profile");
      } else {
        // Show error from the API in a toast
        ErrorToast(response?.data?.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      ErrorToast(error?.response?.data?.message );
    } finally {
      setLoading(false); // Hide loading state after API call
    }
  };

  return (
    <div className="mx-auto bg-white min-h-screen md:p-8 rounded-xl mb-8 md:border md:border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

      <div className="max-w-md w-full mx-auto space-y-5">
        {/* Current Password */}
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 pr-12"
            placeholder="Current password"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-3.5 text-gray-500"
          >
            {showCurrent ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            You must enter your current password to change your password
          </p>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 pr-12"
            placeholder="New password"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-3.5 text-gray-500"
          >
            {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 pr-12"
            placeholder="Confirm password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3.5 text-gray-500"
          >
            {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-[#1D7C42] text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
