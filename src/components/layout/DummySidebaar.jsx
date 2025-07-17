import { NavLink } from "react-router";
import { sidebarData } from "../../static/Sidebar";
import { Logo } from "../../assets/export";

const DummySidebaar = ({ isMobile, toggleSidebar }) => {
  // Function to handle logout
  const handleLogout = () => {
    // Clear localStorage and cookies
    localStorage.clear();
    
    // Delete cookies (if you want to remove specific cookies, do it individually)
    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    
    // Optionally, you can redirect the user to a login page or home page
    // window.location.href = "/login"; // Or any route you wish to redirect to
  };

  return (
    <div
      className={`${
        isMobile ? "w-1/2" : "w-full"
      } h-full overflow-y-auto px-4 py-6 bg-gray-50 shadow-md rounded-xl flex flex-col gap-4`}
    >
      {/* Logo at the top */}
      <div className="flex items-center gap-3 px-10 ">
        <img
          src={Logo}
          alt="logo-organization"
          loading="lazy"
          className="h-32 w-32 "
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Sidebar links */}
      {sidebarData?.map((item) => (
        <NavLink
          key={item.link}
          to={item.link}
          className={({ isActive }) =>
            // Check if the current item is 'Logout' to apply special styles
            `group flex items-center gap-3 w-full lg:px-4 lg:py-3 rounded-xl transition-all duration-300 font-medium
            ${item.title === "Logout" 
              ? "text-red-600 hover:text-red-600" // Red text for Logout
              : isActive 
                ? "lg:border lg:border-[#1D7C42] text-[#1D7C42] lg:shadow-sm" 
                : "lg:text-gray-600 hover:border lg:border-[#1D7C42]/30 text-[#1D7C42]"}`  
          }
          onClick={() => {
            if (item.title === "Logout") {
              handleLogout(); // Trigger logout logic when the user clicks Logout
            }
            if (isMobile) {
              toggleSidebar(); // Close sidebar on mobile click
            }
          }}
        >
          {/* Only apply red icon for Logout */}
          <span className={`text-lg ${item.title === "Logout" ? "text-red-600" : ""}`}>
            {item.icon}
          </span>
          <span className={`${item.title === "Logout" ? "text-red-600" : ""} text-sm`}>
            {item.title}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default DummySidebaar;
