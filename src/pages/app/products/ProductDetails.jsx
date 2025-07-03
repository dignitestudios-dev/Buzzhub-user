import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router";


const ProductDetails = () => {
  const [grams, setGrams] = useState(1);
  const [fulfillment, setFulfillment] = useState("self");

  const handleAddToCart = () => {
    alert(`Added ${grams}g to cart with ${fulfillment === "self" ? "Self Pickup" : "Home Delivery"}`);
  };

        const navigate = useNavigate();


  return (
    <div className="w-full mx-auto  rounded-2xl overflow-hidden mb-20">
      {/* Product Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
          alt="product"
          className="w-full h-64 object-cover"
        />
        {/* <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm">
          <BsThreeDotsVertical size={20} />
        </button> */}
      </div>

      {/* Product Info */}
      <div className="">
        <div className="flex justify-between items-start mb-2 mt-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Item Name</h2>
            <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700">Flowers</span></p>
            <p className="text-sm text-gray-500 mb-1">Subcategory: <span className="font-medium text-gray-700">Hybrid</span></p>
            <p className="text-green-600 font-bold text-xl mt-1">$40.00 <span className="text-sm text-gray-500">/gram</span></p>
          </div>
          <div className="flex items-center text-yellow-500 text-sm font-semibold">
            <FaStar className="mr-1" />
            4.8
          </div>
        </div>

        {/* Input & Fulfillment */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Enter Grams</label>
            <input
              type="number"
              value={grams}
              min={1}
              onChange={(e) => setGrams(Number(e.target.value))}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
  <p className="text-sm font-medium text-gray-700">Fulfillment Method</p>
  <div className="flex gap-4 mt-1">
    {["self", "delivery"].map((type) => (
      <label key={type} className="flex items-center gap-2">
        <input
          type="radio"
          name="fulfillment"
          value={type}
          checked={fulfillment === type}
          onChange={() => setFulfillment(type)}
          className="h-4 w-4 border-gray-300 bg-white text-green-600  "
        />
        <span className="text-sm text-gray-700">
          {type === "self" ? "Self Pickup" : "Home Delivery"}
        </span>
      </label>
    ))}
  </div>
</div>

        </div>

        {/* Dispensary Info */}
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <div className="flex gap-3 items-center">
            <img
              src="https://i.pravatar.cc/100?img=1"
              alt="dispensary"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">Dispensary Name</p>
              <p className="text-xs text-gray-500">Toronto, Canada • 8 miles away</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-red-500 text-sm font-semibold">Delivery / Pickup</p>
            <button className="text-blue-600 text-xs underline" onClick={() => navigate("/app/dispensary-profile")}>View Profile</button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">Product Description</h3>
          <p className="text-sm text-gray-600 mb-2">
            A brief overview of the product including origin, effectiveness and ingredients. Helps users make informed decisions.
          </p>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
            <li>Name and Classification</li>
            <li>Purpose and Indications</li>
            <li>Dosage and Content</li>
            <li>Ingredients and Composition</li>
            <li>Side Effects</li>
            <li>Precautions</li>
            <li>Storage</li>
            <li>Manufacturer Info</li>
          </ol>
          <p className="text-sm text-red-600 font-semibold mt-2">Expiry Date: 20 Feb, 2024</p>
        </div>

        {/* Warnings */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Warnings</h3>
          <p className="text-sm text-gray-600">
            Use responsibly. Keep out of reach of children. Always consult your doctor before using cannabis-based products.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-gray-800">Reviews</h3>
            <button className="text-blue-600 text-xs underline">See all</button>
          </div>

          {[1, 2].map((_, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-lg mb-2 shadow-sm">
              <div className="flex items-center text-yellow-500 mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-700">
                {idx === 0
                  ? "Great product. Fast delivery and well-packed."
                  : "Impressed with the quality. Would order again!"}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={`https://i.pravatar.cc/100?img=${idx + 1}`}
                  
                  className="w-6 h-6 rounded-full"
                  alt="Reviewer"
                />
                <span className="text-sm font-medium text-gray-800">
                  {idx === 0 ? "Mike Smith" : "Sarah Lee"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => navigate("/app/cart")}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 mt-4 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
