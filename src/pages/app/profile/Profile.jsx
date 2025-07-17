import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios"; // Importing the axios instance
import { FiArrowLeft } from "react-icons/fi";
import Loader from "../../../components/global/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/user/get-my-profile");
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <div className="text-center py-10 text-red-500">Failed to load profile.</div>;
  }

  const documents = [
    { title: "Medical License", image: user.medicalCardFront },
    { title: "Medical License Back", image: user.medicalCardBack },
    { title: "Driving License", image: user.drivingLicenseFront },
    { title: "Driving License Back", image: user.drivingLicenseBack },
  ];

  return (
    <div className="mx-auto bg-white min-h-screen md:p-8 rounded-xl mb-8 md:border md:border-gray-200">
      {/* Profile Header */}
      {/* <h2 className="text-2xl hidden md:block font-bold text-gray-800 mb-6">Profile</h2> */}
       <div className="flex items-center justify-between mb-8">
                      <button
                        className="text-gray-800 pr-3"
                        onClick={handleBackClick} // Handle the back button click
                      >
                        <FiArrowLeft size={20} />
                      </button>
                      <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
                        Profile
                      </h3>
                    </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-4">
        {/* User Info */}
        <div className="flex flex-col md:flex-row items-center mb-1">
          {/* Profile Image */}
          <div className="w-[100px] h-[100px] md:w-32 md:h-32 rounded-full overflow-hidden p-1 shadow-inner md:mr-4">
            <img
              src={user.profilePicture}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User Info Text */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">{user.fullName}</h3>
            <p className="text-sm text-gray-500">{user.phoneNumber}</p>
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
          onClick={() => navigate("/app/documents", { state: { documents } })}
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
