import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useParams } from "react-router-dom"; // For dynamic routing
import axios from "../../../axios"
import { CiClock2 } from "react-icons/ci";
import { FiClock } from "react-icons/fi";

const DispensaryProfile = () => {
  const { dispensaryId } = useParams(); // Get dispensaryId from the route
  const [dispensary, setDispensary] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch dispensary data
  useEffect(() => {
    const fetchDispensaryData = async () => {
      try {
        const response = await axios.get(`/dispensary/details/${dispensaryId}`);
        
        // Log the response to check the structure
        console.log('API Response:', response.data);
        
        // Check if the response contains the expected data structure
        if (response.data && response.data.success) {
          const data = response.data.data;

          setDispensary(data.dispensary);
          setProducts(data.products);
        } else {
          setError("Dispensary data is missing.");
        }
      } catch (err) {
        console.error("Error fetching dispensary data:", err);
        setError("Failed to fetch dispensary data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDispensaryData();
  }, [dispensaryId]);

  // Handle loading and error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Handle the case where dispensary data is missing or undefined
  if (!dispensary) {
    return <div className="text-red-500">No dispensary data found.</div>;
  }

  return (
    <div className="w-full mx-auto bg-white rounded-2xl overflow-hidden mb-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-4 items-center mb-4 px-4">
        <img
          src={dispensary.profilePicture}
          className="w-20 h-20 rounded-full object-cover"
          alt={dispensary.dispensaryName}
        />
        <div className="text-center md:text-left mt-2 md:mt-0">
          <h2 className="text-lg font-semibold">
            {dispensary.dispensaryName}{" "}
            <span className="text-yellow-500 text-sm">★ {dispensary.averageRating || 4.8}</span>
          </h2>
          <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
            <HiOutlineLocationMarker className="text-green-500" />
            {dispensary.city}, {dispensary.state}
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
                        <FiClock  className="text-green-500" />

            Operating Hours: {new Date(dispensary.openingHourTime).toLocaleTimeString()} - {new Date(dispensary.closingHourTime).toLocaleTimeString()}
          </p>
          <p className="text-red-500 text-sm font-medium mt-1">{dispensary.fulfillmentMethod}</p>
          <span className="text-[#1D7C42] text-xs mt-1 block bg-[#1D7C421F] rounded-full p-2">{dispensary.deliveryRadius} Delivery Radius</span>
        </div>
      </div>

      {/* Dispensary Bio */}
      {/* <div className="px-4 mb-6">
        <p className="text-sm text-gray-700">{dispensary.bio}</p>
      </div> */}

      {/* Products */}
      <div className="grid grid-cols-2 gap-4 px-4 mb-6">
        {products.length > 0 ? (
          products.map((product, idx) => (
            <div key={idx} className="border rounded-xl overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="w-full h-28 object-cover"
                />
                <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Available for {product.fullfillmentMethod}
                </span>
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium">{product.productName}</h3>
                <p className="text-xs text-gray-500 mb-1">{product.productType}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-gray-800">${product.productPrice}</p>
                  <span className="text-yellow-500 text-sm flex items-center gap-1">
                    <FaStar size={12} /> {product.averageRating || 4.8}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>

      {/* Reviews */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800">Reviews</h3>
          <button className="text-green-500 text-xs underline">See all</button>
        </div>

        {dispensary.reviews && dispensary.reviews.length > 0 ? (
          dispensary.reviews.map((review, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow-sm mb-3">
              <div className="flex items-center mb-2">
                <img
                  src="https://source.unsplash.com/30x30/?person"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  alt="Reviewer"
                />
                <div>
                  <h4 className="text-sm font-semibold">{review.productName}</h4>
                  <p className="text-xs text-gray-400">{review.location}</p>
                </div>
                <span className="ml-auto font-bold text-green-600">${review.price}</span>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-xs" />
                ))}
              </div>
              <p className="text-xs text-gray-700">{review.text}</p>
            </div>
          ))
        ) : (
          <div>No reviews available</div>
        )}
      </div>
    </div>
  );
};

export default DispensaryProfile;
