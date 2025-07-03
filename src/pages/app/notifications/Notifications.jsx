import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

// Sample notification data
const sampleNotifications = [
  {
    id: "1",
    title: "Notification",
    message: "Notification",
    time: "2 hours ago",
    type: "order",
    image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  },
  {
    id: "2",
    title: "Notification",
    message: "Notification",
    time: "Yesterday",
    type: "account",
    image: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
  },
  {
    id: "3",
    title: "Notification",
    message: "Notification",
    time: "3 days ago",
    type: "promo",
    image: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const handleRemove = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full  mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        {/* <button className="p-1 text-gray-600 hover:text-black">
          <IoMdArrowBack size={24} />
        </button> */}
        <h2 className="text-2xl font-semibold">Notifications</h2>
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No notifications available.</div>
      ) : (
        <div className="space-y-4">
         {notifications.map((notification) => (
  <div
    key={notification.id}
    className="flex gap-3 items-start border-b pb-3 bg-white relative"
  >
    <div className="flex-1">
      {/* Make title and time flex container, justify-between */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-sm text-gray-800">
          {notification.title}
        </h3>
        <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
          {notification.time}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default Notifications;
