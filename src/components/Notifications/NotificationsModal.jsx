import axios from "../../axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { RiLoader5Line } from "react-icons/ri";
import { SuccessToast } from "../Toaster/Toast";

const NotificationsModal = ({ isOpen, onClose, getAllNotifications }) => {
  const [loading, setLoading] = useState();
  const [newNotification, setNewNotification] = useState({
    title: "",
    body: "",
  });
  const postNotification = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/admin/notifications", {
        ...newNotification,
      });
      console.log("🚀 ~ postNotification ~ response:", response);
      if (response.status === 200) {
        SuccessToast("Notification sent");
        onClose();
        setNewNotification({ title: "", body: "" });
        getAllNotifications();
      }
      setLoading(false);
    } catch (err) {
      console.log("🚀 ~ postNotification ~ err:", err);
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
      <div className="border border-gray-200 bg-gray-50 shadow transition-shadow duration-300 p-8 rounded-xl  max-w-lg w-full relative">
        {" "}
        {/* Adjusted width to be more compact */}
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#074F57] text-2xl hover:text-gray-700 transition duration-200"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
          Create Notification
        </h2>{" "}
        {/* Centered heading for better visual appeal */}
        <div className="flex flex-col gap-6">
          {/* Notification Title Input */}
          <input
            type="text"
            value={newNotification.title}
            onChange={(e) =>
              setNewNotification({ ...newNotification, title: e.target.value })
            }
            placeholder="Enter notification title"
            className="p-4 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#074F57] focus:outline-none text-lg text-gray-800 placeholder-gray-500 transition-all duration-300"
          />

          {/* Notification Message Input */}
          <textarea
            value={newNotification.body}
            onChange={(e) =>
              setNewNotification({
                ...newNotification,
                body: e.target.value,
              })
            }
            placeholder="Enter notification message"
            rows={4}
            className="p-4 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#074F57] focus:outline-none text-lg text-gray-800 placeholder-gray-500 transition-all duration-300"
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              disabled={loading}
              onClick={postNotification}
              className="w-full h-[52px] lg:w-[434px] bg-[#074F57] text-white rounded-[12px] flex items-center justify-center 
              text-[16px] leading-[21.6px] tracking-[-0.24px] hover:bg-[#134248] duration-300"
            >
              <div className="flex items-center">
                <span className="mr-1">Create Notification</span>
                {loading && (
                  <RiLoader5Line className="animate-spin text-lg mx-auto" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
