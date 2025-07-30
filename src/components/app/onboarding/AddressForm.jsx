// import React, { useState } from "react";

// export default function AddressForm({ onNext, updateData }) {
//   const allowedStates = [
//     "Columbia",
//     "Virginia",
//     "Missouri",
//     "Ohio",
//     "New York",
//     "Minnesota",
//     "Maryland",
//     "Illinois",
//     "Massachusetts",
//     "Connecticut",
//     "Delaware",
//     "New Jersey",
//     "Arizona",
//     "Michigan",
//     "New Mexico",
//     "Rhode Island",
//     "Vermont",
//     "Montana",
//     "Colorado",
//     "Maine",
//     "Washington",
//     "Oregon",
//     "Nevada",
//     "Alaska",
//     "California",
//   ];

//   const [address, setAddress] = useState({
//     street: "",
//     apartment: "",
//     city: "",
//     state: "",
//     country: "USA", // Country is always USA
//     zip: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));

//     // Check if the state field is changed
//     if (name === "state") {
//       if (!allowedStates.includes(value)) {
//         setErrorMessage("This state is not allowed.");
//       } else {
//         setErrorMessage(""); // Clear error if state is valid
//       }
//     }
//   };

//   // Check if all fields are filled and there's no error message
//   const isFormComplete = Object.values(address).every((field) => field.trim() !== "") && !errorMessage;

//   const handleSubmit = () => {
//     if (isFormComplete) {
//       updateData({ address }); // Save address data in parent state
//       onNext(); // Go to next step
//     }
//   };

//   return (
//     <div className="w-full h-full">
//       <div className="w-full h-full flex flex-col">
//         <div className="flex-grow px-5 py-6 space-y-6 overflow-auto">
//           <input
//             type="text"
//             name="street"
//             placeholder="Street Address"
//             value={address.street}
//             onChange={handleChange}
//             className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="apartment"
//             placeholder="Apartment or Suite"
//             value={address.apartment}
//             onChange={handleChange}
//             className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={address.city}
//             onChange={handleChange}
//             className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="state"
//             placeholder="State"
//             value={address.state}
//             onChange={handleChange}
//             className="w-full p-3 bg-gray-100 rounded-md text-gray-500"
//           />
//           {/* Display error message if state is not allowed */}
//           {errorMessage && (
//             <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
//           )}
//           <input
//             type="text"
//             name="country"
//             value={address.country}
//             disabled
//             className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="zip"
//             placeholder="Zip Code"
//             value={address.zip}
//             onChange={handleChange}
//             className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
//           />

//           {/* Disable Next button if form is incomplete or state is not allowed */}
//           <button
//             onClick={handleSubmit}
//             disabled={!isFormComplete}
//             className={`w-full py-3 rounded-md font-semibold ${isFormComplete ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

export default function AddressForm({ onNext, updateData }) {
  const allowedStates = [
    "Columbia", "Virginia", "Missouri", "Ohio", "New York", "Minnesota",
    "Maryland", "Illinois", "Massachusetts", "Connecticut", "Delaware",
    "New Jersey", "Arizona", "Michigan", "New Mexico", "Rhode Island", "Vermont",
    "Montana", "Colorado", "Maine", "Washington", "Oregon", "Nevada", "Alaska",
    "California"
  ];

  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    state: "",
    country: "USA", // Country is always USA
    zip: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const startLocationRef = useRef();

  // Load Google Maps API for autocomplete functionality
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    // Check if the state field is changed and validate
    if (name === "state") {
      if (!allowedStates.includes(value)) {
        setErrorMessage("This state is not allowed.");
      } else {
        setErrorMessage(""); // Clear error if state is valid
      }
    }
  };

  const handlePlaceChanged = () => {
    const place = startLocationRef.current.getPlace();

    if (place.geometry) {
      // Extract components from the selected place
      const formattedAddress = place.formatted_address || "";
      const addressComponents = place.address_components;
      const city = addressComponents.find((comp) =>
        comp.types.includes("locality")
      )?.long_name || "";
      const state = addressComponents.find((comp) =>
        comp.types.includes("administrative_area_level_1")
      )?.long_name || "";
      const zip = addressComponents.find((comp) =>
        comp.types.includes("postal_code")
      )?.long_name || "";

      setAddress({
        street: formattedAddress,
        city,
        state,
        zip,
        country: "USA", // You can add country logic here if needed
      });
    }
  };

  useEffect(() => {
    // Reset error message if address fields are updated
    setErrorMessage("");
  }, [address]);

  const handleSubmit = () => {
    const isFormComplete = Object.values(address).every((field) => field.trim() !== "") && !errorMessage;
    if (isFormComplete) {
      updateData({ address }); // Save address data in parent state
      onNext(); // Go to next step
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col">
        <div className="flex-grow px-5 py-6 space-y-6 overflow-auto">
          {/* Address Input with Google Autocomplete */}
          <div>
            {isLoaded ? (
              <Autocomplete
                onLoad={(autocomplete) => (startLocationRef.current = autocomplete)}
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
                />
              </Autocomplete>
            ) : (
              <p>Loading Google Maps...</p>
            )}
          </div>

          {/* Apartment */}
          <input
            type="text"
            name="apartment"
            placeholder="Apartment or Suite"
            value={address.apartment}
            onChange={handleAddressChange}
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />

          {/* State */}
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
            className="w-full p-3 bg-gray-100 rounded-md text-black"
          />
          {/* Display error message if state is not allowed */}
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

          {/* Country */}
          <input
            type="text"
            name="country"
            value={address.country}
            disabled
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />

          {/* Zip Code */}
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={address.zip}
            onChange={handleAddressChange}
            className="w-full p-3 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none"
          />

          {/* Disable Next button if form is incomplete or state is not allowed */}
          <button
            onClick={handleSubmit}
            disabled={Object.values(address).some((field) => field.trim() === "") || errorMessage}
            className={`w-full py-3 rounded-md font-semibold ${
              Object.values(address).every((field) => field.trim() !== "") && !errorMessage
                ? "bg-green-700 text-white hover:bg-green-800"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

