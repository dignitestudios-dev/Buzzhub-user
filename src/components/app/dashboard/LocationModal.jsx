import React, { useEffect } from "react";

const LocationModal = ({ isOpen, onEnableLocation, errorMsg }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") e.preventDefault();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-60 z-50 select-none">
      <div
        className="bg-white p-8 rounded-2xl shadow-lg text-center w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Location Access Required
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Please enable your location to find nearby dispensaries.
        </p>
        {errorMsg && (
          <p className="text-red-600 text-xs mb-4">{errorMsg}</p>
        )}
        <button
          onClick={onEnableLocation}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg w-full"
        >
          Enable Location
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
