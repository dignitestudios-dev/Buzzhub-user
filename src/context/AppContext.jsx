import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "../axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [addtoCart, setAddToCart] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("user/get-cart-items");
      if (response.status === 200) {
        setAddToCart(response?.data?.data?.items);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [update]);
  
  console.log(addtoCart, "addtoCart==>");
  return (
    <AppContext.Provider
      value={{
        addtoCart,
        setAddToCart,
        setUpdate,
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
