import React from "react";
import { useNavigate } from "react-router";

export default function ReviewForm({ formData = {}, onBack }) {
  const navigate = useNavigate(); 

  const {
    address = "",
    apartment = "",
    city = "",
    state = "",
    country = "",
    zip = "",
    profileImage = "",
    medicalCardFront = "",
    medicalCardBack = "",
    licenseFront = "",
    licenseBack = "",
    paymentMethod = "",
  } = formData;

  const renderImageBox = (src, label) => (
    <div className="relative border-2 border-green-400 rounded-lg p-4 flex flex-col items-center justify-center text-sm text-green-600">
      <img src={src} alt={label} className="w-6 h-6 mb-2" />
      {label}
      <span className="absolute top-1 right-2 text-xl font-bold text-gray-400 cursor-not-allowed">×</span>
    </div>
  );

  const handleSubmit = () => {
    // Then navigate to /auth/login
    navigate("/auth/login");
  };

  return (
    <div className="w-full max-w-full">
      <div className="bg-white rounded-b-xl py-6 p-4 ">
        {profileImage && (
          <div className="flex justify-center mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-pink-300"
            />
          </div>
        )}

        {[{ label: "Street Address", value: address },
          { label: "Apartment or Suite", value: apartment },
          { label: "City", value: city },
          { label: "State", value: state },
          { label: "Country", value: country },
          { label: "Zip Code", value: zip },
          { label: "Payment Method", value: paymentMethod },
        ].map(({ label, value }, idx) => (
          <div key={idx} className="mb-3">
            <input
              disabled
              value={value}
              className="w-full bg-gray-100 border border-gray-200 px-4 py-2 rounded-md text-sm"
              placeholder={label}
            />
          </div>
        ))}

        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Medical Card</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderImageBox(medicalCardFront, "Front")}
            {renderImageBox(medicalCardBack, "Back")}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Driving License</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderImageBox(licenseFront, "Front")}
            {renderImageBox(licenseBack, "Back")}
          </div>
        </div>

        <div className="mt-6 space-y-2 px-4">
          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md"
            onClick={handleSubmit} // Step 3: Use navigate
          >
            Submit
          </button>
          <button onClick={onBack} className="w-full text-green-600 text-sm font-medium">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
