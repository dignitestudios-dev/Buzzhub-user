import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router"; // Import useNavigate from react-router-dom

const Documents = () => {
  const navigate = useNavigate(); // Get navigate function

  const documents = [
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
  ];

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
        {/* Medical License Heading */}
        <h1 className="col-span-full text-[14px] sm:text-lg lg:text-xl font-semibold text-gray-800 mt-1">Medical License</h1>

        {/* Medical License Documents */}
        {documents.slice(0, 2).map((doc, index) => (
          <div
            key={index}
            className="rounded-md overflow-hidden border border-gray-300 shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300"
          >
            <img
              src={doc.image}
              alt={doc.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}

        {/* Driving License Heading */}
        <h1 className="col-span-full text-[14px] sm:text-lg lg:text-xl font-semibold text-gray-800 mt-1">Driving License</h1>

        {/* Driving License Documents */}
        {documents.slice(2).map((doc, index) => (
          <div
            key={index}
            className="rounded-md overflow-hidden border border-gray-300 shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300"
          >
            <img
              src={doc.image}
              alt={doc.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
