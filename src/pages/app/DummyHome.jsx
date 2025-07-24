import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { CiClock2, CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router";
import FilterModal from "./../../components/app/dashboard/FilterModal";
import axios from "../../axios"; // Importing the axios instance
import { ErrorToast, SuccessToast } from "../../components/global/Toaster"; // Importing Toasts
import Loader from "../../components/global/Loader";

// Dispensary Card Component
const DispensaryCard = ({ item, addToWishlist, isLiked }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/app/dispensary-profile/${item._id}`);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent redirection
    e.stopPropagation(); // Prevent event bubbling (which might trigger card click)
    addToWishlist("dispensary", item._id); // Call the addToWishlist function for dispensary
  };

  return (
    <div
      className="relative cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition duration-300 
        min-w-[168px] min-h-[212px] w-full h-full"
      onClick={handleCardClick}
    >
      <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
        {item.distance ? `${item.distance.toFixed(1)} miles` : "0.0"}
      </div>

    <div className="absolute top-2 right-2 z-20 bg-white p-1 rounded-full shadow-lg">

        <FaHeart
          className={`cursor-pointer ${
            isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          onClick={handleWishlistClick} // Trigger    wishlist action on heart click
        />
      </div>

      <div className="relative">
        <img
          src={item.profilePicture}
          alt={item.dispensaryName}
          className="w-full h-[130px] object-cover rounded-t-xl"
        />
        <div className="absolute bottom-2 right-2 bg-gray-50 text-xs font-medium px-2 py-1 rounded-md shadow text-gray-700">
          {item.disType}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[13px] font-semibold text-gray-900">
            {item.dispensaryName}
          </h3>
          <div className="flex items-center text-sm text-yellow-500 font-semibold">
            <FaStar className="mr-1" /> {item.rating || "0.0"}
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-1">{item.city || "N/A"}</div>

        <div className="text-[12px] text-gray-500 mt-1">
          {item.state || "N/A"}
        </div>
        <div className="flex mt-3 items-center font-[600] gap-2 text-[12px] text-gray-600">
          <CiClock2 className="text-lg" />
          <span>{item?.createdAt?.split("T")[1]?.slice(0, 5)}</span>
          {"-"}
          <span>
            {" "}
            {(() => {
              const [h, m] =
                item?.closingHourTime?.split("T")[1]?.slice(0, 5)?.split(":") ||
                [];
              const hr = +h % 12 || 12;
              const ampm = +h >= 12 ? "PM" : "AM";
              return `${hr}:${m} ${ampm}`;
            })()}
          </span>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ item, addToWishlist, isLiked }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/app/product-details/${item._id}`); // Product Details page
  };

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent redirection
    e.stopPropagation(); // Prevent event bubbling (which might trigger card click)
    addToWishlist("product", item._id); // Call the addToWishlist function for product
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 min-w-[168px] min-h-[250px] w-full h-full"
      onClick={handleCardClick}
    >
      {/* Location Badge */}
      <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
        {item.dispensaryId.city}, {item.dispensaryId.state}
      </div>

      {/* Wishlist Icon */}
      <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
        <FaHeart
          className={`cursor-pointer ${
            isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          onClick={handleWishlistClick} // Trigger wishlist action on heart click
        />
      </div>

      {/* Product Image */}
      <img
        src={item.productImage[0]} // Assuming the productImage is an array
        alt={item.productName}
        className="w-full h-[130px] object-cover rounded-t-xl"
      />

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[13px] font-semibold text-gray-900">
            {item.productName}
          </h3>
          <div className="flex items-center text-sm text-yellow-500 font-semibold">
            <FaStar className="mr-1" /> {item.averageRating || "0.0"}
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-1">
          {item.productType || "Not Specified"}
        </div>

        <div className="flex items-center mt-2 justify-between">
          {/* Dispensary Name and Profile Picture */}
          <div className="flex items-center space-x-2">
            <img
              src={item.dispensaryId.profilePicture}
              alt={item.dispensaryId.dispensaryName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-sm text-gray-700 font-semibold">
              {item.dispensaryId.dispensaryName}
            </div>
          </div>

          {/* Price */}
          <div className="text-green-600 font-semibold text-[14px]">
            ${item.productPrice?.toFixed(2) || "0.0"}
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Component to display a title and cards
// Section Component to display a title and cards


const Section = ({
  title,
  data = [],
  type,
  addToWishlist,
  loading,
  likedProducts = [],
  likedDispensaries = [],
}) => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    if (title === "Popular Products" || title === "New Products") {
      navigate("/app/products");
    } else if (title === "Nearby Dispensaries") {
      navigate("/app/dispensaries");
    }
  };

  return (
    <div className="mb-12 -mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <button
          onClick={handleSeeAll}
          className="text-[#1D7C42] hover:text-green-600 rounded-full text-xs font-medium"
        >
          See all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-full h-[250px] bg-gray-100 animate-pulse rounded-xl"
              ></div>
            ))

              : data.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No nearby dispensaries available.
              </div>
            ) 
          : data?.map((item) =>
              type === "dispensary" ? (
                <DispensaryCard
                  key={item._id}
                  item={item}
                  addToWishlist={addToWishlist}
                  isLiked={likedDispensaries.includes(item._id)}
                />
              ) : (
                <ProductCard
                  key={item._id}
                  item={item}
                  addToWishlist={addToWishlist}
                  isLiked={likedProducts.includes(item._id)}
                />
              )
            )}
      </div>
    </div>
  );
};




// Main Home Component
const DummyHome = () => {
  const [nearbyDispensaries, setNearbyDispensaries] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredDispensaries, setFilteredDispensaries] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [products, setProducts] = useState([]); // Loading state
  const [likedDispensaries, setLikedDispensaries] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  const fetchWishlist = async () => {
    try {
      const [dispensaryRes, productRes] = await Promise.all([
        axios.get("/user/get-my-wishlist-dispensary"),
        axios.get("/user/get-my-wishlist"),
      ]);

      if (dispensaryRes.status === 200) {
        const dispensaryIds = dispensaryRes.data.data?.dispensaryId?.map((item)=>item?._id);
        setLikedDispensaries(dispensaryIds);
      }

      if (productRes.status === 200) {
        const productIds = productRes?.data?.data?.map((item) => item?.ProductDetails?._id);
        setLikedProducts(productIds);
      }
    } catch (err) {
      console.error(
        "Error fetching wishlist:",
        err?.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    
    const fetchNearbyDispensaries = async () => {
    setLoading(true);

      try {
        const response = await axios.get("/user/get-nearby-dispensary");
        if (response.data.success) {
          setNearbyDispensaries(response.data.data || []);
          setFilteredDispensaries(response.data.data || []);
        } else {
          console.error("Failed to fetch dispensaries");
          setNearbyDispensaries([]);
          setFilteredDispensaries([]);
        }
      } catch (error) {
        console.error("Error fetching nearby dispensaries:", error);
        setNearbyDispensaries([]);
        setFilteredDispensaries([]);
      }
    };

    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get("/user/get-popular-products");
        if (response.data.success) {
          const products = response.data.data.popularProducts || [];
          setPopularProducts(products);
          setFilteredProducts(products);
        } else {
          console.error("Failed to fetch popular products");
          setPopularProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching popular products:", error);
        setPopularProducts([]);
        setFilteredProducts([]);
      }
    };
    const fetchNewPopularProducts = async () => {

      try {
        const response = await axios.get("/user/get-all-products");
        if (response.data.success) {
          const products = response.data.data.products || [];
          setProducts(products);
        } else {
          console.error("Failed to fetch popular products");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching popular products:", error);
        setProducts([]);
      }finally{
         setLoading(false);
      }
    };

    // Start loading

    fetchNearbyDispensaries();
    fetchPopularProducts();
    fetchNewPopularProducts();

    // Set loading to false when done
   
  }, []);

  // Handle search input change and filter results
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter dispensaries
    const filteredDispensaries = nearbyDispensaries.filter(
      (dispensary) =>
        dispensary.dispensaryName.toLowerCase().includes(query) ||
        dispensary.city.toLowerCase().includes(query)
    );
    setFilteredDispensaries(filteredDispensaries);

    // Filter products
    const filteredProducts = popularProducts.filter(
      (product) =>
        product.productName.toLowerCase().includes(query) ||
        product.productType.toLowerCase().includes(query)
    );
    setFilteredProducts(filteredProducts);
  };

  // Function to handle adding/removing from wishlist
  const addToWishlist = async (type, id) => {
    try {
      const endpoint =
        type === "dispensary"
          ? "/user/add-to-wishlist-dispensary"
          : "/user/add-to-wishlist";

      const payload =
        type === "dispensary" ? { dispensaryId: id } : { productId: id };

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        SuccessToast(response.data.message);
        fetchWishlist(); // Refresh wishlist after like/dislike
      } else {
        ErrorToast(response.data.message);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      ErrorToast("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-end items-center mb-10 border-b border-gray-100 pb-5 px-2">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 text-base">
              <FiSearch />
            </span>
            <input
              type="text"
              placeholder="Search for products or dispensaries..."
              className="w-full bg-[#F3F3F3] focus:ring-2 focus:ring-green-500 focus:outline-none rounded-full pl-10 pr-4 py-2 placeholder-gray-400 text-sm"
              value={searchQuery}
              onChange={handleSearchChange} // On change, filter data
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-[#F3F3F3] hover:border-green-500 text-gray-700 hover:text-green-600 px-2 py-2 rounded-full transition duration-200 text-sm"
          >
            <CiFilter className="text-lg" />
          </button>
        </div>
      </div>

      {/* Sections displaying Nearby Dispensaries and Popular Products */}
      <Section
        title="Nearby Dispensaries"
        data={filteredDispensaries}
        type="dispensary"
        addToWishlist={addToWishlist}
        loading={loading}
        likedDispensaries={likedDispensaries}
      />

      <Section
        title="Popular Products"
        data={filteredProducts}
        type="product"
        addToWishlist={addToWishlist}
        loading={loading}
        likedProducts={likedProducts}
      />

      <Section
        title="New Products"
        data={products}
        type="product"
        addToWishlist={addToWishlist}
        loading={loading}
        likedProducts={likedProducts}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default DummyHome;
