import React from "react";
import { FaMobileAlt, FaApple, FaGooglePlay } from "react-icons/fa"; // Apple and Google Play icons

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  // Handle opening Apple Store link
  const handleAppleClick = () => {
    window.open("https://apps.apple.com/us/app/buzzhub-user/id6739570527", "_blank");
  };

  // Handle opening Google Play Store link (You can replace this link with your app's Play Store URL)
  const handleGoogleClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.yourapp", "_blank");
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 sm:w-96 max-w-xs">
        <div className="flex flex-col items-center space-y-6">
          <FaMobileAlt className="text-green-700 text-6xl" />
          <h3 className="text-xl font-semibold text-gray-800 text-center">{message}</h3>

          {/* App Store and Google Play icons */}
          <div className="flex space-x-6 mt-6">
            {/* Apple Icon - Redirect to App Store */}
            <FaApple
              className="text-6xl text-gray-800  border-2 p-2 rounded-lg cursor-pointer hover:text-green-700 transition duration-300"
              onClick={handleAppleClick}
            />
            {/* Google Play Icon - Gray color */}
            <FaGooglePlay
              className="text-6xl text-gray-400 border-2 p-2 rounded-lg cursor-pointer hover:text-green-700 transition duration-300"
              onClick={handleGoogleClick}
            />
          </div>

          {/* Close Button */}
          <div className="w-full mt-6">
            <button
              onClick={onClose}
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
