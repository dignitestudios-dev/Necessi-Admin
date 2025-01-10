import React, { useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaClock, FaExclamationTriangle } from "react-icons/fa";

// Example post data
const post = {
  id: 1,
  name: "Olivia James",
  avatar: "https://i.pravatar.cc/150?img=1",
  budget: "$120",
  duration: "12:05 PM - 06:00 PM",
  date: "12 Dec - 16 Jan 23",
  location: "New York",
  distance: "4 miles away",
  description:
    "Need someone to help me move furniture to a new apartment. Must have a truck and be available this Saturday.",
  likes: 646,
  bids: 8,
  type: "service", // Service Post
  reportedBy: "John Doe",
  reportReason: "Inappropriate content - Offensive language",
  reportDate: "2024-01-10",
};

const ReportDetailsPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [action, setAction] = useState(null); // Action can be "delete" or "deactivate"
  const [reason, setReason] = useState(""); // Reason for action (delete or deactivate)

  const handleActionClick = (actionType) => {
    setAction(actionType); // Store the action type (delete or deactivate)
    if (actionType === "delete") {
      setIsDeleteModalOpen(true);
    } else if (actionType === "deactivate") {
      setIsDeactivateModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsDeactivateModalOpen(false);
    setReason(""); // Reset reason when closing the modal
    setAction(null);
  };

  const handleConfirmAction = () => {
    if (action) {
      console.log(`${action} action confirmed for post: ${post.id}, Reason: ${reason}`);
      handleCloseModal();
    }
  };

  return (
    <div className="p-6 h-full w-full overflow-auto ">
      <h1 className="text-black text-3xl font-bold mb-6">Reported Post Details</h1>

      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={post.avatar}
              alt={post.name}
              className="w-16 h-16 rounded-full border-2 border-[#074F57]"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{post.name}</h2>
              <p className="text-sm text-gray-500">
                {post.type === "service" ? "Service" : "Item"} • {post.date}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between">
            <div className="text-sm text-gray-700 font-medium">
              <p><strong>Reported By:</strong> {post.reportedBy}</p>
              <p><strong>Report Date:</strong> {post.reportDate}</p>
            </div>
            <div className="flex items-center space-x-2 text-yellow-600">
              <FaExclamationTriangle className="text-2xl" />
              <span className="font-semibold">Reported Post</span>
            </div>
          </div>

          <div className="text-sm text-gray-700">
            <p className="font-semibold">Reason for Report:</p>
            <p>{post.reportReason}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <strong>Budget:</strong> {post.budget}
            </p>
            {post.type === "service" && (
              <p className="text-sm text-gray-700 flex items-center">
                <FaClock className="mr-2 text-gray-500" />
                <strong>Duration:</strong> {post.duration}
              </p>
            )}
            <p className="text-sm text-gray-700">{post.description}</p>
            {post.type === "service" && (
              <p className="text-sm text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                {post.location} • {post.distance}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center border-t pt-6">
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-gray-700">
                <FaHeart className="text-gray-400" />
                <span>{post.likes}</span>
              </button>
              <p className="text-sm">{post.bids} bids</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleActionClick("delete")}
                className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#10363a]"
              >
                Delete Post
              </button>
              <button
                onClick={() => handleActionClick("deactivate")}
                className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#10363a]"
              >
                Deactivate User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Are you sure you want to delete this post?
            </h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for deleting the post"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleConfirmAction}
                className="bg-[#074F57] text-white px-4 py-2 rounded-md hover:bg-[#0f383b]"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Modal */}
      {isDeactivateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Are you sure you want to deactivate this user?
            </h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for deactivating the user"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleConfirmAction}
                className="bg-[#074F57] text-white px-4 py-2 rounded-md hover:bg-[#0f383b]"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetailsPage;
