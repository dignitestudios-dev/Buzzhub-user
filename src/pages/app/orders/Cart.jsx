import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../../axios"; // Custom axios instance (make sure this is set up correctly)
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster"; // Assuming you have a toaster component
import Loader from "../../../components/global/Loader";

const Cart = () => {
  const [cartData, setCartData] = useState(null); // For storing the cart data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("user/get-cart-items");
        if (response.data.success) {
          setCartData(response.data.data); // Set cart data to state
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems(); // Fetch cart items on component mount
  }, []); // Only run on mount

  if (loading) {
    return (
      <div className="w-full h-screen flex ">
        <Loader /> 
      </div>
    );
  }
const handleRemove = async (item) => {
  const productId = item.productId._id; // Extract the product ID dynamically from the item

  try {
    // Send DELETE request to the API to remove the item from the cart
    const response = await axios.post("user/delete-cart-item", {
      productId: productId, // Send the productId as a string
    });

    if (response.data.success) {
      // Update local state by removing the item
      setCartData((prev) => ({
        ...prev,
        items: prev.items.filter((cartItem) => cartItem._id !== productId),
      }));
      SuccessToast("Item removed from cart!");
      window.location.reload(); // Reload the page to reflect changes
    } else {
      ErrorToast("Failed to remove item. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    ErrorToast("An error occurred. Please try again.");
  }
};




  const handleAddGrams = (id) => {
    setCartData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item._id === id ? { ...item, grams: (item.grams || 1) + 1 } : item
      ),
    }));
  };

  const handleReduceGrams = (id) => {
    setCartData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item._id === id && item.grams > 1
          ? { ...item, grams: item.grams - 1 }
          : item
      ),
    }));
  };

  const subtotal = cartData?.items.reduce((sum, item) => sum + item.productPrice * item.grams, 0);
  const platformFee = 10;
  const total = subtotal - platformFee;

  // Function to handle "Proceed to Checkout" button click
 const handleProceedToCheckout = () => {
  // Pass the cartData as state when navigating to the review order page
  navigate("/app/review-order", { state: { cartData } });
};


  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-semibold">Cart</h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartData?.items?.map((item) => (
          <div
            key={item._id}
            className="flex gap-3 items-start p-1.5 bg-[#F9FAFA] border border-gray-200 rounded-xl shadow-sm relative"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-sm">{item.productName}</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <HiOutlineLocationMarker className="mr-1" />
                {item.dispensaryId.city}, {item.dispensaryId.state}
              </p>
              <p className="text-green-600 text-sm font-bold mt-1">
                ${item.productPrice.toFixed(2)}
              </p>
            </div>

            {/* Right side: Delete and Gram Controls */}
            <div className="flex flex-col items-end justify-between h-full">
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  {item.fullfillmentMethod}
                </span>
                <button
  onClick={() => handleRemove(item)} // Pass the full item object dynamically
  className="text-red-500"
>
  <FiTrash2 size={18} />
</button>

              </div>

              {/* Gram Control Buttons BELOW Delete */}
             {/* Gram Control Buttons BELOW Delete */}
{/* Gram Control Buttons BELOW Delete */}
<div className="flex items-center mt-4  p-1 border border-gray-400 rounded-md">
  <button
    onClick={() => handleReduceGrams(item._id)} // Call the handleReduceGrams function when minus button is clicked
    className="w-6 h-6 sm:w-7 sm:h-7 bg-[#1D7C42] text-white text-xs sm:text-sm pb-0.5 font-bold rounded-md"
  >
    -
  </button>
  <span className="font-medium text-xs sm:text-sm px-2">
    {item.grams || 1} gram{item.grams > 1 ? "s" : ""}
  </span>
  <button
    onClick={() => handleAddGrams(item._id)}
    className="w-6 h-6 sm:w-7 sm:h-7 bg-[#1D7C42] text-white text-xs sm:text-sm pb-0.5 font-bold rounded-md"
  >
    +
  </button>
</div>


            </div>
          </div>
        ))}
      </div>

      {/* Additional Details */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Add Additional Details"
          className="w-full px-4 py-3 bg-[#F9FAFA] text-black rounded-xl border border-gray-200 text-sm"
        />
      </div>

      {/* Billing Summary */}
      <h1 className="mb-2 font-semibold text-[13px]">Billing</h1>
      <div className="mb-6 bg-gray-50 p-4 rounded-xl text-sm">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>1% platform fees</span>
          <span>${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-green-700 text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold"
        onClick={handleProceedToCheckout} // Navigate when button is clicked
      >
        Proceed To Checkout
      </button>
    </div>
  );
};

export default Cart;
