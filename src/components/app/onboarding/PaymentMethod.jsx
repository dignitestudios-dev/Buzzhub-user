import React, { useState } from "react";
import { FaPaypal } from "react-icons/fa";
import { SiStripe } from "react-icons/si";

export default function PaymentMethod({ onNext, onBack, updateData }) {
  const [method, setMethod] = useState("");

  // This function handles skipping the step when "Skip" is clicked
  const handleSkip = () => {
    // Proceed to the next step
    onNext();
  };

  return (
    <div className="w-full max-w-md">
      {/* Payment Method Selection */}
      <div className="rounded space-y-4 overflow-hidden">
        <div
          className={`flex items-center rounded-xl bg-[#F3F3F3] justify-between px-4 py-4 border-b cursor-pointer ${
            method === "Stripe" ? "bg-green-100" : ""
          }`}
          onClick={() => setMethod("Stripe")}
        >
          <div className="flex items-center gap-3">
            <SiStripe className="text-blue-600 text-xl" />
            <span className="font-medium">Stripe</span>
          </div>
        </div>
        <div
          className={`flex items-center rounded-xl bg-[#F3F3F3] justify-between px-4 py-4 cursor-pointer ${
            method === "Paypal" ? "bg-green-100" : ""
          }`}
          onClick={() => setMethod("Paypal")}
        >
          <div className="flex items-center gap-3">
            <FaPaypal className="text-blue-500 text-xl" />
            <span className="font-medium">Paypal</span>
          </div>
        </div>
      </div>

      {/* Buttons: Skip and Go Back */}
      <div className="mt-6 space-y-4">
        {/* Skip Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSkip} // Skips the current step
            className="text-green-600 font-semibold"
          >
            Skip
          </button>
        </div>

        {/* Go Back Button */}
        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="text-green-600 font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
