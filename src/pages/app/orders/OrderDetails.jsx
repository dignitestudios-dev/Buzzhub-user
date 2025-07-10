import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router";  // Import useNavigate

const cartItem = {
  id: "1",
  name: "Item name",
  weight: "50gram",
  grams: 1,
  price: 40,
  location: "Toronto, Canada",
  type: "Delivery",
  image:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
};

const OrderDetails = () => {
  const subtotal = 160;
  const platformFee = 10;
  const total = subtotal - platformFee;
  const navigate = useNavigate();  // Set up useNavigate

  // Simplified handleTrackOrderClick without passing the ID
  const handleTrackOrderClick = () => {
    navigate(`/app/order-tracking`);  // Direct navigation to /app/order-tracking
  };

  return (
    <div className="w-full mx-auto bg-white border border-gray-200 p-4 pb-20 lg:pb-0 rounded-2xl">
      {/* Header */}
      <div className="text-left">
        <h2 className="text-lg font-semibold">Order Details</h2>
      </div>

      {/* Order Details */}
      <div className="bg-[#F9FAFA] mb-2 p-4 rounded-xl text-sm space-y-3">
        <div className="flex justify-between border-b border-gray-300 pb-3">
          <span>Order ID</span>
          <span className="text-gray-700 font-medium">21515156156</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-3">
          <span>Placed On</span>
          <span className="text-gray-700 font-medium">Sun, Jun 7, 2024</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-3">
          <span>Time</span>
          <span className="text-gray-700 font-medium">11:30AM</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-3">
          <span>Fulfillment Method</span>
          <span className="text-gray-700 font-medium">Delivery</span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span className="text-green-600 font-semibold">Approved</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="rounded-2xl p-3 shadow-sm bg-[#F9FAFA] border border-[#E5E5E5] mt-3">
        {/* Flex container for Order ID and Price */}
        <div className="flex justify-between items-center mb-2 border-b pb-2">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
              alt="dispensary"
              className="w-[20px] h-[20px] md:w-8 md:h-8 rounded-full object-cover mr-2"
            />
            <p className="text-xs md:text-sm mr-2">Dispensary</p>
          </div>
          {/* Left - Order ID */}
          <p className="text-sm text-[#1D7C42] border-b border-[#1D7C42]">
            View Dispensary 
          </p>
        </div>

        {/* Product Details and Dispensary Name/Profile */}
        <div className="flex gap-3 items-center mb-3">
          {/* Product Image */}
          <img
            src={cartItem.image}
            alt="product"
            className="w-[62px] h-[62px] mt-2 rounded-md object-cover"
          />
          <div className="flex flex-col gap-0.5 flex-1 mt-3">
            <p className="text-[15px] font-medium">{cartItem.name}</p>
            <p className="flex items-center text-xs text-gray-500">
              <HiOutlineLocationMarker className="mr-1 text-gray-500" />
              {cartItem.location}
            </p>
            <div className="text-left">
              <p className="text-[18px] font-bold">${cartItem.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center justify-between">
            <p className="text-xs text-[#1D7C42] mb-2">{cartItem.weight}</p>

            <button
              onClick={handleTrackOrderClick}  // Directly triggers navigation
              className="bg-[#1D7C42] p-2.5 w-[38px] h-[38px] rounded-lg text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Billing Summary */}
      <div>
        <h3 className="text-sm font-semibold mb-2 mt-2">Billing</h3>
        <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>1% platform fees</span>
            <span>${platformFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-green-700 text-base pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl font-semibold text-sm"
        onClick={handleTrackOrderClick}  // Simplified click handler
      >
        Track Order
      </button>
    </div>
  );
};

export default OrderDetails;
