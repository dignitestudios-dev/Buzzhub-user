import React from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

const reviews = [
  {
    id: 1,
    productImg: "https://source.unsplash.com/100x100/?cannabis",
    name: "Item name",
    price: "$40.00",
    location: "Toronto, Canada",
    rating: 5,
    text: "Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!",
    userImg: "https://i.pravatar.cc/100?img=1",
    userName: "Mike Smith",
  },
  {
    id: 2,
    productImg: "https://source.unsplash.com/100x100/?weed",
    name: "Item name",
    price: "$40.00",
    location: "Toronto, Canada",
    rating: 4,
    text: "Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!",
    userImg: "https://i.pravatar.cc/100?img=2",
    userName: "Mike Smith",
  },
  {
    id: 3,
    productImg: "https://source.unsplash.com/100x100/?plant",
    name: "Item name",
    price: "$40.00",
    location: "Toronto, Canada",
    rating: 3,
    text: "Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!",
    userImg: "https://i.pravatar.cc/100?img=3",
    userName: "Mike Smith",
  },
];

const RatingBar = ({ stars, value }) => (
  <div className="flex items-center gap-2 text-sm">
    <span>{stars} stars</span>
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500"
        style={{ width: `${(value / 24) * 100}%` }}
      />
    </div>
    <span className="text-gray-500 text-xs">{value}</span>
  </div>
);

const ReviewsPage = () => {
  return (
    <div className="w-full mx-auto  bg-white border border-gray-200 p-6 rounded-2xl mb-8">
      {/* Header */}
      <div className="text-left mb-6">
        <h2 className="text-lg font-semibold">Customer Reviews</h2>
        <div className="flex justify-left items-left gap-1 text-yellow-500 mt-1">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} size={14} />
          ))}
          <span className="text-sm text-gray-600 ml-2">(4) 24</span>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="space-y-2 mb-6">
        <RatingBar stars={5} value={18} />
        <RatingBar stars={4} value={8} />
        <RatingBar stars={3} value={6} />
        <RatingBar stars={2} value={6} />
        <RatingBar stars={1} value={2} />
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <div className="flex items-center mb-2">
              <img
                src={review.productImg}
                alt={review.name}
                className="w-12 h-12 rounded-lg object-cover mr-3"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{review.name}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <HiOutlineLocationMarker /> {review.location}
                </p>
              </div>
              <span className="text-green-600 font-semibold">{review.price}</span>
            </div>

            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
            </div>

            <p className="text-sm text-gray-700 mb-3">{review.text}</p>

            <div className="flex items-center">
              <img
                src={review.userImg}
                className="w-6 h-6 rounded-full mr-2"
                alt={review.userName}
              />
              <span className="text-sm font-medium text-gray-800">
                {review.userName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
