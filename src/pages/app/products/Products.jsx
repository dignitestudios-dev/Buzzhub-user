import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiHeart, FiSearch } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router";
import axios from "../../../axios"; // Import the axios instance from your custom setup
import FilterModal from "../../../components/app/dashboard/FilterModal";
import { getDistance } from "geolib";

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for showing filter modal
  const [products, setProducts] = useState([]); // Default products as an empty array
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store errors if any
  const [filters, setFilters] = useState({
    productPrice: "",
    productRating: 0,
    fulfillmentMethod: "",
    productType: "",
    productStrain: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [userLocation, setUserLocation] = useState([0, 0]); // User's location (latitude, longitude)

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };

  // Fetch all products when the page loads
  const fetchProducts = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await axios.get("user/get-all-products", {
        params: {
          ...filterParams,
          page: 1,
          limit: 100,
        },
      });

      if (response?.data?.success) {
        setProducts(response?.data?.data?.products || []); // Set products to empty array if no products found
        setFilteredProducts(response?.data?.data?.products || []); // Initially set filtered products to all fetched products
      }
    } catch (error) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading state to false once data is fetched
    }
  };

  // Trigger fetch on page load
  useEffect(() => {
    fetchProducts(); // Fetch all products without any filters or search on page load
    // Fetch user's location (e.g., from localStorage or an API)
    const locationData = JSON.parse(localStorage?.getItem("userData")) || [
      0, 0,
    ];
    setUserLocation(locationData?.location?.coordinates || [0, 0]);
  }, []);

  // Function to handle the application of filters from FilterModal
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters); // Update filters state
    setIsFilterOpen(false); // Close the modal after applying filters
    fetchProducts(newFilters); // Re-fetch products with new filters
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products locally based on search query
    if (query.trim() === "") {
      // If search query is empty, show all products
      setFilteredProducts(products);
    } else {
      // Otherwise, filter products by name
      const filtered = products?.filter((product) =>
        product?.productName?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading...</p>
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
    <div className="w-full mx-auto pb-20 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button className="text-gray-800 pr-3" onClick={handleBackClick}>
          <FiArrowLeft size={20} />
        </button>
        <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Products
        </h3>
      </div>

      <div className="flex sm:justify-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-start">
          <div className="relative w-full sm:w-[250px]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery} // Bind input value to searchQuery state
              onChange={handleSearchChange} // Update searchQuery on change and filter locally
              className="w-full bg-[#F3F3F3] border-none focus:ring-2 focus:ring-green-500 focus:outline-none rounded-full py-2 pl-10 pr-4 text-sm placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)} // Open filter modal
            className="flex items-center gap-2 bg-[#F3F3F3] text-gray-700 hover:text-green-600 px-4 py-2 rounded-full transition text-sm"
          >
            <CiFilter className="text-lg" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        ) : (
          filteredProducts?.map((item) => {
            // Calculate distance for each product
            const dispensaryCoordinates =
              item?.dispensaryId?.location?.coordinates;

            // Check if coordinates are valid, otherwise show a fallback or default behavior
            let distance = null;
            if (dispensaryCoordinates?.length === 2) {
              distance = getDistance(
                {
                  latitude: dispensaryCoordinates[1],
                  longitude: dispensaryCoordinates[0],
                },
                { latitude: userLocation[1], longitude: userLocation[0] }
              );
            } else {
              // Handle case when coordinates are missing, can show default message or skip calculation
              distance = "Location data unavailable";
            }
            return (
              <div
                key={item._id}
                className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 min-w-[168px] min-h-[212px] w-full h-full"
                onClick={() => navigate(`/app/product-details/${item._id}`)} // Navigate to product details with productId
              >
                {/* Distance */}
                <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
                  {distance
                    ? `${(distance / 1609.34).toFixed(2)} miles`
                    : "0.0 miles"}
                </div>
                <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                  <FiHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <img
                  src={item?.productImage[0]} // Assuming the first image in the array
                  alt={item?.productName}
                  className="w-full h-[130px] object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[13px] font-semibold text-gray-900">
                      {item?.productName}
                    </h3>
                    <div className="flex items-center text-sm text-yellow-500 font-semibold">
                      <span className="mr-1">⭐</span>{" "}
                      {item?.averageRating || "0.0"}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {item?.productType}
                  </div>
                  <div className="flex items-center mt-1">
                    <img
                      src={item?.dispensaryId?.profilePicture}
                      alt="Dispensary Profile"
                      className="w-[24px] h-[24px] rounded-full object-cover mr-2"
                    />
                    <div className="flex justify-between w-full items-center">
                      <div className="text-[12px] text-green-600">
                        Dispensary
                      </div>
                      <div className="text-gray-800 font-semibold text-[14px]">
                        ${item?.productPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters} // Pass the handler to the modal
        filters={filters} // Pass the current filters to the modal
      />
    </div>
  );
};

export default Products;
