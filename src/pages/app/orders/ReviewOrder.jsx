import React, { useState, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "../Stirpe/StripeCheckout";
import ModalWrapper from "../Stirpe/ModalWrapper";
import {
  Autocomplete,
  LoadScript,
  useLoadScript,
} from "@react-google-maps/api";
const libraries = ["places"];

const ReviewOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(state?.addtoCart || []);
  const [fulfillmentMethod, setFulfillmentMethod] = useState("Delivery");
  const [isStripe, setIsStripe] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [medicalCards, setMedicalCards] = useState({
    front: "",
    back: "",
  });
  const [completeAddress, setCompleteAddress] = useState("");
  const [drivingLicense, setDrivingLicense] = useState({
    front: "",
    back: "",
  });
  console.log(cartData, "cartData");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setShippingAddress(place.formatted_address);
      }

      if (place.geometry?.location) {
        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }

      console.log("Selected place:", place);
    }
  };
  const handleBackClick = () => {
    navigate(-1);
  };

  const subtotal = cartData?.reduce(
    (sum, item) => sum + item.productPrice * item.grams,
    0
  );

  const handlePlaceOrder = () => {
    setIsStripe(true);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (fulfillmentMethod === "Self Pickup") {
      setShippingAddress("123 Pickup Ave, Toronto, ON M4B 1B3, Canada");
    } else {
      setShippingAddress("");
    }

    if (userData) {
      setMedicalCards({
        front: userData.medicalCardFront,
        back: userData.medicalCardBack,
      });

      setDrivingLicense({
        front: userData.drivingLicenseFront,
        back: userData.drivingLicenseBack,
      });

      setPhoneNumber(userData.phoneNumber);
    }
  }, [fulfillmentMethod]);

  const cartDataFullMethod = cartData?.map((item) => item?.fullfillmentMethod);
  const cartDataAddress = cartData?.map(
    (item) => item?.dispensaryId?.streetAddress
  );

  return (
    <div className="w-full mx-auto bg-white lg:border lg:border-gray-200 lg:p-4 pb-20 lg:pb-4 rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <button className="text-gray-800 pr-3" onClick={handleBackClick}>
          <FiArrowLeft size={20} />
        </button>
        <h3 className="text-[16px] lg:text-xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Review Order
        </h3>
      </div>
      {/* Fulfillment Method */}
      <div className="mb-4">
        {cartDataFullMethod[0] === "Both" && (
          <div className=" gap-4">
            <span className="font-medium block mb-2">Fulfillment Method</span>
            <label className="flex items-center">
              <input
                type="radio"
                name="fulfillment"
                value="Delivery"
                checked={fulfillmentMethod === "Delivery"}
                onChange={() => setFulfillmentMethod("Delivery")}
                className="mr-2"
              />
              Delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="fulfillment"
                value="Pickup"
                checked={fulfillmentMethod === "Pickup"}
                onChange={() => setFulfillmentMethod("Pickup")}
                className="mr-2"
              />
              Self Pickup
            </label>

            {fulfillmentMethod === "Delivery" && (
              <>
                <div className="p-1 rounded-xl text-sm space-y-2">
                  <span className="font-medium block mb-1 mt-2">
                    Enter House No
                  </span>
                  <input
                    type="text"
                    value={completeAddress}
                    onChange={(e) => setCompleteAddress(e.target.value)}
                    className="w-full text-gray-700 p-2 rounded-md border"
                    placeholder="Enter House No"
                  />
                </div>
                <span className="font-medium block mb-1 mt-2">
                  Enter Street Address
                </span>
                <div className="p-1 rounded-xl text-sm space-y-2">
                  {isLoaded && (
                    <Autocomplete
                      onLoad={(autocomplete) =>
                        (autocompleteRef.current = autocomplete)
                      }
                      onPlaceChanged={handlePlaceChanged}
                    >
                      <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full text-gray-700 p-2 rounded-md border"
                        placeholder="Enter Your Location"
                      />
                    </Autocomplete>
                  )}
                </div>
              </>
            )}

            {fulfillmentMethod === "Pickup" && (
              <>
                <span className="font-medium block mb-1 mt-2">
                  Pickup Address
                </span>
                <div className="p-1 rounded-xl text-sm space-y-2">
                  <p className="text-gray-700 leading-6">
                    {userData?.streetAddress}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {/* Conditionally render Shipping Address */}
      {cartDataFullMethod[0] === "Deliver at home" && (
        <div>
          <span className="font-medium block mb-1 mt-2">Shipping Address</span>
          <div className="p-1 rounded-xl text-sm space-y-2">
            {isLoaded && (
              <Autocomplete
                onLoad={(autocomplete) =>
                  (autocompleteRef.current = autocomplete)
                }
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full text-gray-700 p-2 rounded-md border"
                  placeholder="Enter your delivery address"
                />
              </Autocomplete>
            )}
          </div>
        </div>
      )}

      {cartDataFullMethod[0] === "Pickup" && (
        <>
          <span className="font-medium block mb-1 mt-2">Pickup Address</span>
          <div className="p-1 rounded-xl text-sm space-y-2">
            <p className="text-gray-700 leading-6">{cartDataAddress}</p>
          </div>
        </>
      )}
      {cartDataFullMethod[0] === "Self Pickup" && (
        <>
          <span className="font-medium block mb-1 mt-2">Pickup Address</span>
          <div className="p-1 rounded-xl text-sm space-y-2">
            <p className="text-gray-700 leading-6"> {cartDataAddress}</p>
          </div>
        </>
      )}
      {/* Phone Number */}
      <span className="font-medium block mt-2 pr-2 pt-2">Phone Number</span>
      <div className=" p-1 rounded-xl text-sm space-y-1">
        <input
          type="text"
          value={phoneNumber}
          maxLength={11}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full text-gray-700 p-2 rounded-md border"
        />
      </div>

      {/* Medical Cards */}
      <div className="p-4 rounded-xl text-sm space-y-2">
        <span className="font-medium block">Medical Cards</span>
        <div className="flex gap-3">
          {medicalCards.front ? (
            <img
              src={medicalCards.front }
              alt="Medical Card Front"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
          {medicalCards.back ? (
            <img
              src={medicalCards.back}
              alt="Medical Card Back"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
        </div>
      </div>

      {/* Driving License */}
      <div className="p-4 rounded-xl text-sm space-y-2">
        <span className="font-medium block">Driving License</span>
        <div className="flex gap-3">
          {drivingLicense.front ? (
            <img
              src={drivingLicense.front}
              alt="Driving License Front"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
          {drivingLicense.back ? (
            <img
              src={drivingLicense.back}
              alt="Driving License Back"
              className="w-28 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-28 h-16 bg-gray-200 rounded-lg"></div> // Placeholder if no image
          )}
        </div>
      </div>

      {/* Purchased Items */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Purchased Items</h3>
        <div className="bg-gray-50 p-4 rounded-xl space-y-2">
          {cartData?.map((item) => (
            <div key={item._id} className="flex items-start gap-3">
              <img
                src={item.productImage  || "https://placehold.co/600x400"}
                alt={item.productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.productName}</p>
                <p className="text-green-600 font-semibold text-sm">
                  <span>${subtotal?.toFixed(2)}</span>
                </p>
                <span className="text-xs text-gray-600">
                  {item.grams} grams
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Summary */}
      <div>
        <h3 className="text-sm font-semibold mb-2 mt-4">Billing</h3>
        <div className="mb-6 bg-gray-50 p-4 rounded-xl text-sm">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>2% platform fees</span>
            <span>${(subtotal * 0.02)?.toFixed(2)}</span> {/* 2% fee amount */}
          </div>
          <div className="flex justify-between font-semibold text-green-700 text-base">
            <span>Total</span>
            <span>${(subtotal * 1.02)?.toFixed(2)}</span>{" "}
            {/* Total me 2% add ho gaya */}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl font-semibold text-sm"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>

      {isStripe && (
        <ModalWrapper isOpen={isStripe} onClose={() => setIsStripe(false)}>
          <StripeCheckout
            stripeAccountId={state?.stripeAccountId}
            clientSecret={state?.clientSecret}
            dispensaryId={state?.dispensaryId}
            products={state?.addtoCart}
            paymentIntentId={state?.paymentIntentId}
            shippingAddress={
              shippingAddress ? shippingAddress : userData?.streetAddress
            }
            completeAddress={completeAddress}
            phoneNumber={phoneNumber}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default ReviewOrder;
