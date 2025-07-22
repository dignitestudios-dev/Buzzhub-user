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
    updateData({ address }); // Save address data in parent state
    onNext(); // Go to next step
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col">
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
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
          </select>
          <select
            name="state"
            value={address.state}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded-md text-gray-500"
          >
            <option value="">State</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">KPK</option>
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
