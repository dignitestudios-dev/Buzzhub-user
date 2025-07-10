import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // Add password update logic here
    alert("Password updated successfully.");
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
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-[#1D7C42] text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
