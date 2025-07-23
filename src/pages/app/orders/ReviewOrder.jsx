import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewOrder = () => {
  const { state } = useLocation(); // Get the cartData passed from the Cart component
  const [cartData, setCartData] = useState(state?.cartData || []); // Initialize cartData from the state
  const [fulfillmentMethod, setFulfillmentMethod] = useState("Delivery");
  const [shippingAddress, setShippingAddress] = useState("");
  const [medicalCards, setMedicalCards] = useState({
    front: "",
    back: "",
  });
  const [drivingLicense, setDrivingLicense] = useState({
    front: "",
    back: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

   const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };
  
  // Calculate totals
  const subtotal = cartData?.items?.reduce((sum, item) => sum + item.productPrice * item.grams, 0);
  const platformFee = 10;
  const total = subtotal + platformFee;  // Adding platform fee to the total

  // Function to handle "Place Order" button click
  const handlePlaceOrder = () => {
    navigate("/app/order-details"); // Navigate to order-details page
  };

  useEffect(() => {
    if (fulfillmentMethod === "Self Pickup") {
      setShippingAddress("123 Pickup Ave, Toronto, ON M4B 1B3, Canada"); // Prefilled address for self pickup
    } else {
      setShippingAddress(""); // Clear address when changing fulfillment method to delivery
    }

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      // Set medical card images from localStorage
      setMedicalCards({
        front: userData.medicalCardFront,
        back: userData.medicalCardBack,
      });
      
      // Set driving license images from localStorage
      setDrivingLicense({
        front: userData.drivingLicenseFront,
        back: userData.drivingLicenseBack,
      });

      // Set phone number from localStorage
      setPhoneNumber(userData.phoneNumber);
    }
  }, [fulfillmentMethod]);

  return (
    <div className="w-full mx-auto bg-white lg:border lg:border-gray-200 lg:p-4 pb-20 lg:pb-4 rounded-2xl">
<div className="flex items-center justify-between mb-8">
        <button
          className="text-gray-800 pr-3"
          onClick={handleBackClick}
        >
          <FiArrowLeft size={20} />
        </button>
        <h3 className="text-[16px] lg:text-xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Review Order
        </h3>
      </div>
      {/* Fulfillment Method */}
      <div className="mb-4">
        <span className="font-medium block mb-2">Fulfillment Method</span>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="fulfillment"
              value="Delivery"
              checked={fulfillmentMethod === "Delivery"}
              onChange={() => setFulfillmentMethod("Delivery")}
              className="mr-2"
            />
            Delivery
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="fulfillment"
              value="Self Pickup"
              checked={fulfillmentMethod === "Self Pickup"}
              onChange={() => setFulfillmentMethod("Self Pickup")}
              className="mr-2"
            />
            Self Pickup
          </label>
        </div>
      </div>

      {/* Conditionally render Shipping Address */}
      {fulfillmentMethod === "Delivery" ? (
        <>
          <span className="font-medium block mb-1 mt-2">Shipping Address</span>
          <div className="p-1 rounded-xl text-sm space-y-2">
            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full text-gray-700 p-2 rounded-md border"
              placeholder="Enter your delivery address"
            />
          </div>
        </>
      ) : (
        <>
          <span className="font-medium block mb-1 mt-2">Pickup Address</span>
          <div className="p-1 rounded-xl text-sm space-y-2">
            <p className="text-gray-700 leading-6">{shippingAddress}</p>
          </div>
        </>
      )}

      {/* Phone Number */}
      <span className="font-medium block mt-2 pr-2 pt-2">Phone Number</span>
      <div className=" p-1 rounded-xl text-sm space-y-1">
        <input
          type="text"
          value={phoneNumber}
          maxLength={11}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full text-gray-700 p-2 rounded-md border"
        />
      </div>

      {/* Medical Cards */}
      <div className="p-4 rounded-xl text-sm space-y-2">
        <span className="font-medium block">Medical Cards</span>
        <div className="flex gap-3">
          {medicalCards.front ? (
            <img
              src={medicalCards.front}
              alt="Medical Card Front"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
          {medicalCards.back ? (
            <img
              src={medicalCards.back}
              alt="Medical Card Back"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
        </div>
      </div>

      {/* Driving License */}
      <div className="p-4 rounded-xl text-sm space-y-2">
        <span className="font-medium block">Driving License</span>
        <div className="flex gap-3">
          {drivingLicense.front ? (
            <img
              src={drivingLicense.front}
              alt="Driving License Front"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
          {drivingLicense.back ? (
            <img
              src={drivingLicense.back}
              alt="Driving License Back"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
        </div>
      </div>

      {/* Purchased Items */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Purchased Items</h3>
        <div className="bg-gray-50 p-4 rounded-xl space-y-2">
          {cartData?.items?.map((item) => (
            <div key={item._id} className="flex items-start gap-3">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.productName}</p>
                <p className="text-green-600 font-semibold text-sm">
                  ${item.productPrice.toFixed(2)}
                </p>
                <span className="text-xs text-gray-600">{item.grams} grams</span>
              </div>
            </div>
          ))}
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
          <div className="flex justify-between font-semibold text-green-700 text-base pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl font-semibold text-sm"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default ReviewOrder;
