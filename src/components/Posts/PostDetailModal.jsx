import React, { useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the delete modal

const PostDetailModal = ({ post, onClose, onDeletePost, selectImage }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postId, setPostId] = useState("");

  const handleDeleteClick = (id) => {
    setDeleteModalOpen(true);
    setPostId(id);
  };

  const handleDeletePost = () => {
    onClose();
    onDeletePost();
  };

  if (!post) return null; // If no post is passed, don't render the modal.

  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {post.user.user_name}'s Post Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl font-bold">×</span>
            </button>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center mt-4 border-t pt-4">
            <img
              src={selectImage}
              alt={post.user.user_name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {post.user.user_name}
              </h3>
              <p className="text-sm text-gray-500">
                {post.state} • {post.city}
              </p>
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
                <strong className="pr-1">Duration: </strong> {post.duration}
              </p>
            )}
            <p className="text-sm text-gray-700">
              <strong>Description:</strong> {post.description}
            </p>
            {post.type === "service" && (
              <p className="text-sm text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                <strong>Location:</strong> {post.state} • {post.city}
              </p>
            )}

            <div className="flex justify-start items-center mt-4">
              <div className="flex items-center space-x-0.5 text-gray-500">
                <span>{post.likes_count}</span>
                <FaHeart className="text-gray-400" />
              </div>
              <div className="ml-2 flex items-center space-x-1 text-gray-500">
                <span>{post.bids_count}</span>
                Bids
              </div>
            </div>
          </div>

          {/* Footer Section (Delete button) */}
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => handleDeleteClick(post?.post_id)}
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
          id={postId}
          onDelete={handleDeletePost}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PostDetailModal;
