import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "../../../axios";
import { MdArrowBack } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Loader } from "../../../components/global/Loader";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { order } = location?.state || {};

  console.log(order, "orderData");
  // Fetch order details from the API
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      if (!id) {
        console.error("Order ID is missing");
        return;
      }

      console.log("Sending orderId in the request body:", { orderId: id });

      const response = await axios.post("user/view-order-by-id", {
        orderId: id,
      });

      // Assuming response.data directly contains the order data
      if (response.data && response.data._id) {
        setOrderDetails(response.data); // Set the order details
      } else {
        console.error("Order data not found in response", response.data);
        setOrderDetails(null); // Ensure the state is null if no data
      }
    } catch (error) {
      console.error("Failed to fetch order details", error);
      setOrderDetails(null); // Handle error by resetting the state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]); // Re-fetch the order details when `id` changes

  // Loading state
  if (loading) return <Loader />;

  // If no order details are found, show "Order not found"
  if (!orderDetails) return <p>Order not found!</p>;

  // Only destructure if `orderDetails` is not null
  const {
    products,
    shippingAddress,  

    fulfillmentMethod,
    orderStatus,
    dispensaryName,
    orderUvid,
    createdAt,
    phoneNumber,
  } = orderDetails || {};
  const totalAmount = order?.state?.order?.products
    ? order.state.order.products.reduce((sum, product) => {
        const price = parseFloat(product.price.replace("$", ""));
        const weight = parseFloat(product.weight);
        return sum + price * weight;
      }, 0)
    : 0;

  const handleTrackOrderClick = () => {
    navigate(`/app/order-tracking/${id}`, {
      state: { order: order }, // ✅ pass the full orderDetails
    });
  };
  console.log(products, "vproducts");
  return (
    <div className="w-full mx-auto bg-white border border-gray-200 p-4 pb-20 lg:pb-0 rounded-2xl">
      {/* Header */}
      <div className="flex items-center  py-3">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <MdArrowBack className="text-2xl" />
        </div>

        <div className="w-6" />
        <div className="text-left">
          <h2 className="text-lg font-semibold">Order Details</h2>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white shadow-sm rounded-2xl p-5 text-sm space-y-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Order Summary
        </h2>

        {/* Order ID */}
        <div className="flex justify-between border-b pb-3 text-gray-600">
          <span className="font-medium">Order ID</span>
          <span className="text-gray-900">{orderUvid}</span>
        </div>

        {/* Order Created */}
        <div className="flex justify-between border-b pb-3 text-gray-600">
          <span className="font-medium">Order Created</span>
          <span className="text-gray-900">
            {new Date(createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>

        {/* Fulfillment Method */}
        <div className="flex justify-between border-b pb-3 text-gray-600">
          <span className="font-medium">Fulfillment Method</span>
          <span className="text-gray-900 capitalize">{fulfillmentMethod}</span>
        </div>

        {/* No. of Products */}
        <div className="flex justify-between border-b pb-3 text-gray-600">
          <span className="font-medium">No. of Products</span>
          <span className="text-gray-900">
            {order?.state?.order?.products?.length}
          </span>
        </div>

        {/* Phone Number */}
        <div className="flex justify-between border-b pb-3 text-gray-600">
          <span className="font-medium">Tel. No.</span>
          <span className="text-gray-900">{phoneNumber}</span>
        </div>

        {/* Status */}
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Status</span>
          <span
            className={`font-semibold ${
              orderStatus === "Approved"
                ? "text-green-600"
                : orderStatus === "Completed"
                ? "text-blue-600"
                : "text-yellow-500"
            }`}
          >
            {orderStatus}
          </span>
        </div>
      </div>

      {fulfillmentMethod?.toLowerCase() === "pickup" ? (
        <div className="bg-white my-5 rounded-xl p-4 shadow-sm border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            Pick Up Address
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed break-words">
            {order?.state?.order?.dispensarystreetAddress}
          </p>
        </div>
      ) : (
        <div className="bg-white my-5 rounded-xl p-4 shadow-sm border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            Shipping Address
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed break-words">
            {shippingAddress}
          </p>
        </div>
      )}

      {/* Product Details */}
      <div className="rounded-2xl p-3 shadow-sm bg-[#F9FAFA] border border-[#E5E5E5] mt-3">
        {order?.state?.order?.products?.map((product) => (
          <div key={product._id} className="flex gap-3 items-center mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-[62px] h-[62px] mt-2 rounded-md object-cover"
            />
            <div className="flex flex-col gap-0.5 flex-1 mt-3">
              <p className="text-[15px] font-medium">{product.name}</p>
              <p className="text-xs text-gray-500">{product.weight}</p>
              <p className="text-sm font-bold">
                $
                {(
                  parseFloat(product.price.replace("$", "")) *
                  parseFloat(product.weight)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Billing Summary */}
    <div>
  <h3 className="text-sm font-semibold mb-2 mt-2">Billing</h3>
  <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>${totalAmount.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <span>Platform Fee (2%)</span>
      <span className="text-red-500">${(totalAmount * 0.02).toFixed(2)}</span>
    </div>

    <div className="flex justify-between font-semibold text-green-700 text-base pt-2 border-t border-gray-200">
      <span>Total After Fee</span>
      <span>${(totalAmount * 1.02).toFixed(2)}</span>
    </div>
  </div>
</div>


      {/* CTA Button */}
      <div className="flex gap-4 mt-4 mb-2">
        <button
          className="w-1/2 bg-green-700 text-white py-3 rounded-xl font-semibold text-sm"
          onClick={handleTrackOrderClick}
        >
          Track Order
        </button>
        <button
          className="w-1/2 bg-white text-green-500 border border-green-500 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2" // Flex for icon and text alignment
          // onClick={handleChatClick}
        >
          <IoChatbubbleEllipsesOutline size={20} />{" "}
          {/* Adjust the icon size as needed */}
          Chat
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
