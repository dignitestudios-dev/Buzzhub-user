import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";

const cartItems = [
  {
    id: "1",
    name: "Item name",
    weight: "50gram",
    grams: 1,
    price: 40,
    location: "Toronto, Canada",
    type: "Delivery",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Item name",
    weight: "50gram",
    grams: 1,
    price: 40,
    location: "Toronto, Canada",
    type: "Delivery",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddGrams = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, grams: (item.grams || 1) + 1 } : item
      )
    );
  };

  const handleReduceGrams = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.grams > 1
          ? { ...item, grams: item.grams - 1 }
          : item
      )
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.grams, 0);
  const platformFee = 10;
  const total = subtotal - platformFee;

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        {/* <button className="p-1">
          <IoMdArrowBack size={24} />
        </button> */}
        <h2 className="text-2xl font-semibold">Cart</h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 items-start p-1.5 bg-[#F9FAFA] border border-gray-200 rounded-xl shadow-sm relative"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <HiOutlineLocationMarker className="mr-1" />
                {item.location}
              </p>
              <p className="text-green-600 text-sm font-bold mt-1">
                ${item.price.toFixed(2)} 
              </p>
              {/* <div className="mt-2 flex gap-2 items-center">
                <span className="bg-gray-100 px-2 py-1 text-xs rounded-full">
                  {item.weight}
                </span>
                
              </div> */}
            </div>

            {/* Right side: Delete and Gram Controls */}
            <div className="flex flex-col items-end justify-between h-full">
             <div className="flex items-center gap-2">
  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
    {item.type}
  </span>
  <button
    onClick={() => handleRemove(item.id)}
    className="text-red-500"
  >
    <FiTrash2 size={18} />
  </button>
</div>

              {/* Gram Control Buttons BELOW Delete */}
              <div className="flex items-center mt-4 space-x-4 p-1 border border-gray-400 rounded-md">
                <span className="font-medium text-xs px-2">
                  {item.grams || 1} gram{item.grams > 1 ? "s" : ""}
                </span>
                <button
                  onClick={() => handleAddGrams(item.id)}
                  className="w-7 h-7 bg-[#1D7C42] text-white text-sm pb-0.5 font-bold rounded-md"
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
          <span  >1% platform fees</span>
          <span>${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-green-700 text-base">
          <span >Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold">
        Proceed To Checkout
      </button>
    </div>
  );
};

export default Cart;
