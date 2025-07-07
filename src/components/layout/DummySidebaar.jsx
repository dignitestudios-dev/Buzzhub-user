import { NavLink } from "react-router";
import { sidebarData } from "../../static/Sidebar";
import { Logo } from "../../assets/export";

const DummySidebaar = ({ isMobile, toggleSidebar }) => {
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
            `group flex items-center gap-3 w-full lg:px-4 lg:py-3 rounded-xl transition-all duration-300 font-medium
            ${isActive ? "lg:border lg:border-[#1D7C42] text-[#1D7C42] lg:shadow-sm" : "lg:text-gray-600 hover:border lg:border-[#1D7C42]/30 text-[#1D7C42] "}` // Fixed typo
          }
          onClick={() => isMobile && toggleSidebar()} // Close sidebar on mobile click
        >
          <span className="text-lg ">{item.icon}</span>
          <span className="text-sm">{item.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default DummySidebaar;
