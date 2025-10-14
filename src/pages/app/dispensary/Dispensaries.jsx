import React, { useState, useEffect, useContext } from "react";
import { FiArrowLeft, FiHeart, FiSearch } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router";
import FilterModal from "../../../components/app/dashboard/FilterModal";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import { AppContext } from "../../../context/AppContext";
import { getDistance } from "geolib";

const Dispensaries = () => {
  const [dispensaries, setDispensaries] = useState([]);
  const [filteredDispensaries, setFilteredDispensaries] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distances, setDistances] = useState({}); // 👈 object for multiple dispensary distances

  const { user } = useContext(AppContext);

  // ✅ Fetch all dispensaries
  const fetchDispensaries = async (filterParams = {}) => {
    try {
      const response = await axios.get("user/get-all-dispensaries", {
        params: { ...filterParams, page: 1, limit: 100 },
      });
      if (response.data.success) {
        setDispensaries(response.data.data);
        setFilteredDispensaries(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dispensaries:", error);
    }
  };

  useEffect(() => {
    fetchDispensaries();
  }, []);

  // ✅ Get current user location (one time)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Location denied:", err);
        setCurrentLocation(null);
      }
    );
  }, []);

  // ✅ Calculate all distances when currentLocation or data changes
  useEffect(() => {
    if (currentLocation && filteredDispensaries.length > 0) {
      const updatedDistances = {};
      filteredDispensaries.forEach((dispensary) => {
        if (dispensary?.location?.coordinates?.length === 2) {
          const dispensaryLocation = {
            latitude: dispensary.location.coordinates[1],
            longitude: dispensary.location.coordinates[0],
          };
          const distMeters = getDistance(currentLocation, dispensaryLocation);
          const distMiles = (distMeters / 1609.34).toFixed(2); // ✅ meters → miles
          updatedDistances[dispensary._id] = distMiles;
        }
      });
      setDistances(updatedDistances);
    }
  }, [currentLocation, filteredDispensaries]);

  const handleBackClick = () => navigate(-1);

  const handleWishlistClick = async (type, id) => {
    try {
      let endpoint = "/user/add-to-wishlist-dispensary";
      const response = await axios.post(endpoint, { dispensaryId: id });

      if (response.data.success) SuccessToast(response.data.message);
      else ErrorToast(response.data.message);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      ErrorToast("Error adding to wishlist");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") setFilteredDispensaries(dispensaries);
    else {
      const filtered = dispensaries.filter((dispensary) =>
        dispensary.dispensaryName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDispensaries(filtered);
    }
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    fetchDispensaries(appliedFilters);
  };

  return (
    <div className="w-full mx-auto bg-white min-h-screen pb-20">
      <div className="flex items-center justify-between mb-8">
        <button className="text-gray-800 pr-3" onClick={handleBackClick}>
          <FiArrowLeft size={20} />
        </button>
        <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Dispensaries
        </h3>
      </div>

      <div className="flex sm:justify-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-start">
          <div className="relative w-full sm:w-[250px]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#F3F3F3] border-none focus:ring-2 focus:ring-green-500 focus:outline-none rounded-full py-2 pl-10 pr-4 text-sm placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-[#F3F3F3] text-gray-700 hover:text-green-600 px-4 py-2 rounded-full transition text-sm"
          >
            <CiFilter className="text-lg" />
          </button>
        </div>
      </div>

      {/* ✅ Dispensary Cards */}
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
              onClick={() =>
                navigate(`/app/dispensary-profile/${dispensary._id}`)
              }
            >
              <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
                {distances[dispensary._id]
                  ? `${distances[dispensary._id]} miles`
                  : "0.0 miles"}
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistClick("dispensary", dispensary._id);
                }}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer"
              >
                <FiHeart className="text-gray-400 hover:text-red-500" />
              </div>

              <img
                src={dispensary.profilePicture || "https://placehold.co/600x400"}
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

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        filters={filters}
      />
    </div>
  );
};

export default Dispensaries;
