import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router";
import axios from "../../../axios"; // Assuming you have a custom axios instance for API calls
import Loader from "../../../components/global/Loader";

const statusColors = {
  Pending: "text-yellow-500",
  Approved: "text-green-600",
  Rejected: "text-red-500",
  InProcess: "text-orange-500",  // New status color
  OutForDelivery: "text-blue-500", // New status color
  Ready: "text-purple-500",  // New status color
  Completed: "text-green-600",  // New status color
};

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("Order Request");
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("user/view-order");
      if (response.data.success && response.data.data) {
        const { All } = response.data.data;

        // Map orders to simplified format for UI
        const mappedOrders = All.map((order) => ({
          id: order._id,  // Correct MongoDB _id
          status: order.orderStatus,
          orderUvid: order.orderUvid,  // Map the orderUvid
          products: order.products.map((product) => ({
            name: product.productName || "Item name",
            weight: `${product.gram} gram`,
            price: `$${product.productPrice}`,  // Use the correct price here
            image: product.productImage?.[0],
          })),
          totalPrice: `$${order.totalAmount}`,
          location: order.shippingAddress || order.dispensaryDetails?.city,
          type:
            order.fulfillmentMethod?.toLowerCase().includes("pickup") ||
            order.products[0]?.isPickup === "true"
              ? "Pickup"
              : "Delivery",
        }));

        setOrders(mappedOrders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getFilters = () => {
    if (activeTab === "Order Request") {
      return ["All", "Pending", "Approved", "Rejected"];
    } else if (activeTab === "Order Tracking") {
      return ["All", "In Process", "Out For Delivery", "Ready", "Completed"];
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "All") return true;

    return activeTab === "Order Request"
      ? order.status === filter
      : order.status === filter; // For "Order Tracking", use the status filter
  });

  const handleOrderDetailsClick = (orderId) => {
    navigate(`/app/order-details/${orderId}`);  // Here, `orderId` is the MongoDB _id
  };
const handleTrackOrderClick = (orderId) => {
  // Find the order by orderId
  const selectedOrder = orders.find((order) => order.id === orderId);

  // Pass selected order to the OrderTracking page
  navigate(`/app/order-tracking/${orderId}`, {
    state: { order: selectedOrder }
  });
};

  return (
    <div className="w-full lg:mb-0 md:mb-0 mb-24 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button className="p-1" onClick={() => navigate(-1)}>
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
            className={`w-1/2 py-2 rounded-lg text-sm transition ${
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
        {loading ? (
          <div className="text-center text-gray-500"><Loader /></div>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          filteredOrders.map((order, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 shadow-sm bg-[#F9FAFA] border border-[#E5E5E5]"
            >
              {/* Order ID + Status */}
              <div className="flex justify-between items-center mb-2 border-b pb-2">
                <p className="text-sm text-[#1D7C42] font-medium">
                  Order Id:{" "}
                  <span className="text-[#1D7C42] font-normal">{order.orderUvid}</span>
                </p>
                <p className={`text-sm font-medium ${statusColors[order.status.replace(/\s+/g, '')]}`}>
                  {order.status}
                </p>
              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-3 mb-3">
                {order.products.map((product, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-xs text-[#1D7C42] font-medium">{product.weight}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Location & Total Price */}
              <div className="text-xs text-gray-500 flex items-center mb-1">
                <HiOutlineLocationMarker className="mr-1" />
                {order.location}
              </div>
              <p className="text-[18px] font-bold text-black">Total: {order.totalPrice}</p>

              {/* Buttons */}
              <div className="flex justify-end items-center gap-2 mt-2">
  {/* Track order button - Only shown if order status matches one of the specified statuses */}
  {["Approved", "In Process", "Out For Delivery", "Ready", "Completed"].includes(order.status) && (
    <button
      onClick={() => handleTrackOrderClick(order.id)}
      className="text-[12px] text-white bg-[#1D7C42] w-[83px] h-[38px] rounded-lg"
    >
      Track order
    </button>
  )}
  
  {/* Order Details button */}
  <button
    onClick={() => handleOrderDetailsClick(order.id)}  // Use the correct orderId (_id)
    className="bg-[#1D7C42] p-2.5 w-[38px] h-[38px] rounded-lg text-white"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
