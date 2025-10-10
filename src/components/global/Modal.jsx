import React from "react";
import { FaMobileAlt, FaApple, FaGooglePlay } from "react-icons/fa";

const Modal = ({
  isOpen,
  onClose,
  message,
  appleUrl = "https://apps.apple.com/us/app/buzzhub-user/id6739570527",
  googleUrl = "https://play.google.com/store/apps/details?id=com.dignitestudios.buzzhub_discovery",
}) => {
  if (!isOpen) return null;

  const handleAppleClick = () => window.open(appleUrl, "_blank");
  const handleGoogleClick = () => window.open(googleUrl, "_blank");

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 sm:w-96 max-w-xs">
        <div className="flex flex-col items-center space-y-6">
          <FaMobileAlt className="text-green-700 text-6xl" />
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            {message}
          </h3>

          <div className="flex space-x-6 mt-6">
            <FaApple
              className="text-6xl text-gray-800 border-2 p-2 rounded-lg cursor-pointer hover:text-green-700 transition duration-300"
              onClick={handleAppleClick}
            />
            <FaGooglePlay
              className="text-6xl text-gray-400 border-2 p-2 rounded-lg cursor-pointer hover:text-green-700 transition duration-300"
              onClick={handleGoogleClick}
            />
          </div>

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
