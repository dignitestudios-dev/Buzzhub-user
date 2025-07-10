import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 416-555-7890",
    avatar: "https://i.pravatar.cc/?img=12",
  };

  return (
    <div className="mx-auto bg-white min-h-screen md:p-8 rounded-xl mb-8 md:border md:border-gray-200">
      {/* Profile Header */}
      <h2 className="text-2xl hidden md:block lg:block font-bold text-gray-800 mb-6">Profile</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-4">
        {/* User Info */}
        <div className="flex flex-col md:flex-row items-center mb-1">
          {/* Profile Image */}
          <div className="w-[100px] h-[100px] md:w-32 md:h-32 rounded-full overflow-hidden p-1 shadow-inner md:mr-4">
            <img
              src={user.avatar}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User Info Text */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.phone}</p>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col items-stretch gap-2 sm:gap-3">
        <button
          onClick={() => navigate("/app/edit-profile")}
          className="flex items-center justify-center gap-1 bg-[#1D7C42] hover:bg-green-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition"
        >
          Edit Profile
        </button>

        <button
          onClick={() => navigate("/app/documents")}
          className="flex items-center justify-between gap-1 bg-[#F9FAFA] text-black px-4 py-3 rounded-xl text-sm font-normal transition hover:bg-gray-100 mt-4 md:mt-0"
        >
          Personal Documents
          <span className="text-[#B7B8B8]">&gt;</span>
        </button>

        <button
          onClick={() => navigate("/app/change-password")}
          className="flex items-center justify-between gap-1 bg-[#F9FAFA] text-black px-4 py-3 rounded-xl text-sm font-normal transition hover:bg-gray-100"
        >
          Change Password
          <span className="text-[#B7B8B8]">&gt;</span>
        </button>

        <button
          className="flex items-center justify-between gap-1 bg-[#F9FAFA] text-black px-4 py-3 rounded-xl text-sm font-normal transition hover:bg-gray-100"
        >
          Notification Settings
          <span className="text-[#B7B8B8]">&gt;</span>
        </button>

        <button
          onClick={() => navigate("/app/delete-account")}
          className="flex items-center justify-between gap-1 bg-[#F9FAFA] text-black px-4 py-3 rounded-xl text-sm font-normal transition hover:bg-gray-100"
        >
          Delete Account
          <span className="text-[#B7B8B8]">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
