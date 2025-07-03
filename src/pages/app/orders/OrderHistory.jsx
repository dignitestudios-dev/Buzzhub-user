import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";

const orders = [
  {
    id: "1518548",
    status: "Pending",
    weight: "50gram",
    price: "$40.00",
    location: "Toronto, Canada",
    type: "Delivery",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "1518549",
    status: "Approved",
    weight: "50gram",
    price: "$40.00",
    location: "Toronto, Canada",
    type: "Pickup",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "1518550",
    status: "Rejected",
    weight: "50gram",
    price: "$40.00",
    location: "Toronto, Canada",
    type: "Delivery",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "1518551",
    status: "Approved",
    weight: "50gram",
    price: "$40.00",
    location: "Toronto, Canada",
    type: "Pickup",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
];

const statusColors = {
  Pending: "text-yellow-500",
  Approved: "text-green-600",
  Rejected: "text-red-500",
};

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("Order Request");
  const [filter, setFilter] = useState("All");

  const getFilters = () => {
    return activeTab === "Order Request"
      ? ["All", "Pending", "Approved", "Rejected"]
      : ["All", "Delivery", "Pickup"];
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "All") return true;

    return activeTab === "Order Request"
      ? order.status === filter
      : order.type === filter;
  });

  return (
    <div className="w-full lg:mb-0 md:mb-0 mb-24 bg-white min-h-screen ">
      {/* Header */}
      <div className="flex items-center  gap-2 mb-4">
        <button className="p-1">
          <IoMdArrowBack size={24} />
        </button>
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-green-50 p-1 rounded-lg mb-4">
        {["Order Request", "Order Tracking"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFilter("All");
            }}
            className={`w-1/2 py-2 rounded-lg text-sm  transition ${
              activeTab === tab ? "bg-[#1D7C42] text-white" : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {getFilters().map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 text-sm rounded-full border ${
              filter === type
                ? "bg-[#1D7C42] text-white"
                : "bg-[#E8F2EC]  text-[#1D7C42]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, i) => (
          <div
            key={i}
            className=" rounded-2xl p-3 shadow-sm bg-[#F9FAFA] border border-[#E5E5E5]"
          >
            {/* Order ID + Status */}
            <div className="flex justify-between items-center mb-2 border-b pb-2">
              <p className="text-sm text-[#1D7C42] font-medium">
                Order Id: <span className="text-[#1D7C42] font-normal">{order.id}</span>
              </p>
              <p className={`text-sm font-medium ${statusColors[order.status]}`}>
                {order.status}
              </p>
            </div>

            {/* Product Details */}
            <div className="flex gap-3">
              <img
                src={order.image}
                alt="product"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
<div className="flex justify-between items-center">
  <p className="font-semibold text-sm">Item name</p>
  <span className="text-xs text-[#1D7C42] font-medium">{order.weight}</span>
</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <HiOutlineLocationMarker className="mr-1" />
                    {order.location}
                  </div>
                                    <p className="text-[18px] font-bold text-black">{order.price}</p>

                </div>
                <div className="flex justify-between items-end">
                  <p ></p>
                  {order.status === "Approved" ? (
  <div className="flex items-center gap-2"> {/* Adjust gap here */}
    <button className="text-[12px] text-white bg-[#1D7C42] w-[83px] h-[38px] rounded-lg">
      Track order
    </button>
    <button className="bg-[#1D7C42] p-2.5  w-[38px] h-[38px]  rounded-lg text-white">
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
) : (
  <button className="bg-[#1D7C42] p-2.5  w-[38px] h-[38px]  rounded-lg text-white">
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
)}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
