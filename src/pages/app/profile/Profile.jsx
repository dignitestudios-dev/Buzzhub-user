import React from "react";
import { FiEdit2 } from "react-icons/fi";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 416-555-7890",
    avatar: "https://i.pravatar.cc/?img=12",
    documents: [
      {
        title: "Medical License",
        image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "Driving License",
        image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "Health Card",
        image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "ID Proof",
        image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
      },
    ],
  };

  return (
    <div className="mx-auto bg-white min-h-screen  md:p-8 rounded-xl  mb-8 md:border md:border-gray-200">
      {/* Profile Header */}
      <h2 className="text-2xl hidden md:block lg:block font-bold text-gray-800 mb-6">Profile</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-4">
        {/* User Info */}
        <div className="flex flex-col md:flex-row items-center mb-1">
          {/* Profile Image */}
          <div className="w-[100px] h-[100px] md:w-32 md:h-32 rounded-full overflow-hidden  p-1 shadow-inner md:mr-4">
            <img
              src={user.avatar}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User Info Below the Image */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.phone}</p>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Buttons Section (Always vertical) */}
      <div className="flex flex-col items-stretch gap-2 sm:gap-3 ">
        <button className="flex items-center justify-center gap-1 bg-[#1D7C42] hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition">
          Edit Profile
        </button>
        <button className="flex items-center justify-between gap-1 bg-[#F9FAFA] hover:from-green-600 hover:to-green-700 text-black px-4 py-3 rounded-xl text-sm font-normal transition mt-4 md:mt-0">
          Personal Documents
          <span className="text-[#B7B8B8]">&gt;</span> {/* Right arrow symbol */}
        </button>
        <button className="flex items-center justify-between gap-1 bg-[#F9FAFA] hover:from-green-600 hover:to-green-700 text-black px-4 py-3 rounded-xl text-sm font-normal transition ">
          Change Password
          <span className="text-[#B7B8B8]">&gt;</span> {/* Right arrow symbol */}
        </button>
        <button className="flex items-center justify-between gap-1 bg-[#F9FAFA] hover:from-green-600 hover:to-green-700 text-black px-4 py-3 rounded-xl text-sm font-normal transition ">
          Notification Settings
          <span className="text-[#B7B8B8]">&gt;</span> {/* Right arrow symbol */}
        </button>
        <button className="flex items-center justify-between gap-1 bg-[#F9FAFA] hover:from-green-600 hover:to-green-700 text-black px-4 py-3 rounded-xl text-sm font-normal transition ">
          Delete Account
          <span className="text-[#B7B8B8]">&gt;</span> {/* Right arrow symbol */}
        </button>
      </div>
    </div>
  );
};

export default Profile;
