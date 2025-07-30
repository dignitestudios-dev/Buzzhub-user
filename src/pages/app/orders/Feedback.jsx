import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from '../../../axios';
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";

const Feedback = () => {
  const navigate = useNavigate();
  const { id: dispensaryId } = useParams();
  const location = useLocation();
  const productId = location.state?.productId;
  console.log("Product ID:", productId);
  
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);


  const handleStarClick = (value) => {
    setRating(value);
  };



  const handleReview = async () => {
  try {
    setLoading(true);
    const response = await axios.post("user/add-reviews", {
      dispensaryId,
      productId,
      ratingNumber: rating.toString(),
      review: review,
    });

    if (response.data.success) {
      SuccessToast("Feedback submitted successfully");
      navigate("/app/orders");
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    const message = error.response?.data?.message || "Error submitting feedback";
    ErrorToast(message);
  } finally {
    setLoading(false);
  }
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
      disabled={loading}
        onClick={handleReview}
        className="w-full mt-6 py-3 bg-green-700 text-white font-semibold rounded-xl"
      >{loading ? "Submitting..." : "Submit Feedback"}</button>
    </div>
  );
};

export default Feedback;
