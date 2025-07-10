import React, { useState, useRef } from "react";

const EditProfile = () => {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/?img=12");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 416-555-7890");
  const [address, setAddress] = useState("123 Main Street, Toronto, ON");

  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Submit logic here
    alert("Profile updated successfully.");
  };

  return (
    <div className="mx-auto bg-white min-h-screen md:p-8 rounded-xl mb-8 md:border md:border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Profile Picture Centered */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
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

        {/* Email Field */}
        <div>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        >
          Save 
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
