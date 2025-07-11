import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSave = () => {
    // Save logic here
    console.log("Rating:", rating);
    console.log("Review:", review);
    // Navigate back or show success toast
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <IoMdArrowBack size={24} />
        </button>
        <h2 className="text-lg font-semibold">Feedback</h2>
      </div>

      {/* Question */}
      <h3 className="text-base font-medium mb-1">How Was Your Experience?</h3>

      {/* Stars */}
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((val) => (
          <FaStar
            key={val}
            size={20}
            className={`mr-1 cursor-pointer ${
              val <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleStarClick(val)}
          />
        ))}
        <span className="text-gray-600 text-sm ml-1">({rating})</span>
      </div>

      {/* Review box */}
      <textarea
        className="w-full mt-2 p-3 rounded-xl bg-[#F9FAFA] border border-gray-200 text-sm"
        rows={5}
        placeholder="Write a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full mt-6 py-3 bg-green-700 text-white font-semibold rounded-xl"
      >
        Save
      </button>
    </div>
  );
};

export default Feedback;
