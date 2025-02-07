import axios from "../../axios";
import React, { useState } from "react";
import { ErrorToast, SuccessToast } from "../Toaster/Toast";

const DeleteConfirmationModal = ({ id, onDelete, onClose }) => {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async () => {
    if (reason.trim() === "") {
      setDeleteError("Please provide a reason for deletion.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.delete(`/posts/${id}`);
      if (response.status === 200) {
        setIsLoading(false);
        SuccessToast("Deleted");
        onDelete();
        onClose();
      }
    } catch (err) {
      console.log("🚀 ~ handleConfirmDeactivation ~ err:", err);
      setIsLoading(false);
      ErrorToast(err.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please provide a reason for deleting this post.
        </p>

        {/* Textarea for the reason */}
        <textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setDeleteError(null);
          }}
          rows="4"
          className="w-full p-2 border border-gray-300 text-black rounded-md"
          placeholder="Enter your reason here"
        />

        <div className="mt-4 flex space-x-2">
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#134045]"
          >
            {isLoading ? "Deleting..." : "Confirm Delete"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
        {deleteError && <p className="text-xs text-red-600">{deleteError}</p>}
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
