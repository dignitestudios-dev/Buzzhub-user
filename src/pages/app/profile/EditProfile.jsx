import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "../../../axios"; // Import the axios instance from your custom setup
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster"; // Toast components for feedback
import GoogleMapComponent from "../../../global/GoogleMapComponent";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const EditProfile = () => {
  const [avatar, setAvatar] = useState(""); // Avatar state
  const [name, setName] = useState(""); // Name state
  const [email, setEmail] = useState(""); // Email state
  const [phone, setPhone] = useState(""); // Phone state
  const [address, setAddress] = useState(""); // Address state
  const [loading, setLoading] = useState(false); // Loading state
  const [user, setUser] = useState(null); // Store fetched user data
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [checkedState, setCheckedState] = useState("");
  const [checkStateErr, setCheckStateErr] = useState(null);

  const [formData, setFormData] = useState({});

  const formatPhoneNumber = (phoneNumber) => {
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Format the phone number in the desired pattern
  const match = cleaned.match(/(\d{1})(\d{3})(\d{3})(\d{1})/);

  if (match) {
    return `+${match[1]}-${match[2]}${match[3]}-${match[4]}`;
  }

  return phoneNumber; // If it's not a valid phone number, return as is
};


  // Fetch profile data to pre-fill the form
  const fetchProfile = async () => {
    try {
      const response = await axios.get("/user/get-my-profile");
      if (response.data.success) {
        const userData = response.data.data;
        setUser(userData);
        setAvatar(userData.profilePicture);
        setName(userData.fullName);
        setEmail(userData.email);
        setPhone(userData.phoneNumber);
        setAddress(userData.streetAddress);
        setFormData({
          city: userData?.city,
          state: userData?.state,
          deliveryRadius: userData?.deliveryRadius,
          zipCode: userData?.zipCode,
          country: userData?.country,
          streetAddress: userData?.streetAddress,
        });
      } else {
        ErrorToast("Failed to fetch profile data.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      ErrorToast("Error fetching profile data.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [startAddress, setStartAddress] = useState();

  useEffect(() => {
    setStartAddress(formData?.streetAddress);
  }, [formData]);

  const [originCoords, setOriginCoords] = useState([30.0444, 31.2357]);
  const [coordinatesMessage, setCoordinatesMessage] = useState(null);
  const [coordinates, setCoordinates] = useState({
    type: "Point",
    coordinates: { lat: 0, lng: 0 },
  });
  const getStateFromPlace = (place) => {
    const component = place.address_components.find((comp) =>
      comp.types.includes("administrative_area_level_1")
    );
    return component ? component.long_name : "";
  };
  const startLocationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const handleStartPlaceChanged = () => {
    setCheckStateErr(null);
    const place = startLocationRef.current.getPlace();
    const state = getStateFromPlace(place);

    console.log(place, "-- place --");

    setCheckedState(state);

    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setStartAddress(place.formatted_address || "");
      console.log("lat:", lat, "lng:", lng);
      setFormData({ ...formData, ["streetAddress"]: place.formatted_address });
      setCoordinates({
        type: "Point",
        coordinates: [lat, lng],
      });
      setOriginCoords([lng, lat]);
      setCoordinatesMessage(null);
    } else {
      setCoordinatesMessage("Please select a valid location from suggestions.");
    }
  };

  // Handle profile picture change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Save Profile (submit form)
  const handleSave = async () => {
    setLoading(true); // Show loading state

    try {
      const data = new FormData();
      data.append("city", formData?.city);
      data.append("country", formData?.country);
      data.append("state", formData.state);
      data.append("streetAddress", formData.streetAddress);
      data.append("zipCode", formData.zipCode);

      data.append("location[type]", coordinates.type); // Append the type field
data.append("location[coordinates][]", coordinates.coordinates[0]); // Append latitude
data.append("location[coordinates][]", coordinates.coordinates[1]);
      // data.append(
      //   "location[coordinates]",
      //   JSON.stringify(coordinates ? coordinates : latLong)
      // );
      data.append("fullName", name);

      data.append("phoneNumber", phone);

      if (fileInputRef.current.files[0]) {
        data.append("profilePicture", fileInputRef.current.files[0]);
      }

      const response = await axios.post("/user/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      });

      if (response.data.success) {
        SuccessToast("Profile updated successfully.");
        navigate("/app/profile");
      } else {
        ErrorToast(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      ErrorToast("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name == "streetAddress") {
      setStartAddress(e.target.value);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-600">Loading profile...</div>
    );
  }

  const onLocationSelect = (data) => {
    setAddress(data.address);
  };

  return (
    <div className="mx-auto bg-white min-h-screen md:p-8 rounded-xl mb-8 md:border md:border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
            <img
              src={avatar || "https://i.pravatar.cc/?img=12"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-sm text-green-600 mt-2 hover:underline"
          >
            Change Picture
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Name Field */}
        <div>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field (read-only) */}
        <div>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>

        {/* Phone Field */}
        <div>
         <input
  type="tel"
  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
  placeholder="Phone number"
  value={formatPhoneNumber(phone)}  // Use formatted phone number
  maxLength={11}  // Limit the input to 11 characters
  onChange={(e) => setPhone(e.target.value)}  // Keep the original unformatted number
/>

        </div>

        {/* Address Field */}
        <div>
          <p className="text-[13px] font-[600]">Location</p>

          {isLoaded ? (
            <Autocomplete
              onLoad={(autocomplete) =>
                (startLocationRef.current = autocomplete)
              }
              onPlaceChanged={handleStartPlaceChanged}
            >
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="text"
                  placeholder="Enter start location"
                  className="w-full text-sm text-black ml-2 placeholder:font-normal 
              font-normal px-4 lg:py-3 md:py-2 py-3 my-2 rounded-xl outline-none "
                  value={startAddress}
                  name="streetAddress"
                  onChange={handleChange}
                  // maxLength={100}
                />
              </div>
            </Autocomplete>
          ) : (
            <p>Loading Google Maps...</p>
          )}
          {checkStateErr && <p className="text-red-500">{checkStateErr}</p>}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#1D7C42] text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
