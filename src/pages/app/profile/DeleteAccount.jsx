import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = () => {
    if (!password) {
      alert("Please enter your password to confirm deletion.");
      return;
    }

    // Add logic here to handle account deletion
    alert("Account deleted successfully.");
  };

  return (
    <div className="mx-auto bg-white min-h-screen md:p-8 rounded-xl mb-8 md:border md:border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Delete Account</h2>

      <div className="max-w-md w-full mx-auto space-y-6">
        <p className="text-gray-600 text-sm">
          To permanently delete your account, please confirm your password below. This action is irreversible.
        </p>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 pr-12"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-medium transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
