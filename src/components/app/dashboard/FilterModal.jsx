import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { RiEBike2Line } from "react-icons/ri";


const FilterModal = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("Delivery");
  const [priceRange, setPriceRange] = useState([50, 120]);
  const [rating, setRating] = useState(4);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:bg-black/50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-40 md:block hidden" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full h-full bg-white p-5 overflow-y-auto md:max-w-md md:h-auto md:rounded-xl md:shadow-lg md:mx-auto md:my-20">
        {/* Close Button */}
                  <h2 className="text-[24px] font-bold text-[#1D7C42] mb-6">Filters</h2>

        <button onClick={onClose} className="absolute top-4 right-4 border-2 rounded-full p-0.5 border-black text-black text-xl">
          <IoMdClose />
        </button>

        <div className="">

          {/* Fulfillment Method */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Fulfillment Method</h3>
            <div className="flex gap-4">
              {['Pickup', 'Delivery'].map(method => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`flex flex-col items-center px-4 py-4 border rounded-xl w-[100px] h-[100px] transition ${selectedMethod === method ? 'border-green-600 text-green-600' : 'border-gray-300 text-gray-700'}`}
                >
                  <div className="text-3xl pt-1">{method === 'Pickup' ? <BsBox/> : <RiEBike2Line/>}</div>
                  <span className="mt-1 font-medium">{method}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort By Rating */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Ratings</h3>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={`text-xl mr-1 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="relative bg-[#F3F3F3] rounded-lg p-4">
             <input
  type="range"
  min="0"
  max="500"
  value={priceRange[1]}
  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
  className="w-full accent-[#1D7C42]"
/>
<div className="mt-2">
  {/* Display selected range */}
  {/* <div className="flex justify-between text-sm font-medium text-[#1D7C42] mb-1">
    <span>${priceRange[0]}</span>
    <span>${priceRange[1]}</span>
  </div> */}

  {/* Static price ticks */}
  <div className="flex justify-between text-xs text-gray-500">
    <span>$0</span>
    <span>$50</span>
    <span>$120</span>
    <span>$500</span>
  </div>
</div>

            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Type/Strain Of Product</h3>
            <select
              className="w-full mb-3 border border-gray-300 rounded-lg p-2"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
            >
              <option>Main Category</option>
              <option>Flowers</option>
              <option>Edibles</option>
              <option>Concentrates</option>
            </select>

            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option>Sub Category</option>
              <option>Indica</option>
              <option>Sativa</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={onClose}
            className="w-full bg-green-700 text-white py-2 rounded-lg text-[13px] lg:text-[18px] font-semibold"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;