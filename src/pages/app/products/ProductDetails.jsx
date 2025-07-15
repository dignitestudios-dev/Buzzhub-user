import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import axios from "../../../axios"; // Assuming axios is set up as described earlier

const ProductDetails = () => {
  const [product, setProduct] = useState(null); // State to store product details
  const [grams, setGrams] = useState(1);
  const [fulfillment, setFulfillment] = useState("self");

  const { productId } = useParams(); // Get productId from URL params
  const navigate = useNavigate();

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.post("/user/get-products-byId-user", {
          productId,
        });

        if (response.data.success) {
          setProduct(response.data.data.products); // Set product data
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleAddToCart = () => {
    alert(`Added ${grams}g to cart with ${fulfillment === "self" ? "Self Pickup" : "Home Delivery"}`);
  };

  if (!product) return <div>Loading...</div>; // Show loading state while fetching data

  // Destructure the reviews safely to avoid errors
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  return (
    <div className="w-full mx-auto rounded-2xl overflow-hidden mb-20">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.productImage[0]} // Display the first image from productImage array
          alt={product.productName}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="">
        <div className="flex justify-between items-start mb-2 mt-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{product.productName}</h2>
            <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700">{product.productType}</span></p>
            <p className="text-sm text-gray-500 mb-1">Subcategory: <span className="font-medium text-gray-700">{product.subTypes.join(", ")}</span></p>
            <p className="text-green-600 font-bold text-xl mt-1">${product.productPrice} <span className="text-sm text-gray-500">/gram</span></p>
          </div>
          <div className="flex items-center text-yellow-500 text-sm font-semibold">
            <FaStar className="mr-1" />
            {product.averageRating || "N/A"}
          </div>
        </div>

        {/* Dispensary Info */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img
              src={product.dispensaryId.profilePicture} // Use dispensary profile picture
              alt={product.dispensaryId.dispensaryName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{product.dispensaryId.dispensaryName}</p>
              <p className="text-xs text-gray-500">{product.dispensaryId.city}, {product.dispensaryId.state} • {product.dispensaryId.distance ? `${product.dispensaryId.distance.toFixed(1)} miles away` : "N/A"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-red-500 text-sm font-semibold">Delivery / Pickup</p>
            <button className="text-blue-600 text-xs underline" onClick={() => navigate(`/app/dispensary-profile/${product.dispensaryId._id}`)}>
              View Profile
            </button>
          </div>
        </div>

        {/* Input & Fulfillment */}
        <div className="space-y-4 mt-4 border-t pt-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Enter Grams</label>
            <input
              type="number"
              value={grams}
              min={1}
              onChange={(e) => setGrams(Number(e.target.value))}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Fulfillment Method</p>
            <div className="flex gap-4 mt-1">
              {["self", "delivery"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fulfillment"
                    value={type}
                    checked={fulfillment === type}
                    onChange={() => setFulfillment(type)}
                    className="h-4 w-4 border-gray-300 bg-white text-green-600"
                  />
                  <span className="text-sm text-gray-700">
                    {type === "self" ? "Self Pickup" : "Home Delivery"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2 border-t pt-4">Product Description</h3>
          <p className="text-sm text-gray-600 mb-2">{product.productDescription}</p>
        </div>

        {/* Warnings */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Warnings</h3>
          <p className="text-sm text-gray-600">{product.warningDescription}</p>
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-gray-800">Reviews</h3>
            <button className="text-blue-600 text-xs underline">See all</button>
          </div>

          {/* Scrollable Review Container */}
          <div className="flex overflow-x-auto space-x-4 snap-x snap-mandatory scrollbar-hide">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="w-[321px] h-[225px] snap-center bg-gray-50 p-4 rounded-lg shadow-sm shrink-0"
                >
                  <div className="flex items-center text-yellow-500 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.review}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <img
                      src={review.userId.profilePicture}
                      className="w-6 h-6 rounded-full"
                      alt="Reviewer"
                    />
                    <span className="text-sm font-medium text-gray-800">{review.userId.fullName}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No reviews yet</p>
            )}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 mt-4 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
