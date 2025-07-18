import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router"; 
import axios from "../../../axios"; 
import Loader from "../../../components/global/Loader";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Log to check the order ID coming from the URL
  console.log("Extracted Order ID from URL:", id);

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
        orderId: id
      });

      console.log("API Response:", response.data);

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
    totalAmount,
    fulfillmentMethod,
    orderStatus,
    dispensaryName,
    orderUvid
  } = orderDetails || {};

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
          <span className="text-gray-700 font-medium">{orderUvid}</span> {/* Use orderUvid from the API */}
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-3">
          <span>Fulfillment Method</span>
          <span className="text-gray-700 font-medium">{fulfillmentMethod}</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 pb-3">
          <span>Status</span>
          <span className={`text-sm font-medium ${orderStatus === "Approved" ? "text-green-600" : "text-yellow-500"}`}>{orderStatus}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="rounded-2xl p-3 shadow-sm bg-[#F9FAFA] border border-[#E5E5E5] mt-3">
        {products?.map((product) => (
          <div key={product._id} className="flex gap-3 items-center mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-[62px] h-[62px] mt-2 rounded-md object-cover"
            />
            <div className="flex flex-col gap-0.5 flex-1 mt-3">
              <p className="text-[15px] font-medium">{product.name}</p>
              <p className="text-xs text-gray-500">{product.gram}g</p>
              <p className="text-sm font-bold">${product.price}</p>
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
            <span>${totalAmount}</span>
          </div>
          <div className="flex justify-between font-semibold text-green-700 text-base pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl font-semibold text-sm"
        onClick={() => navigate(`/app/order-tracking/${id}`)} // Navigate to the tracking page with the correct order ID
      >
        Track Order
      </button>
    </div>
  );
};

export default OrderDetails;
