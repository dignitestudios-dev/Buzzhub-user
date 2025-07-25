import React, { useState, useEffect, useContext } from "react";
import { Logo, notification, buy } from "../../assets/export";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { AppContext } from "../../context/AppContext";

const DummyNavbar = () => {
  const navigate = useNavigate();
  const { addtoCart, notifications } = useContext(AppContext);

  return (
    <header className="w-full h-16 flex items-center bg-[#1D7C42] justify-between px-4 bg-gray/50 shadow-sm border-b border-gray-200">
      <div
        className="flex items-center lg:hidden md:hidden border-r pr-4"
        onClick={() => navigate("/app/dashboard")}
      ></div>

      <div className="flex items-center justify-end gap-3 lg:justify-end md:justify-end w-full">
        <button
          aria-label="View cart"
          className="relative text-white transition duration-300 p-1 bg-white/10 bg-opacity-30 rounded-full "
          onClick={() => navigate("/app/cart")}
        >
          <img
            src={buy}
            alt="Buy"
            className="w-auto h-auto rounded-full object-contain"
          />
          {addtoCart?.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold shadow-md">
              {addtoCart.length}
            </span>
          )}
        </button>

        <button
          aria-label="Notifications"
          className="relative text-white transition duration-300 p-1 bg-white/10 bg-opacity-30 rounded-full "
          onClick={() => navigate("/app/notifications")}
        >
          <img
            src={notification}
            alt="Notification"
            className="w-auto h-auto rounded-full object-contain"
          />
          {notifications?.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold shadow-md">
              {notifications.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default DummyNavbar;
