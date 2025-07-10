import React, { useState } from "react";
import { FaStar, FaHeart, FaFilter } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router"; // Import useNavigate
import FilterModal from './../../components/app/dashboard/FilterModal';

// Card Component
const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300 
        min-w-[168px] min-h-[212px] w-full h-full"
      onClick={() => navigate("/app/product-details")}
    >
      <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
        {item.distance}
      </div>

      <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
        <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
      </div>

      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[130px] object-cover rounded-t-xl"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Item Name + Rating */}
        <div className="flex justify-between items-center">
          <h3 className="text-[13px] font-semibold text-gray-900">{item.name}</h3>
          <div className="flex items-center text-sm text-yellow-500 font-semibold">
            <FaStar className="mr-1" /> {item.rating}
          </div>
        </div>

        {/* Item Type */}
        <div className="text-sm text-gray-500 mt-1">{item.type}</div>

        {/* Dispensary Section */}
        <div className="flex items-center mt-1">
          {/* Dispensary Profile Image */}
          <img
            src={item.dispensaryImage}
            alt="Dispensary Profile"
            className="w-[24px] h-[24px] rounded-full object-cover mr-2"
          />
          {/* Dispensary Name and Price */}
          <div className="flex justify-between w-full items-center">
            <div className="text-[12px] text-green-600">Dispensary</div>
            <div className="text-gray-800 font-semibold text-[14px]">{item.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, data }) => {
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  // Handle "See All" button click
  const handleSeeAll = () => {
    navigate("/app/dispensaries"); // Navigate to dispensaries page
  };

  return (
    <div className="mb-12 -mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <button
          onClick={handleSeeAll} // Add onClick handler for navigation
          className="text-[#1D7C42] hover:text-green-600 rounded-full text-xs font-medium"
        >
          See all
        </button>
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// DummyHome Component
const DummyHome = () => {
  const demoData = [
    {
      id: 1,
      name: "Item Name",
      price: "$40.00",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      type: "Delivery/Pickup",
      distance: "8 Miles Away",
      rating: "4.8",
    },
    {
      id: 2,
      name: "Item Name",
      price: "$24.00",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      type: "Pickup",
      distance: "8 Miles Away",
      rating: "4.8",
    },
    {
      id: 3,
      name: "Item Name",
      price: "$40.00",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      type: "Delivery",
      distance: "8 Miles Away",
      rating: "4.8",
    },
    {
      id: 4,
      name: "Item Name",
      price: "$24.00",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      type: "Delivery/Pickup",
      distance: "8 Miles Away",
      rating: "4.8",
    },
  ];
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Search + Filter */}
      <div className="flex justify-end items-center mb-10 border-b border-gray-100 pb-5 px-2">
        {/* Right: Search + Filter */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Input with Icon */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 text-base">
              <FiSearch />
            </span>
            <input
              type="text"
              placeholder="Search for products or dispensaries..."
              className="w-full bg-[#F3F3F3] focus:ring-2 focus:ring-green-500 focus:outline-none rounded-full pl-10 pr-4 py-2 placeholder-gray-400 text-sm"
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-[#F3F3F3] hover:border-green-500 text-gray-700 hover:text-green-600 px-2 py-2 rounded-full transition duration-200 text-sm"
          >
            <CiFilter className="text-lg" />
          </button>
        </div>
      </div>

      {/* Sections */}
      <Section title="Dispensaries Nearby" data={demoData} />
      <Section title="Popular Products" data={demoData} />
      <Section title="New Products" data={demoData} />
      <FilterModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
};

export default DummyHome;
