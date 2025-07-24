import { FaCheck } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation

const OrderTracking = () => {
  const navigate =useNavigate()
  const location = useLocation();
  const order = location?.state?.order?.state?.order;
console.log(order,"order==>")
  // Define the order statuses for progression
  const statuses = [
    "In Process",
    "Approved",
    "Out For Delivery",
    "Ready",
    "Completed",
  ];

  // Get the index of the current status
  const currentStatusIndex = statuses.indexOf(order?.status);

  // Create the steps based on the order status
  const steps = [
    { label: "In Process", completed: currentStatusIndex >= 0 },
    { label: "Approved", completed: currentStatusIndex >= 1 },
    { label: "Out For Delivery", completed: currentStatusIndex >= 2 },
    { label: "Ready", completed: currentStatusIndex >= 3 },
    { label: "Completed", completed: currentStatusIndex >= 4 },
  ];

  // Check if the order status is "Completed"
  const isCompleted = order.orderStatus === "Completed";

  return (
    <div className="w-full mx-auto bg-white min-h-screen font-sans text-[15px] pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <MdArrowBack className="text-2xl" />
        </div>
        <p className="font-semibold text-[15px]">Order Tracking</p>
        <div className="w-6" />
      </div>

      {/* Order Summary */}
      <div className="rounded-2xl p-3 shadow-sm bg-[#F9FAFA] border border-[#E5E5E5] mt-3">
        {/* Flex container for Order ID and Price */}
        <div className="flex justify-between items-center mb-2 border-b pb-2">
          <p className="text-sm text-[#1D7C42] font-medium">
            Order Id:{" "}
            <span className="text-[#1D7C42] font-normal">
              {order.orderUvid}
            </span>
          </p>

          {Array.isArray(order?.products) && order.products.length > 0 && (
            <div className="flex items-center ml-4">
              <p className="text-xs md:text-sm mr-2">{order?.dispensaryName}</p>
              <img
                src={
                  order?.dispensaryProfile ||
                  "/default-dispensary.png"
                }
                alt="dispensary"
                className="w-[20px] h-[20px] md:w-8 md:h-8 rounded-full object-cover mr-2"
              />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-3 mb-3">
          {Array.isArray(order?.products) &&
            order?.products?.map((product, index) => (
              <div key={index} className="flex gap-3 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[62px] h-[62px] mt-2 rounded-md object-cover"
                />
                <div className="flex flex-col gap-0.5 flex-1">
                  <p className="text-[15px] font-medium">{product.name}</p>
                  <p className="flex items-center text-xs text-gray-500">
                    <HiOutlineLocationMarker className="mr-1 text-gray-500" />
                    {order?.location || "No location"}
                  </p>
                  <p className="text-xs text-black">{product.weight}</p>
                </div>
                <div className="text-right">
                  <p className="text-[18px] font-bold">
                  $ {(
                  parseFloat(product.price.replace("$", "")) *
                  parseFloat(product.weight)
                ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Tracking Steps */}
      <div className="mt-6 relative">
        <div className="absolute top-0 left-2.5 w-[2px] h-full bg-green-500" />
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-3 items-start mb-8">
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
            <p
              className={`text-[13px] ${
                step.completed ? "text-[#4C9A2A]" : "text-[#D9EBD0]"
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Conditional Feedback & Chat Buttons */}
      {isCompleted && (
        <div className="flex justify-between gap-4 mt-6">
          {/* Give Feedback Button */}
          <button
            onClick={() => (window.location.href = "/app/feedback")}
            className="w-1/2 bg-[#1D7C42] text-white text-sm py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            Give Feedback
          </button>

          {/* Chat Button */}
          <button className="w-1/2 bg-[#F3F3F3] text-[#1D7C42] text-sm py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <IoChatbubbleEllipsesOutline className="text-[#1D7C42] text-lg" />
            Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
