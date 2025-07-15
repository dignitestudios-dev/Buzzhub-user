import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to access the passed state

const Documents = () => {
  const navigate = useNavigate(); // Get navigate function
  const location = useLocation(); // Access state passed from Profile page
  const documents = location.state?.documents || []; // Get documents from state

  // Function to navigate back
  const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };

  return (
    <div className="pb-20">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        {/* Back Button */}
        <button 
          className="text-gray-800 pr-3" 
          onClick={handleBackClick} // Handle the back button click
        >
          <FiArrowLeft size={20} />
        </button>

        {/* Heading (centered on mobile, beside back button on desktop) */}
        <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Personal Documents
        </h3>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {/* Display Documents Dynamically */}
        {documents.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No documents available</p>
        ) : (
          documents.map((doc, index) => (
            <div
              key={index}
              className="rounded-md overflow-hidden border border-gray-300  hover:shadow-xl transition transform hover:scale-105 duration-300"
            >
              <p className="text-start pl-2 text-sm font-semibold mt-2">{doc.title}</p>

              <img
                src={doc.image}
                alt={doc.title}
                className="w-full h-48 object-fit"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Documents;
