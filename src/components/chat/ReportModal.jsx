import React, { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../global/Toaster";

const ReportModal = ({
  isOpen,
  onClose,
  onConfirm,
  chatId,
  userId,
  userType = "user",
}) => {
  if (!isOpen) return null;

  const [selectedReason, setSelectedReason] = useState("");
  const [loading, setLoading] = useState(false);

  const reportReasons = [
    "Non-Payment or Fraudulent Activities",
    "Safety and Health Concerns",
    "Security Concerns",
    "Abuse or Misconduct",
    "Legal Compliance",
    "Violation Policies",
    "Repeated Infractions",
    "Others",
  ];

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert("Please select a reason.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Determine endpoint based on user type
      const endpoint = "/user/chat-report-dispensary";

      // ✅ Make API request
      const response = await axios.post(endpoint, {
        reason: selectedReason,
        uid: chatId, // Chat UID
      });

      if (response.data.success) {
        SuccessToast(response?.data?.message);
        onConfirm(selectedReason);
        onClose();
      } else {
        response.data.message || "Something went wrong.";
      }
    } catch (err) {
      console.error("Report error:", err);
      ErrorToast(response?.err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center text-black z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Report User</h3>
        <p className="mb-4">
          Please select the reason why you are reporting this user:
        </p>

        <div className="space-y-2">
          {reportReasons.map((reason, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name="reportReason"
                value={reason}
                onChange={(e) => setSelectedReason(e.target.value)}
                checked={selectedReason === reason}
                className="mr-2"
              />
              {reason}
            </label>
          ))}

          {selectedReason === "Others" && (
            <input
              type="text"
              placeholder="Please specify"
              className="mt-2 px-4 py-2 w-full border rounded-lg"
              onChange={(e) => setSelectedReason(e.target.value)}
            />
          )}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
