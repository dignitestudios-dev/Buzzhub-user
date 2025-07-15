import React, { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import axios from "../../../axios"; // Assuming you have a custom axios instance for API calls

const Favorites = () => {
  const [activeTab, setActiveTab] = useState("Dispensary");
  const [wishlist, setWishlist] = useState([]); // State to store wishlist data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [wishlistDisp, setWishlistDisp] = useState([]);


console.log(wishlistDisp, "Fetching wishlist data for active tab:");

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true); // Set loading state to true when fetching
      try {
        let response;
        if (activeTab === "Dispensary") {
          response = await axios.get("user/get-my-wishlist-dispensary");
          if (response.data.success) {
          setWishlistDisp(response.data.data); // Set wishlist data based on active tab
        }
        } else if (activeTab === "Items") {
          response = await axios.get("user/get-my-wishlist");
          if (response.data.success) {
          setWishlist(response.data.data); // Set wishlist data based on active tab
        }
        }
        
      } catch (err) {
        setError("Failed to load wishlist items.");
        console.error("Error fetching wishlist:", err);
        setWishlist([]); // In case of error, set wishlist to empty
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchWishlist();
  }, [activeTab]); // Dependency on activeTab to fetch data whenever the tab changes

  // Loading and Error states
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading Wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">Favorites</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-green-50 p-1 rounded-xl mb-4">
        {["Dispensary", "Items"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-1/2 py-2 rounded-lg p-2 text-sm transition ${
              activeTab === tab ? "bg-[#1D7C42] text-white" : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "Dispensary" ? (
        <div className="space-y-4">
          {Array.isArray(wishlistDisp?.dispensaryId) && wishlistDisp.dispensaryId.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item._id}
                className="relative flex items-start gap-4 p-0.5 border border-gray-200 rounded-2xl shadow-sm bg-[#F9FAFA]"
              >
                <img
                  src={item.DispensaryDetails.profilePicture}
                  alt={item.DispensaryDetails.dispensaryName}
                  className="w-[82px] h-[82px] rounded-2xl object-cover"
                />
                <div className="flex-1 pt-2">
                  <h3 className="font-semibold text-sm text-gray-800 ">
                    {item.DispensaryDetails.dispensaryName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.DispensaryDetails.city}, {item.DispensaryDetails.state}
                  </p>
                  <p className="text-xs text-yellow-600 mt-1 font-medium">
                    ⭐ {item.DispensaryDetails.rating || "N/A"}
                  </p>
                </div>
                <button className="text-green-600 absolute top-3 right-3 hover:text-green-800">
                  <FiHeart size={20} />
                </button>
              </div>
            ))
          ) : (
            <p>No dispensary items in your wishlist.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(wishlist) && wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item._id}
                className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 min-w-[168px] min-h-[212px] w-full h-full"
              >
                <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
                  {item.DispensaryDetails.city}, {item.DispensaryDetails.state}
                </div>

                <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                  <FiHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>

                {/* Product Image */}
                <img
                  src={item.ProductDetails.productImage} // Assuming you want to show the first image
                  alt={item.ProductDetails.productName}
                  className="w-full h-[130px] object-cover rounded-t-xl"
                />

                {/* Product Content */}
                <div className="p-4">
                  {/* Product Name + Rating */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-[13px] font-semibold text-gray-900">
                      {item.ProductDetails.productName}
                    </h3>
                    <div className="flex items-center text-sm text-yellow-500 font-semibold">
                      <span className="mr-1">⭐</span> {item.ProductDetails.rating || "N/A"}
                    </div>
                  </div>

                  {/* Product Type */}
                  <div className="text-sm text-gray-500 mt-1">{item.ProductDetails.productType}</div>

                  {/* Dispensary Section */}
                  <div className="flex items-center mt-1">
                    <img
                      src={item.DispensaryDetails.profilePicture}
                      alt="Dispensary Profile"
                      className="w-[24px] h-[24px] rounded-full object-cover mr-2"
                    />
                    <div className="flex justify-between w-full items-center">
                      <div className="text-[12px] text-green-600">Dispensary</div>
                      <div className="text-gray-800 font-semibold text-[14px]">
                        ${item.ProductDetails.productPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No product items in your wishlist.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
