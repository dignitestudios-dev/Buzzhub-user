import React, { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import { ProductDetailsloader } from "../../../components/global/Loader";
import { AppContext } from "../../../context/AppContext";


const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [grams, setGrams] = useState();
  const [reviews, setReviews] = useState([]); // New state for reviews
  const [fulfillment, setFulfillment] = useState("self");
  const [loading, setLoading] = useState(false); // State to manage loading state for Add to Cart button
  const [cartData, setCartData] = useState(null);
  const [dispencary, setDispencary] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispensaryFullFillMent = location?.state;
  console.log(dispensaryFullFillMent, "dispensary");
  const handleBackClick = () => {
    navigate(-1); // Navigate one step back in history
  };
  const fetchDispencaryDetails = async () => {
    try {
      const response = await axios.get("/user/get-nearby-dispensary");

      if (response.status === 200) {
        setDispencary(response?.data?.data);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  useEffect(() => {
    fetchDispencaryDetails();
  }, []);

  const DispencaryFullFillMentMethod = dispencary?.map(
    (item) => item?.fulfillmentMethod
  );
console.log(DispencaryFullFillMentMethod,"DispencaryFullFillMentMethod")
  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.post("/user/get-products-byId-user", {
          productId,
        });

        if (response.data.success) {
          setProduct(response.data.data.products);
          setReviews(response.data.data.reviews || []); // Initialize reviews state
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
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("user/get-cart-items");
      if (response.data.success) {
        setCartData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  const cartItemID = cartData?.items?.map(
    (item, index) => item?.productId?._id
  );

  const ProductId = product?._id;

  const { setAddToCart, addtoCart, setUpdate } = useContext(AppContext);
  const handleAddToCart = async () => {
  setLoading(true);
const existingItem = addtoCart.find(
      (item) => item.dispensaryId._id !== product.dispensaryId._id
    );
  
    try {
      const response = await axios.post("/user/add-to-cart", {
        productId: productId,
        dispensaryId: product.dispensaryId._id,
        grams: grams,
        fullfillmentMethod: DispencaryFullFillMentMethod[0],
      });

    if (existingItem) {
      ErrorToast("You can't add products from different dispensaries to the cart.");
      return;
    }

    // const response = await axios.post("/user/add-to-cart", {
    //   productId: productId,
    //   dispensaryId: product.dispensaryId._id,
    //   grams: grams,
    //   fullfillmentMethod: dispensaryFullFillMent?.dispensary?.fulfillmentMethod,
    // });

    if (response.status === 200) {
      SuccessToast("Item added to cart!");
      setUpdate((prev) => !prev);  // Trigger a cart update.
      fetchCartItems();
            navigate("/app/cart");

    } else {
      ErrorToast(response.data.message);
    }
    
  } catch (error) {
    console.error("Error adding to cart:", error);
    ErrorToast("An error occurred while adding to the cart. Please try again.");
  } finally {
    setLoading(false);
  };}

  if (!product) return <div>Loading...</div>;

  const availableMaxGrams =
    product.weightQuantity <= 300 ? product.weightQuantity : 300;

  const handleGramChange = (e) => {
    let value = Math.min(Number(e.target.value), availableMaxGrams); // Ensure grams don't exceed available stock or 300
    if (isNaN(value) || value < 0) {
      value = ""; // Reset to 0 if input is invalid
    }
    setGrams(value);
  };
  console.log(product, "product==>");
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button className="text-gray-800 pr-3" onClick={handleBackClick}>
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

        <div className="p-3">
          <div className="flex justify-between items-start mb-2 mt-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {product.productName}
              </h2>
              <p className="text-sm text-gray-500">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {product.productType}
                </span>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Subcategory:{" "}
                <span className="font-medium text-gray-700">
                  {product.subTypes.join(", ")}
                </span>
              </p>
              <p className="text-green-600 font-bold text-xl mt-1">
                ${product.productPrice}{" "}
                <span className="text-sm text-gray-500">/gram</span>
              </p>
              <p className="text-sm text-gray-500">
                Total Grams : {product.weightQuantity} {product.weightType}
              </p>
            </div>
            <div className="flex items-center text-yellow-500 text-sm font-semibold">
              <FaStar className="mr-1" />
              {product.averageRating || "N/A"}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center p-4">
            <div className="flex gap-3 items-center">
              <img
                src={product.dispensaryId.profilePicture}
                alt={product.dispensaryId.dispensaryName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {product.dispensaryId.dispensaryName}
                </p>
                <p className="text-xs text-gray-500">
                  {product.dispensaryId.city}, {product?.dispensaryId?.state}
                  {/* {product.dispensaryId.distance} */}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-red-500 text-sm font-semibold">
                {product?.fullfillmentMethod}
              </p>
              <button
                className="text-blue-600 text-xs underline"
                onClick={() =>
                  navigate(
                    `/app/dispensary-profile/${product.dispensaryId._id}`
                  )
                }
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Gram input field */}
          <div className="space-y-4 mt-4 border-t pt-4 p-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Enter Grams
              </label>
              <input
                type="text"
                value={grams}
                onChange={handleGramChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500">
                Max: {availableMaxGrams} grams
              </p>
            </div>

            {/* <div>
              <p className="text-sm font-medium text-gray-700">
                Fulfillment Method
              </p>
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
            </div> */}
          </div>

          {/* Category and Sub Category Display */}
          <div className="border-t mt-6 pt-4">
            <div className="flex divide-x">
              <div className="flex-1 pr-4">
                <h4 className="text-[15px] font-semibold text-black mb-1">
                  Category
                </h4>
                <p className="text-[15px] text-black">{product.productType}</p>
              </div>
              <div className="flex-1 pl-4">
                <h4 className="text-[15px] font-semibold text-black mb-1">
                  Sub Category
                </h4>
                <p className="text-[15px] text-black">
                  {product.subTypes && product.subTypes.length > 0
                    ? product.subTypes.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-gray-800 mb-2 border-t pt-4">
              Product Description
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {product.productDescription}
            </p>
          </div>

          {/* Warnings */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Warnings
            </h3>
            <p className="text-sm text-gray-600">
              {product.warningDescription}
            </p>
          </div>

          {/* Product Reviews */}
          {reviews.length > 0 ? (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                Reviews
              </h3>
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-xl shadow-sm mb-4"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={product.productImage[0]} // Replacing user image with the first product image
                      alt={product.productName}
                      className="w-8 h-8 rounded-full object-cover mr-2" // Style it to match the user profile image
                    />
                    <div>
                      <h4 className="text-sm font-semibold">
                        {review.productId.productName}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {review.userId.city}, {review.userId.state}
                      </p>
                    </div>
                    <span className="ml-auto text-green-600 font-bold">
                      ${review.productId.productPrice}
                    </span>
                  </div>
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-yellow-500 text-xs ${
                          i < Math.round(review.ratingNumber) ? "filled" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.review}</p>

                  {/* User's profile and name below the review */}
                  <div className="mt-4 flex items-center gap-2">
                    <img
                      src={review.userId.profilePicture} // Show user profile picture here
                      alt={review.userId.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800">
                        {review.userId.fullName}
                      </h5>
                      {/* <a 
              href={`/app/user-profile/${review.userId._id}`}  // Link to the user's profile
              className="text-xs text-blue-500 hover:underline"
            >
              View Profile
            </a> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 border-t pt-4 text-sm text-gray-500 italic">
              No reviews available for this product.
            </div>
          )}

          {/* Add to Cart Button */}
          {cartItemID?.includes(ProductId) ? (
            <button
              onClick={() => navigate("/app/cart")}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 mt-4 rounded-xl flex items-center justify-center"
            >
              View Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 mt-4 rounded-xl flex items-center justify-center"
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <FiLoader className="animate-spin text-white text-2xl" />
              ) : (
                "Add to Cart"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
