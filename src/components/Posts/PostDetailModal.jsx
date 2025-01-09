import React, { useState } from 'react';
import { FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// Modal to confirm deletion with a reason
const DeleteConfirmationModal = ({ onDelete, onClose }) => {
  const [reason, setReason] = useState(""); // Track the reason for deletion

  const handleDelete = () => {
    if (reason.trim() === "") {
      alert("Please provide a reason for deletion.");
      return;
    }
    onDelete(reason); // Call the onDelete function passed from the parent with the reason
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please provide a reason for deleting this post.
        </p>
        
        {/* Textarea for the reason */}
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 text-black rounded-md"
          placeholder="Enter your reason here"
        />

        <div className="mt-4 flex space-x-2">
        <button
            onClick={handleDelete}
            className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#134045]"
          >
            Confirm Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-500"
          >
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
};

const PostDetailModal = ({ post, onClose, onDeletePost }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Track whether the delete modal is open

  const handleDeleteClick = () => {
    setDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleDeletePost = (reason) => {
    onDeletePost(post.id, reason); // Handle post deletion and pass the reason
  };

  if (!post) return null; // If no post is passed, don't render the modal.

  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{post.name}'s Post Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <span className="text-xl font-bold">×</span>
            </button>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center mt-4 border-t pt-4">
            <img
              src={post.avatar}
              alt={post.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{post.name}</h3>
              <p className="text-sm text-gray-500">{post.location}</p>
            </div>
          </div>

          {/* Post Details Section */}
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Budget:</strong> {post.budget}
            </p>
            {post.type === "service" && (
              <p className="text-sm text-gray-700 flex items-center">
                <FaClock className="mr-2 text-gray-500" />
                <strong>Duration:</strong> {post.duration}
              </p>
            )}
            <p className="text-sm text-gray-700">
              <strong>Description:</strong> {post.description}
            </p>
            {post.type === "service" && (
              <p className="text-sm text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                <strong>Location:</strong> {post.location} • {post.distance}
              </p>
            )}

            <div className="flex justify-between mt-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <FaHeart className="text-gray-400" />
                <span>{post.likes}</span>
              </div>
              <p className="text-sm">{post.bids} bids</p>
            </div>
          </div>

          {/* Footer Section (Delete button) */}
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleDeleteClick}
              className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#134045]"
            >
              Delete Post
            </button>
          </div>
        </div>
      </div>

      {/* Show the delete confirmation modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onDelete={handleDeletePost}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PostDetailModal;
