  import React from "react";
  import { HiOutlineLocationMarker } from "react-icons/hi";
  import { FaCheck } from "react-icons/fa";
  import { MdArrowBack } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";


  const cartItem = {
    id: "1453453",
    name: "Item name",
    weight: "50grams",
    grams: 1,
    price: 40,
    location: "Toronto, Canada",
    type: "Delivery",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  };

  const OrderTracking = () => {
    const steps = [
      { label: "Ordered Thursday , January", completed: true },
      { label: "Ordered Confirmed", completed: true },
      {
        label: "Processing, Dispensary is preparing the items.",
        completed: true,
      },
      { label: "Order ready for Pick Up", completed: false },
      { label: "Order Picked Up", completed: false },
    ];

    return (
      <div className="w-full mx-auto bg-white min-h-screen font-sans text-[15px]  pb-20 md:pb-0">
        {/* Header */}
        <div className="flex items-center justify-between py-3">
          <MdArrowBack className="text-2xl" />
          <p className="font-semibold text-[15px]">Order Tracking</p>
          <div className="w-6" />
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl p-3 shadow-sm bg-[#F9FAFA] border border-[#E5E5E5] mt-3">
          {/* Flex container for Order ID and Price */}
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            {/* Left - Order ID */}
            <p className="text-sm text-[#1D7C42] font-medium">
              Order Id: <span className="text-[#1D7C42] font-normal">{cartItem.id}</span>
            </p>

          

            <div className="flex items-center ml-4">
             <p className="text-xs md:text-sm mr-2">Dispensary</p>

              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
                alt="dispensary"
                className="w-[20px] h-[20px] md:w-8 md:h-8 rounded-full object-cover mr-2"
              />
            </div>
          </div>

          {/* Product Details and Dispensary Name/Profile */}
          <div className="flex gap-3 items-center mb-3">
            {/* Product Image */}
            <img
              src={cartItem.image}
              alt="product"
              className="w-[62px] h-[62px] mt-2 rounded-md object-cover"
            />
            <div className="flex flex-col gap-0.5 flex-1">
              <p className="text-[15px] font-medium">{cartItem.name}</p>
              <p className="flex items-center text-xs text-gray-500">
                <HiOutlineLocationMarker className="mr-1 text-gray-500" />
                {cartItem.location}
              </p>
              <p className="text-xs text-black">{cartItem.weight}</p>
            </div>

            {/* Right Section - Move Dispensary Profile and Name here */}
            {/* Right - Price Section */}
            <div className="text-right">
              <p className="text-[18px] font-bold">${cartItem.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Pickup Date */}
        <div className="mt-6 mb-2">
          <p className="text-[13px] font-semibold text-gray-800">Estimated Pickup</p>
          <p className="text-[13px] font-medium text-[#4C9A2A]">Monday, Aug 8, 2023</p>
        </div>

        {/* Tracking Steps */}
        <div className="mt-6 relative">
          {/* Connecting Line */}
        <div className="absolute top-0 left-2.5 w-[2px] h-full bg-green-500" />

          {steps.map((step, index) => (
            <div key={index} className="relative flex gap-3 items-start mb-8">
              {/* Icon */}
              <div className="w-5 h-5 rounded-md flex items-center justify-center z-10">
  {step.completed ? (
    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-[#1D7C42]">
      <FaCheck className="text-white text-[10px]" />
    </div>
  ) : (
    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-white border-2 border-[#1D7C42]">
      <FaCheck className="text-[#1D7C42] text-[10px]" />
    </div>
  )}
</div>


              {/* Label */}
              <p
                className={`text-[13px] ${step.completed ? "text-[#4C9A2A]" : "text-[#D9EBD0]"}`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Chat Button */}
        <button className="mt-6 w-full bg-[#1D7C42] text-white text-sm py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
  <IoChatbubbleEllipsesOutline className="text-white text-lg" />
  Chat With Seller
</button>

      </div>
    );
  };

  export default OrderTracking;
