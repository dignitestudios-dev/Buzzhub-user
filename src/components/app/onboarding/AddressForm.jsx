import React, { useState } from "react";

export default function AddressForm({ onNext, updateData }) {
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateData(address);
    onNext();
  };

  const steps = ["Address", "Profile", "Payment", "Review"];

  return (
    <div className="w-full h-full "> {/* Ensure full height and no margin */}
      <div className="w-full h-full flex flex-col">
        {/* Green Top Section */}
        {/* <div className="bg-green-700 px-6 py-4">
          <div className="flex justify-between items-center">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 relative">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0
                      ? "bg-white text-green-700 border-2 border-white"
                      : "bg-green-800 text-white"
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-xs mt-1 text-white">{step}</span>
                {idx < steps.length - 1 && (
                  <div className="absolute top-3 right-[-50%] w-full h-0.5 bg-white z-[-1]"></div>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* Form Section */}
        <div className="flex-grow px-5 py-6 space-y-6 overflow-auto">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment or Suite"
            value={address.apartment}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />
          <select
            name="city"
            value={address.city}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md text-gray-500"
          >
            <option value="">City</option>
            <option value="Lahore">city 1</option>
            <option value="Karachi">city 2</option>
            <option value="Islamabad">city 3</option>
          </select>
          <select
            name="state"
            value={address.state}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md text-gray-500"
          >
            <option value="">State</option>
            <option value="Punjab">state 1</option>
            <option value="Sindh">state 2</option>
            <option value="KPK">state 3</option>
          </select>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={address.zip}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-green-700 text-white rounded-md font-semibold hover:bg-green-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
