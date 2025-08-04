import React, { useContext, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // <- usually this
import axios from "../../../axios";
import { AppContext } from "../../../context/AppContext";
// import { ErrorToast, SuccessToast } from "wherever-your-toasts-are";

const Notifications = () => {
  const navigate = useNavigate();

  const { notifications, loading } = useContext(AppContext);

  const handleBackClick = () => navigate(-1);

  return (
    <div className="w-full mx-auto pb-20 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button className="text-gray-800 pr-3" onClick={handleBackClick}>
          <FiArrowLeft size={20} />
        </button>

        <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Notifications
        </h3>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading…</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No notifications available.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id || n._id} // fallback
              className="flex gap-3 items-start border-b pb-3 bg-white relative"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-sm text-gray-800">
                    {n.title || n.heading}
                  </h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {n.time || n.createdAt
                      ? new Date(n.time || n.createdAt).toLocaleString()
                      : ""}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  {n.message || n.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
