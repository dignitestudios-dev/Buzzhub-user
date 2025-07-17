import React, { useState, useEffect } from "react"; 
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios"; 
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import { FiArrowLeft } from "react-icons/fi";

const ProductDetails = () => {
  const [product, setProduct] = useState(null); 
  const [grams, setGrams] = useState();
  const [fulfillment, setFulfillment] = useState("self");

  const { productId } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.post("/user/get-products-byId-user", {
          productId,
        });

        if (response.data.success) {
          setProduct(response.data.data.products); 
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

  // Handle Add to Cart Button Click
  const handleAddToCart = async () => {
  try {
    const response = await axios.post("/user/add-to-cart", {
      productId: productId,
      dispensaryId: product.dispensaryId._id,
      grams: grams,
      fullfillmentMethod: fulfillment === "self" ? "Pickup" : "Delivery",
    });

    console.log(response);  

    if (response.data.success) {
      SuccessToast("Item added to cart!");
    } else {
      ErrorToast(response.data.message);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    ErrorToast("Grams cant be empty or an error occurred. Please try again.");
  }
};


  if (!product) return <div>Loading...</div>; 

  // Destructure the reviews safely to avoid errors
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];
  
  const availableMaxGrams = product.weightQuantity <= 300 ? product.weightQuantity : 300;

  const handleGramChange = (e) => {
    let value = Math.min(Number(e.target.value), availableMaxGrams); // Ensure grams don't exceed available stock or 300    
    if (isNaN(value) || value < 0) {
      value = ""; // Reset to 0 if input is invalid
    }
    setGrams(value);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <button
          className="text-gray-800 pr-3"
          onClick={handleBackClick}
        >
          <FiArrowLeft size={20} />
        </button>
        <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Product Details
        </h3>
      </div>
      
      <div className="w-full mx-auto rounded-2xl overflow-hidden mb-20">
        <div className="relative">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="">
          <div className="flex justify-between items-start mb-2 mt-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{product.productName}</h2>
              <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700">{product.productType}</span></p>
              <p className="text-sm text-gray-500 mb-1">Subcategory: <span className="font-medium text-gray-700">{product.subTypes.join(", ")}</span></p>
              <p className="text-green-600 font-bold text-xl mt-1">${product.productPrice} <span className="text-sm text-gray-500">/gram</span></p>
              <p className="text-sm text-gray-500">Total Grams : {product.weightQuantity} {product.weightType}</p>
            </div>
            <div className="flex items-center text-yellow-500 text-sm font-semibold">
              <FaStar className="mr-1" />
              {product.averageRating || "N/A"}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src={product.dispensaryId.profilePicture}
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

          {/* Gram input field */}
          <div className="space-y-4 mt-4 border-t pt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Enter Grams</label>
              <input
                type="text"
                value={grams}
                onChange={handleGramChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500">Max: {availableMaxGrams} grams</p>
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

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 mt-4 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
