import React, { useState, useEffect, useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiArrowLeft, FiLoader, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../../axios"; // Custom axios instance (make sure this is set up correctly)
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster"; // Assuming you have a toaster component
import { Loader } from "../../../components/global/Loader";
import { AppContext } from "../../../context/AppContext";

const Cart = () => {
  // For storing the cart data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize navigate function
  const [deletingItem, setDeletingItem] = useState(null); // Track the item being deleted
  const { setAddToCart, addtoCart, setUpdate } = useContext(AppContext);

  const handleRemove = async (item) => {
    const productId = item.productId._id;

    setDeletingItem(item._id);

    try {
      const response = await axios.post("user/delete-cart-item", {
        productId: productId,
      });

      if (response.data.success) {
        setAddToCart((prev) =>
          prev.filter((cartItem) => cartItem._id !== item._id)
        );

        SuccessToast("Item removed from cart!");
        setUpdate((prev) => !prev);
      } else {
        ErrorToast("Failed to remove item. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      ErrorToast("An error occurred. Please try again.");
    } finally {
      setDeletingItem(null);
    }
  };

  const handleAddGrams = (id) => {
    setAddToCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, grams: (item.grams || 1) + 1 } : item
      )
    );
  };

  const handleReduceGrams = (id) => {
    setAddToCart((prev) =>
      prev.map((item) =>
        item._id === id && item.grams > 1
          ? { ...item, grams: item.grams - 1 }
          : item
      )
    );
  };
  console.log(addtoCart, "addtoCart////");
  const subtotal = addtoCart?.reduce(
    (sum, item) => sum + item?.productPrice * item?.grams,
    0
  );
  const platformFee = subtotal > 0 ? 10 : 0; // Only charge fee if subtotal > 0
  const total = subtotal > 0 ? subtotal + platformFee : 0; // Avoid negative total

  // Function to handle "Proceed to Checkout" button click
  const handleProceedToCheckout = () => {
    // Pass the cartData as state when navigating to the review order page
    navigate("/app/review-order", { state: { addtoCart } });
  };

   const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
              <button className="text-gray-800 pr-3" onClick={handleBackClick}>
                <FiArrowLeft size={20} />
              </button>
              <h3 className="text-[16px] lg:text-xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
                Cart  
              </h3>
            </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {addtoCart?.length === 0 ? (
          <p className="text-center text-gray-400 ">
            No items in your cart yet.
          </p>
        ) : (
          addtoCart?.map((item) => (
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
                  {/* <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {item.fullfillmentMethod}
                  </span> */}
                  <button
                    onClick={() => handleRemove(item)} // Pass the full item object dynamically
                    className="text-red-500 flex items-center"
                    disabled={deletingItem === item._id} // Disable button while deleting
                  >
                    {deletingItem === item._id ? (
                      <FiLoader className="animate-spin text-red-500 text-xl" /> // Loader icon
                    ) : (
                      <FiTrash2 size={18} /> // Regular trash icon
                    )}
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
          ))
        )}
      </div>

      {/* Additional Details */}

      {/* Billing Summary */}
      <h1 className="mb-2 font-semibold text-[13px]">Billing</h1>
    <div className="mb-6 bg-gray-50 p-4 rounded-xl text-sm">
  <div className="flex justify-between mb-2">
    <span>Subtotal</span>
    <span>${subtotal?.toFixed(2)}</span>
  </div>
  <div className="flex justify-between mb-2">
    <span>2% platform fees</span>
     <span>${(subtotal * 0.02)?.toFixed(2)}</span> {/* 2% fee amount */}
  </div>
  <div className="flex justify-between font-semibold text-green-700 text-base">
    <span>Total</span>
    <span>${(subtotal * 1.02)?.toFixed(2)}</span> {/* Total me 2% add ho gaya */}
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
