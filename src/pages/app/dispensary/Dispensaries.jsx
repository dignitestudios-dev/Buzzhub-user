import React, { useState, useEffect, useContext } from "react";
import { FiArrowLeft, FiHeart, FiSearch } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router";
import FilterModal from "../../../components/app/dashboard/FilterModal"; // Adjust the import path as necessary
import axios from "../../../axios"; // Assuming you have a custom axios instance for API calls
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import { AppContext } from "../../../context/AppContext";
import { getDistance } from "geolib";

const Dispensaries = () => {
  const [dispensaries, setDispensaries] = useState([]); // State for storing dispensaries data
  const [filteredDispensaries, setFilteredDispensaries] = useState([]); // State for filtered dispensaries
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for showing filter modal
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filters, setFilters] = useState({}); // State to store filters
  const navigate = useNavigate();

  // Fetch dispensaries data on component mount
  const fetchDispensaries = async (filterParams = {}) => {
    try {
      const response = await axios.get("user/get-all-dispensaries", {
        params: {
          ...filterParams,
          page: 1,
          limit: 100,
        },
      });
      if (response.data.success) {
        setDispensaries(response.data.data); // Store dispensary data
        setFilteredDispensaries(response.data.data); // Initially show all dispensaries
      } else {
        console.log("No dispensaries found or failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching dispensaries:", error);
    }
  };
  useEffect(() => {
    fetchDispensaries(); // Call the function to fetch data
  }, []);

  // Handle back navigation
  const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };

  // Handle wishlist click for dispensaries
  const handleWishlistClick = async (type, id) => {
    try {
      let endpoint = "/user/add-to-wishlist"; // Default endpoint for products
      let requestBody = {
        [`${type}Id`]: id, // Dynamic key for dispensaryId or productId based on type
      };

      if (type === "dispensary") {
        endpoint = "/user/add-to-wishlist-dispensary"; // Dispensary-specific endpoint
        requestBody = {
          dispensaryId: id, // Sending dispensaryId directly for dispensary items
        };
      }

      const response = await axios.post(endpoint, requestBody);

      if (response.data.success) {
        SuccessToast(response.data.message); // Display message from API directly
      } else {
        ErrorToast(response.data.message); // Display error message from API directly
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      ErrorToast("Error adding to wishlist");
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter dispensaries locally based on search query
    if (query.trim() === "") {
      setFilteredDispensaries(dispensaries);
    } else {
      const filtered = dispensaries.filter((dispensary) =>
        dispensary.dispensaryName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDispensaries(filtered);
    }
  };

  // Apply filters to the dispensaries
  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);

    // Apply filters to dispensaries data
    const filtered = dispensaries.filter((dispensary) => {
      let isMatch = true;

      // Check fulfillment method
      if (
        appliedFilters.fulfillmentMethod &&
        dispensary.fulfillmentMethod !== appliedFilters.fulfillmentMethod
      ) {
        isMatch = false;
      }

      // Check price range (assuming you have a price property in the dispensary object)
      if (
        appliedFilters.productPrice &&
        (dispensary.price < 0 || dispensary.price > appliedFilters.productPrice)
      ) {
        isMatch = false;
      }

      // Check ratings (assuming dispensary has a `rating` property)
      if (
        appliedFilters.productRating &&
        dispensary.rating < appliedFilters.productRating
      ) {
        isMatch = false;
      }

      return isMatch;
    });

    setFilteredDispensaries(filtered);
    fetchDispensaries(appliedFilters);
  };
  const { user } = useContext(AppContext);
  const locationData =
    JSON.parse(localStorage?.getItem("userData")) || JSON.stringify([0, 0]); // Fallback to [0, 0] if coordinates are not available

  const [place1, setPlace1] = useState({});
  const [place2, setPlace2] = useState({});
  useEffect(() => {
    if (user?.location?.coordinates) {
      setPlace2({
        latitude: user.location.coordinates[1],
        longitude: user.location.coordinates[0],
      });
    }
  }, [user?.location?.coordinates]);

  // Calculate the distance between product's dispensary and user
  const distance = getDistance(place1, place2);
  return (
    <div className="w-full mx-auto bg-white min-h-screen pb-20">
      <div className="flex items-center justify-between mb-8">
        {/* Back Button */}
        <button className="text-gray-800 pr-3" onClick={handleBackClick}>
          <FiArrowLeft size={20} />
        </button>

        {/* Heading (centered on mobile, beside back button on desktop) */}
        <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Dispensaries
        </h3>
      </div>

      <div className="flex sm:justify-start sm:items-center gap-4 mb-6">
        {/* Search and Filter on the Right */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-start">
          {/* Search */}
          <div className="relative w-full sm:w-[250px]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery} // Bind input value to searchQuery state
              onChange={handleSearchChange} // Update searchQuery on change and filter locally
              className="w-full bg-[#F3F3F3] border-none focus:ring-2 focus:ring-green-500 focus:outline-none rounded-full py-2 pl-10 pr-4 text-sm placeholder-gray-400"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)} // Open filter modal
            className="flex items-center gap-2 bg-[#F3F3F3] text-gray-700 hover:text-green-600 px-4 py-2 rounded-full transition text-sm"
          >
            <CiFilter className="text-lg" />
          </button>
        </div>
      </div>

      {/* Dispensary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDispensaries.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No dispensaries available
          </p>
        ) : (
          filteredDispensaries.map((dispensary) => (
            <div
              key={dispensary._id}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 min-w-[168px] min-h-[212px] w-full h-full"
              onClick={
                () => navigate(`/app/dispensary-profile/${dispensary._id}`) // Navigate to dispensary profile with dispensaryId
              }
            >
              <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
                {distance
                  ? `${(distance * 0.000621371).toFixed(2)} miles`
                  : "0.0 miles"}
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating to profile
                  handleWishlistClick("dispensary", dispensary._id); // Handle wishlist click
                }}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer"
              >
                <FiHeart className="text-gray-400 hover:text-red-500" />
              </div>

              <img
                src={dispensary.profilePicture}
                alt={dispensary.dispensaryName}
                className="w-full h-[130px] object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-[13px] font-semibold text-gray-900">
                    {dispensary.dispensaryName}
                  </h3>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {dispensary.fulfillmentMethod}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters} // Pass the onApplyFilters function
        filters={filters} // Pass current filters to the modal
      />
    </div>
  );
};

export default Dispensaries;
