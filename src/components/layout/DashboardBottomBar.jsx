import { useState } from "react";
import { NavLink } from "react-router";  // Import NavLink from react-router-dom
import { chat, home, profile, homeinactive, profileactive, chatactive } from "../../assets/export"; // Ensure correct import path

// New list specifically for BottomBar
const bottomBarLinks = [
  { title: "Chat", link: "/app/chat", icon: chat, activeIcon: chatactive },
  { title: "Home", link: "/app/dashboard", icon: homeinactive, activeIcon: home },
  { title: "Profile", link: "/app/profile", icon: profile, activeIcon: profileactive }
];

const DashboardBottomBar = () => {
  const [activeLink, setActiveLink] = useState("/app/dashboard");  // Set the default active link (Home)

  // Handle the link click and set the active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-green-600 rounded-full shadow-lg px-6 py-3 flex justify-between items-center">
      {bottomBarLinks.map((item) => (
        <NavLink
          key={item.link}
          to={item.link}
          onClick={() => handleLinkClick(item.link)}  // Update active link on click
          className={`flex flex-col items-center justify-center text-xs font-medium transition duration-200 ${
            activeLink === item.link ? "text-white" : "text-white/70"
          }`}
        >
          {/* Dynamically change the icon based on the active state */}
          <img
            src={activeLink === item.link ? item.activeIcon : item.icon}  // Switch icons based on active state
            alt={item.title}
            className="text-xl"
          />
          <span className="text-[11px] mt-1">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardBottomBar;
