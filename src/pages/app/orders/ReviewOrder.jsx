import React from "react"; 
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

const ReviewOrder = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const subtotal = 160;
  const platformFee = 10;
  const total = subtotal - platformFee;

  // Function to handle "Place Order" button click
  const handlePlaceOrder = () => {
    navigate("/app/order-details"); // Navigate to order-details page
  };

  return (
    <div className="w-full mx-auto bg-white lg:border lg:border-gray-200 lg:p-4 pb-20 lg:pb-4 rounded-2xl">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">Review Order</h2>

      {/* Shipping Address */}
      <span className="font-medium block mb-1 mt-2">Shipping Address</span>
      <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
        <p className="text-gray-700 leading-6">
          John Doe 123 Cannabis Ave, Toronto, ON M4B 1B3, Canada
        </p>
      </div>

      {/* Phone Number */}
      <span className="font-medium block mt-2 pr-2 pt-2">Phone Number</span>
      <div className="bg-gray-50 p-4 rounded-xl  text-sm space-y-1">
        <p className="text-gray-700">+1 (555) 123-4567</p>
      </div>

      {/* Medical Cards */}
      <div className=" p-4 rounded-xl  text-sm space-y-2">
        <span className="font-medium block">Medical Cards</span>
        <div className="flex gap-3">
          <img
            src="https://via.placeholder.com/100x60?text=Card+Front"
            alt="Medical Card Front"
            className="w-28 h-16 object-cover rounded-lg border"
          />
          <img
            src="https://via.placeholder.com/100x60?text=Card+Back"
            alt="Medical Card Back"
            className="w-28 h-16 object-cover rounded-lg border"
          />
        </div>
      </div>

      {/* Purchased Items */}
      <div>
        <h3 className="text-sm font-semibold mb-2 ">Purchased Items</h3>
        <div className="bg-gray-50 p-4 rounded-xl space-y-2">
          <div className="flex items-start gap-3">
            <img
              src={cartItem.image}
              alt={cartItem.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{cartItem.name}</p>
              <p className="text-green-600 font-semibold text-sm">
                ${cartItem.price.toFixed(2)}
              </p>
              <span className="text-xs text-gray-600">{cartItem.weight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Summary */}
      <div>
        <h3 className="text-sm font-semibold mb-2 mt-4">Billing</h3>
        <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>1% platform fees</span>
            <span>${platformFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-green-700 text-base pt-2 ">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl font-semibold text-sm"
        onClick={handlePlaceOrder} // Navigate to order-details when clicked
      >
        Place Order
      </button>
    </div>
  );
};

export default ReviewOrder;
