import React from "react";
import { useNavigate } from "react-router";
import axios from "../../../axios.js";

export default function ReviewForm({ formData = {}, onBack }) {
  const navigate = useNavigate();

  const {
    address = "",
    street = "",  
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
    medicalBack = "",
    medicalFront = "",
    profile
  } = formData;

  const renderImageBox = (src, label) => {
    if (!src) {
      return (
        <div className="relative border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-sm text-gray-600">
          <span className="text-gray-400">No Image Uploaded</span>
        </div>
      );
    }

    return (
      <div className="relative border-2 border-green-400 rounded-lg p-4 flex flex-col items-center justify-center text-sm text-green-600">
        <img src={src} alt={label} className="w-6 h-6 mb-2" />
        {label}
        <span className="absolute top-1 right-2 text-xl font-bold text-gray-400 cursor-not-allowed">×</span>
      </div>
    );
  };

 const handleSubmit = async () => {
  const token = localStorage.getItem("token");
  console.log("Submitting profile with token:", token);

  if (!token) {
    ErrorToast("Authorization token missing. Please log in again.");
    return;
  }

  try {
    const form = new FormData();

    // Append text fields
    form.append("streetAddress", street);
    form.append("apartment", apartment);
    form.append("city", city);
    form.append("state", state);
    form.append("country", country);
    form.append("zipCode", zip);

    // Append files (assuming they are File objects)
    if (profileImage instanceof File) {
      form.append("profileImage", profile);
    }
    if (medicalCardFront instanceof File) {
      form.append("medicalCardFront", medicalFront);
    }
    if (medicalCardBack instanceof File) {
      form.append("medicalCardBack", medicalBack);
    }
    if (licenseFront instanceof File) {
      form.append("licenseFront", licenseFront);
    }
    if (licenseBack instanceof File) {
      form.append("licenseBack", licenseBack);
    }

    const response = await axios.post("auth/set-profile", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Profile updated successfully", response.data);
      navigate("/auth/login");
    } else {
      console.error("Profile update failed", response.data);
    }
  } catch (error) {
    console.error("An error occurred while updating the profile:", error);
  }
};



  return (
    <div className="w-full max-w-full">
      <div className="bg-white rounded-b-xl py-6 p-4">
        {/* Profile Image */}
        {profileImage && (
          <div className="flex justify-center mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-pink-300"
            />
          </div>
        )}

        {/* Address Fields */}
        {[{ label: "Street Address", value: street },
          { label: "Apartment or Suite", value: apartment },
          { label: "City", value: city },
          { label: "State", value: state },
          { label: "Country", value: country },
          { label: "Zip Code", value: zip },
          // { label: "Payment Method", value: paymentMethod },
        ].map(({ label, value }, idx) => (
          <div key={idx} className="mb-3">
            <input
              disabled
              value={value || ""}
              className="w-full bg-gray-100 border border-gray-200 px-4 py-2 rounded-md text-sm"
              placeholder={label}
            />
          </div>
        ))}

        {/* Medical Card Section */}
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Medical Card</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderImageBox(medicalCardFront, "Front")}
            {renderImageBox(medicalCardBack, "Back")}
          </div>
        </div>

        {/* Driving License Section */}
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Driving License</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderImageBox(licenseFront, "Front")}
            {renderImageBox(licenseBack, "Back")}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 space-y-2 px-4">
          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md"
            onClick={handleSubmit}
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
