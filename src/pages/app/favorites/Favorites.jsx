import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

// Sample data
const favoriteItems = [
  {
    id: "item1",
    name: "Hybrid Flower",
    weight: "50gram",
    price: "$40.00",
    location: "Toronto, Canada",
    type: "Delivery",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    distance: "3 Miles Away",
    rating: "4.8",
  },
  {
    id: "item2",
    name: "Gummies",
    weight: "10 pcs",
    price: "$25.00",
    location: "Toronto, Canada",
    type: "Pickup",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
    distance: "1.2 Miles Away",
    rating: "4.5",
  },
];

const favoritedispensary = [
  {
    id: "disp1",
    name: "Green Leaf Dispensary",
    description: "Premium cannabis products.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "disp2",
    name: "Urban Buds",
    description: "Organic and lab-tested strains.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80",
  },
];

const Favorites = () => {
  const [activeTab, setActiveTab] = useState("Dispensary");

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">Favorites</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-green-50 p-1 rounded-xl mb-4">
        {["Dispensary", "Items"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-1/2 py-2 rounded-lg p-2 text-sm  transition ${
              activeTab === tab ? "bg-[#1D7C42] text-white" : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "Dispensary" ? (
        <div className="space-y-4">
          {favoritedispensary.map((disp) => (
            <div
              key={disp.id}
              className="relative flex items-start gap-4 p-0.5 border border-gray-200 rounded-2xl shadow-sm bg-[#F9FAFA]"
            >
              <img
                src={disp.image}
                alt={disp.name}
                className="w-[82px] h-[82px] rounded-2xl object-cover"
              />
              <div className="flex-1 pt-2">
                <h3 className="font-semibold text-sm text-gray-800 ">{disp.name}</h3>
                <p className="text-sm text-gray-600">{disp.description}</p>
                <p className="text-xs text-yellow-600 mt-1 font-medium">⭐ {disp.rating.toFixed(1)} </p>
              </div>
              <button className="text-green-600 absolute top-3 right-3 hover:text-green-800">
                <FiHeart size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 min-w-[168px] min-h-[212px] w-full h-full"
            >
              <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
                {item.distance}
              </div>

              <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                <FiHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[130px] object-cover rounded-t-xl" // Keep the height fixed for the image
              />

              {/* Card Content */}
              <div className="p-4">
                {/* Item Name + Rating */}
                <div className="flex justify-between items-center">
                  <h3 className="text-[13px] font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center text-sm text-yellow-500 font-semibold">
                    <span className="mr-1">⭐</span> {item.rating}
                  </div>
                </div>

                {/* Item Type */}
                <div className="text-sm text-gray-500 mt-1">{item.type}</div>

                {/* Dispensary Section */}
                <div className="flex items-center mt-1">
                  {/* Dispensary Profile Image */}
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg" // Sample dispensary image
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
