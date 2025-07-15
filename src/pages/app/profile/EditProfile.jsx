import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "../../../axios"; // Import the axios instance from your custom setup
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster"; // Toast components for feedback

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
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("streetAddress", address);
      formData.append("phoneNumber", phone);

      if (fileInputRef.current.files[0]) {
        formData.append("profilePicture", fileInputRef.current.files[0]);
      }

      const response = await axios.post("/user/update-profile", formData, {
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

  if (!user) {
    return <div className="text-center py-10 text-gray-600">Loading profile...</div>;
  }

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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Address Field */}
        <div>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
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
