import axios from "../../axios";
import React, { useState } from "react";
import { ErrorToast, SuccessToast } from "../Toaster/Toast";

const DeactivationModal = ({ uid, isOpen, onClose, onConfirm }) => {
  const [deactivationReason, setDeactivationReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deactivationReasons = [
    "Violation of terms",
    "Inactive for too long",
    "Requested by the user",
    "Other",
  ];

  const handleConfirmDeactivation = async () => {
    if (!deactivationReason) {
      alert("Please select a reason for deactivation.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/deactivate-user/${uid}`);
      if (response.status === 200) {
        setIsLoading(false);
        SuccessToast("Deactivated");
        onConfirm();
        onClose();
      }
    } catch (err) {
      console.log("🚀 ~ handleConfirmDeactivation ~ err:", err);
      setIsLoading(false);
      ErrorToast(err.response.data.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center transition-opacity">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Deactivation
        </h2>
        <div className="space-y-4">
          <div className="flex items-center text-yellow-500">
            <p className="text-sm text-gray-600">
              Please select a reason for deactivating this user:
            </p>
          </div>

          <select
            value={deactivationReason}
            onChange={(e) => setDeactivationReason(e.target.value)}
            className="w-full text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#074F57]"
          >
            <option value="">Select a reason</option>
            {deactivationReasons.map((reason, idx) => (
              <option key={idx} value={reason}>
                {reason}
              </option>
            ))}
          </select>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleConfirmDeactivation}
              className="bg-[#074F57] text-white py-2 px-4 rounded-md hover:bg-[#0c292d] transition duration-300"
            >
              {isLoading ? "Deactivating..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivationModal;
