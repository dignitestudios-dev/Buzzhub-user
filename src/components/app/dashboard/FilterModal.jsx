import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { FaExchangeAlt, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { RiEBike2Line } from "react-icons/ri";

const FilterModal = ({ isOpen, onClose, onApplyFilters, filters }) => {
  const [selectedMethod, setSelectedMethod] = useState("Delivery");
  const [priceRange, setPriceRange] = useState([50, 120]);
  const [rating, setRating] = useState(0); // Default rating is 0
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  console.log(rating,"rating====")
  const [lastTap, setLastTap] = useState(0); // Track the last tap time
  const tapTimeout = useRef(null); // Reference to the timeout to manage double-tap detection

  useEffect(() => {
    if (filters) {
      setSelectedMethod(filters.fulfillmentMethod || "Delivery");
      setPriceRange([0, filters.productPrice || 500]);
      setRating(filters.productRating || 0);
      setMainCategory(filters.productType || "");
      setSubCategory(filters.productStrain || "");
    }
  }, [filters]);

  const handleApply = () => {
    onApplyFilters({
      fulfillmentMethod: selectedMethod,
      productPrice: priceRange[1],
      productRating: rating,
      productType: mainCategory,
      productStrain: subCategory,
    });
    onClose(); // Close the modal after applying the filters
  };
    // Handle clicking on a star (set exact value to the nearest whole or half)
    const handleInputChange = (event) => {
    let value = parseFloat(event.target.value);
    // Ensure the value is within the range of 0 to 5 and is a valid number
    if (value >= 0 && value <= 5) {
      setRating(Math.round(value * 2) / 2); // Round to nearest half (e.g., 1.0, 1.5, 2.0, 2.5, ...)
    }
  };



  const handleMethodSelection = (method) => {
    // Toggle the method in the array
    setSelectedMethod((prev) =>
      prev.includes(method)
        ? prev.filter((item) => item !== method) // Remove if already selected
        : [...prev, method] // Add if not selected
    );
  };

  const fulfillmentMethod = selectedMethod.length === 2 ? "both" : selectedMethod[0] || "";


  // Render stars based on the rating value
  const renderStars = () => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star
        stars.push(
          <FaStar key={i} className="text-yellow-500 text-xl mr-1" />
        );
      } else if (rating >= i - 0.5) {
        // Half star
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-500 text-xl mr-1" />
        );
      } else {
        // Empty star
        stars.push(
          <FaStar key={i} className="text-gray-300 text-xl mr-1" />
        );
      }
    }

    return stars;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center md:bg-black/50">
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
        {['Pickup', 'Delivery', 'Both'].map(method => (
          <button
            key={method}
            onClick={() => setSelectedMethod(method)}
            className={`flex flex-col items-center px-4 py-4 border rounded-xl w-[100px] h-[100px] transition ${selectedMethod === method ? 'border-green-600 text-green-600' : 'border-gray-300 text-gray-700'}`}
          >
            <div className="text-3xl pt-1">
              {method === 'Pickup' && <BsBox />}
              {method === 'Delivery' && <RiEBike2Line />}
              {method === 'Both' && <FaExchangeAlt />} {/* Icon for Both */}
            </div>
            <span className="mt-1 font-medium">{method}</span>
          </button>
        ))}
      </div>
    </div>

          {/* Sort By Rating */}
          <div className="mb-6">
      <h3 className="font-semibold mb-2">Ratings</h3>
   <div>
    <input
        type="number"
        step="0.5"
        min="0"
        max="5"
        value={rating}
        onChange={handleInputChange}
        className="border p-2 rounded-md text-center mb-3"
        placeholder="Enter rating (0-5)"
      />
      
      {/* Render the stars based on the rating value */}
      <div className="flex">{renderStars()}</div>
    </div>
    </div>

          {/* Price Range */}
        <div className="mb-6">
  <h3 className="font-semibold mb-2">Price Range</h3>

  {/* Input field to type price directly */}
  <div className="flex items-center gap-2 mb-2">
    <label htmlFor="priceInput" className="text-sm text-gray-600">Selected Price:</label>
    <input
      id="priceInput"
      type="number"
      min="0"
      max="500"
      value={priceRange[1]}
      onChange={(e) => {
        const value = Math.min(500, Math.max(0, parseInt(e.target.value) || 0));
        setPriceRange([priceRange[0], value]);
      }}
      className="border border-gray-300 rounded px-2 py-1 w-24 text-sm"
    />
  </div>

  <div className="relative bg-[#F3F3F3] rounded-lg p-4">
    {/* Range slider */}
    <input
      type="range"
      min="0"
      max="500"
      value={priceRange[1]}
      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
      className="w-full accent-[#1D7C42]"
    />

    {/* Display price range below (optional) */}
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>$0</span>
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
              <option>Flower</option>
              <option>Edibles</option>
              <option>Concentrates</option>
              <option>Other</option>
            </select>

            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option>Sub Category</option>
              <option>Indica Strains</option>
              <option>Sativa Strains</option>
              <option>Hybrid Strains</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
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
