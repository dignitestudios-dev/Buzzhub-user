import { Outlet } from "react-router";
import DummyNavbar from "../components/layout/DummyNavbar";
import DummySidebaar from "../components/layout/DummySidebaar";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage, Logo } from "../assets/export";
import DashboardBottomBar from "../components/layout/DashboardBottomBar";
import { RxHamburgerMenu } from "react-icons/rx";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage sidebar state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if screen size is mobile

  useEffect(() => {
    if (!navigator.onLine) {
      setOpenNoInternet(true);
    }

    // Resize listener to handle mobile vs desktop
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
     <aside
  className={`${
    isMobile ? "hidden" : "block"
  } w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm overflow-y-auto`}
>
  <DummySidebaar isMobile={false} />
</aside>

      {/* Main layout (navbar + outlet) */}
      <div className="flex flex-col w-full min-h-screen">
        <DummyNavbar />

        {/* Hamburger Menu on Mobile */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-5 text-xl text-white left-4 z-50 md:hidden"
          >
            <RxHamburgerMenu />
          </button>
        )}

        <main className="flex-grow p-4 md:p-8 bg-white overflow-y-auto">
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Bar (only visible on mobile) */}
      {isMobile && <DashboardBottomBar />}

      {/* Preload image */}
      <img src={NoInternetImage} alt="" className="hidden" />
      
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar Drawer */}
      <div
  className={`fixed inset-0 z-50 shadow-lg transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out md:hidden`}
>
  <DummySidebaar isMobile={true} toggleSidebar={toggleSidebar} />
</div>
    </div>
  );
};

export default DashboardLayout;
