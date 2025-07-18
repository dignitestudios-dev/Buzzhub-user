import React from "react";
import { Logo, notification, buy } from "../../assets/export";  // Import notification and buy images
import { useNavigate } from "react-router";

const DummyNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full h-16 flex items-center bg-[#1D7C42] justify-between px-4 bg-gray/50 shadow-sm border-b border-gray-200">
      {/* Logo (optional for center or left alignment on mobile) */}
      <div className="flex items-center lg:hidden md:hidden border-r pr-4" onClick={() => navigate("/app/dashboard")}>
        {/* Display the Logo if needed */}
        {/* <img src={Logo} alt="Logo" className="w-12 h-12 object-cover" /> */}
      </div>

      {/* Right actions */}
      <div className="flex items-center justify-end gap-3 lg:justify-end md:justify-end w-full">
        {/* Cart */}
        <button
          aria-label="View cart"
          className="relative text-white transition duration-300 p-1 bg-white/10 bg-opacity-30 rounded-full "
          onClick={() => navigate("/app/cart")}
        >
          <img 
            src={buy} 
            alt="Buy" 
            className="w-auto h-auto rounded-full object-contain" // Ensuring the icon is fully rounded and retains its aspect ratio
          />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold shadow-md">
            3
          </span>
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative text-white transition duration-300 p-1 bg-white/10 bg-opacity-30 rounded-full "
          onClick={() => navigate("/app/notifications")}
        >
          <img 
            src={notification} 
            alt="Notification" 
            className="w-auto h-auto rounded-full object-contain" // Same here, ensuring the icon is fully rounded
          />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold shadow-md">
            3
          </span>
        </button>

        {/* Profile */}
        {/* <button
          aria-label="User profile"
          className="relative p-0 rounded-full overflow-hidden bg-gray-200 bg-opacity-30 hover:ring-2 hover:ring-gray-500"
          onClick={() => navigate("/app/profile")}
        >
          <img
            src={Logo}
            alt="user-avatar"
            className="w-9 h-9 rounded-full object-cover border border-green-500"
          />
        </button> */}
      </div>
    </header>
  );
};

export default DummyNavbar;
