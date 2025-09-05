import React, { useEffect, useState, useMemo, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import axios from "../../../axios";
import { useNavigate } from "react-router";
import { AppContext } from "../../../context/AppContext";

export default function CheckoutForm({
  dispensaryId,
  products,
  shippingAddress,
  clientSecret,
  stripeAccountId,
  paymentIntentId,
  phoneNumber,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { setUpdate } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const product = products?.map((item) => ({
    productId: item.productId?._id || item.productId,
    gram: item.grams,
  }));
  const payload = {
    dispensaryId: dispensaryId,
    products: product,
    shippingAddress: shippingAddress,
    phoneNumber: phoneNumber,
    client_secret: clientSecret,
    stripeAccountId: stripeAccountId,
    paymentIntent: paymentIntentId,
  };

  const handleOrderCreate = async () => {
    try {
      const response = await axios.post("/user/create-order", payload);
      if (response.status === 200) {
        SuccessToast(
          "Order Placed: Thank you! Your order has been placed successfully. "
        );
        setUpdate((prev) => !prev);
        navigate("/app/dashboard");
      }
    } catch (err) {
      ErrorToast(err?.response?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Where to redirect after a successful payment (for redirect-based payment methods)
        return_url: window.location.origin + "/payment-success",
      },
      redirect: "if_required", // keep user on-page for card payments
    });
    console.log(paymentIntent, "paymentIntent=>");
    if (error) {
      ErrorToast(error.message || "Something went wrong.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      SuccessToast("Payment succeeded!");
      await handleOrderCreate();
    } else {
      await handleOrderCreate();
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {message && (
        <div
          style={{
            marginTop: 12,
            color: message.includes("succeeded") ? "green" : "red",
          }}
        >
          {message}
        </div>
      )}
      <div className="flex justify-end">
        <button
          className=" h-[49px] text-white font-[500] text-[14px] bg-green-700  rounded-md w-[200px] "
          disabled={!stripe || isSubmitting}
          style={{ marginTop: 16 }}
        >
          {isSubmitting ? "Processing…" : "Pay now"}
        </button>
      </div>
    </form>
  );
}
