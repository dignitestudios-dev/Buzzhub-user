
// static/Sidebar.js or .ts
import { GoHome } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineDocument } from "react-icons/hi2";

import { IoDocumentOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";

import { CiHome } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";





export const sidebarData = [
  { title: "Home", link: "/app/dashboard", icon: <CiHome /> },
    { title: "Notifications", link: "/app/notifications", icon: <IoIosNotificationsOutline /> },

  { title: "Chat", link: "/app/chat", icon: <CiChat1 /> },
    { title: "Favorites", link: "/app/favorites", icon: <CiHeart /> },

  { title: "Profile", link: "/app/profile", icon: <CiUser /> },
  
  { title: "Cart", link: "/app/cart", icon: <CiShoppingCart /> },
      { title: "Order History", link: "/app/orders", icon: <GiShoppingCart /> },

      { title: "Logout", link: "/auth/login", icon: <IoIosLogOut /> },

];
