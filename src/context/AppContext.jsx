import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "../axios";
import { NotificationToast } from "../components/global/Toaster";
import { onMessageListener } from "../firebase/messages";
import getFCMToken from "../firebase/getFcmToken";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [addtoCart, setAddToCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("user/get-cart-items");

      if (response.status === 200) {
        setAddToCart(response?.data?.data?.items);
      }
    } catch (error) {
      if (error?.status === 404) {
        setMessage("Error fetching cart items:", error);
        setAddToCart([]);
      }
    }
  };

  const getNotification = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        "/user/get-notification-content-user"
      );

      if (status === 200) {
        const list = Array.isArray(data?.data)
          ? data.data
          : data?.data?.notifications ?? [];

        setNotifications(list);
        return;
      }
    } catch (error) {
      console.error("getNotification error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [update]);

  const getFcm = async () => {
    try {
      const fcmTokenResponse = await getFCMToken();
      setFcmToken(fcmTokenResponse);
    } catch (err) {
      console.log("🚀 ~ getFcm ~ err:", err);
      ErrorToast(err);
    }
  };

  useEffect(() => {
    getFcm();
  }, []);

  useEffect(() => {
    const listenForMessages = async () => {
      try {
        const payload = await onMessageListener();
        console.log(payload)
        NotificationToast({
          title: payload.notification?.title,
          message: payload.notification?.body,
        });
        getNotification(); 
      } catch (err) {
        console.log("onMessageListener failed:", err);
      }
    };

    listenForMessages();
  }, []);

  return (
    <AppContext.Provider
      value={{
        addtoCart,
        setAddToCart,
        setUpdate,
        notifications,
        loading,
        fcmToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
