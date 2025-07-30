import React from "react";
import { FaMobileAlt } from "react-icons/fa"; // Mobile icon for mobile apps

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-96 max-w-xs">
        <div className="flex flex-col items-center space-y-4">
          <FaMobileAlt className="text-green-700 text-5xl" />
          <h3 className="text-xl font-semibold text-gray-800 text-center">{message}</h3>
          <div className="w-full">
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
