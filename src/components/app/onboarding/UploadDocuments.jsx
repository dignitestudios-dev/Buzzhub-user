import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function UploadDocuments({ onNext, onBack, updateData }) {
  const [images, setImages] = useState({
    profile: null,
    medicalFront: null,
    medicalBack: null,
    licenseFront: null,
    licenseBack: null,
  });

  const handleFile = (e, name) => {
    const file = e.target.files[0];
    if (file) setImages((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
  };

  const handleSubmit = () => {
    updateData(images);
    onNext();
  };

  const renderUploadBox = (label, name) => (
    <label className="rounded-md p-6 text-center cursor-pointer w-full">
      <input type="file" className="hidden" onChange={(e) => handleFile(e, name)} />
      {images[name] ? (
        <img
          src={images[name]}
          alt="uploaded"
          className="h-32 w-32 mx-auto object-cover" // Make it a square
        />
      ) : (
        <>
          <p className="text-green-600 font-semibold">Upload Image</p>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xs text-gray-400">Upto 20mbps JPG, PNG</p>
        </>
      )}
    </label>
  );

  return (
    <div className="w-full  max-w-full">
      {/* Progress Steps */}
      {/* <div className="flex items-center justify-between bg-green-600 text-white p-4">
        {["Address", "Profile", "Payment", "Review"].map((step, index) => (
          <div key={step} className="flex-1 text-center relative">
            <div
              className={`w-6 h-6 mx-auto mb-1 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                index < 2 ? "bg-white text-green-600 border-white" : "border-white"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs">{step}</span>
          </div>
        ))}
      </div> */}

      {/* Upload Image Section */}
      <div className="bg-white rounded-b-xl py-6 shadow-md ">
        <h2 className="text-center text-green-600 font-bold text-lg mb-4">Upload Image</h2>

        {/* Profile Upload */}
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFile(e, "profile")}
            />
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-green-400 flex items-center justify-center overflow-hidden">
              {images.profile ? (
                <img
                  src={images.profile}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaPlus className="text-green-600 text-xl" />
              )}
            </div>
          </label>
        </div>

        {/* Medical Card Upload */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 pl-4">Medical Card</h3>
          <div className="space-y-4 p-4">
            <div className="border-2 border-dashed border-green-400 bg-[#F6F6F6] p-2 rounded-xl">
              {renderUploadBox("Front", "medicalFront")}
            </div>
            <div className="border-2 border-dashed border-green-400 bg-[#F6F6F6] p-2 rounded-xl">
              {renderUploadBox("Back", "medicalBack")}
            </div>
          </div>
        </div>

        {/* Driving License Upload */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 pl-4">Driving License</h3>
          <div className="space-y-4 p-4">
            <div className="border-2 border-dashed border-green-400 bg-[#F6F6F6] p-2 rounded-xl">
              {renderUploadBox("Front", "licenseFront")}
            </div>
            <div className="border-2 border-dashed border-green-400 bg-[#F6F6F6] p-2 rounded-xl">
              {renderUploadBox("Back", "licenseBack")}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 px-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mb-2"
          >
            Next
          </button>
          <button
            onClick={onBack}
            className="w-full text-green-600 text-sm font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
