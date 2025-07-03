import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";

const DispensaryProfile = () => {
  const [grams, setGrams] = useState(1);
  const [fulfillment, setFulfillment] = useState("self");

  const handleAddToCart = () => {
    alert(`Added ${grams}g to cart with ${fulfillment === "self" ? "Self Pickup" : "Home Delivery"}`);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-2xl overflow-hidden mb-8  pb-12">
      {/* Header */}
     <div className="flex flex-col md:flex-row md:items-start md:gap-4 items-center mb-4 px-4">
  <img
    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    className="w-20 h-20 rounded-full object-cover"
    alt="Dispensary"
  />
  <div className="text-center md:text-left mt-2 md:mt-0">
    <h2 className="text-lg font-semibold">
      Dispensary Name{" "}
      <span className="text-yellow-500 text-sm">★ 4.8</span>
    </h2>
    <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
      <HiOutlineLocationMarker className="text-green-500" />
      Toronto, Canada
    </p>
    <p className="text-xs text-gray-400">Operating Hours: 09:00 AM to 09:00 PM</p>
    <p className="text-red-500 text-sm font-medium mt-1">Delivery/Pickup</p>
    <span className="text-green-500 text-xs mt-1 block">8 Miles Away</span>
  </div>
</div>


      {/* Products */}
      <div className="grid grid-cols-2 gap-4 px-4 mb-6">
        {[1, 2, 3, 4].map((item, idx) => (
          <div key={idx} className="border rounded-xl overflow-hidden shadow-sm">
            <div className="relative">
              <img
                src={`https://source.unsplash.com/200x200/?weed,${idx}`}
                // src="https://source.unsplash.com/30x30/?person"

                alt="Product"
                className="w-full h-28 object-cover"
              />
              <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">8 Miles Away</span>
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium">Item Name</h3>
              <p className="text-xs text-gray-500 mb-1">{idx % 2 === 0 ? "Delivery/Pickup" : "Pickup"}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-gray-800">${idx % 2 === 0 ? "40.00" : "24.00"}</p>
                <span className="text-yellow-500 text-sm flex items-center gap-1"><FaStar size={12} /> 4.8</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800">Reviews</h3>
          <button className="text-green-500 text-xs underline">See all</button>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-3">
          <div className="flex items-center mb-2">
            <img
              src="https://source.unsplash.com/30x30/?person"
              className="w-8 h-8 rounded-full object-cover mr-2"
              alt="Reviewer"
            />
            <div>
              <h4 className="text-sm font-semibold">Item name</h4>
              <p className="text-xs text-gray-400">Toronto, Canada</p>
            </div>
            <span className="ml-auto font-bold text-green-600">$40.00</span>
          </div>
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500 text-xs" />
            ))}
          </div>
          <p className="text-xs text-gray-700">
            Amazing product. I booked on Monday and I got my order on the next day.
            I'm highly impressed with their services. Highly recommended!
          </p>
          <div className="flex items-center mt-3">
            <img
              src="https://i.pravatar.cc/100?img=1"
              alt="user"
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-gray-800">Mike Smith</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispensaryProfile;
