import React, { useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PostDetailModal from "./PostDetailModal";

const initialPosts = [
  {
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
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=7",
    budget: "$200",
    duration: "10:00 AM - 02:00 PM",
    date: "5 Jan - 7 Jan 23",
    location: "Los Angeles",
    distance: "3 miles away",
    description:
      "Looking for help assembling furniture in my new apartment. Basic tools provided. Must have a truck and be available this Saturday.",
    likes: 412,
    bids: 5,
    type: "service", // Service Post
  },
  {
    id: 3,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=8",
    budget: "$200",
    duration: "10:00 AM - 02:00 PM",
    date: "5 Jan - 7 Jan 23",
    location: "Los Angeles",
    distance: "3 miles away",
    description:
      "Looking for help assembling furniture in my new apartment. Basic tools provided. Must have a truck and be available this Saturday.",
    likes: 412,
    bids: 5,
    type: "item", // Service Post
  },
  {
    id: 4,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=9",
    budget: "$200",
    duration: "10:00 AM - 02:00 PM",
    date: "5 Jan - 7 Jan 23",
    location: "Los Angeles",
    distance: "3 miles away",
    description:
      "Looking for help assembling furniture in my new apartment. Basic tools provided. Must have a truck and be available this Saturday.",
    likes: 412,
    bids: 5,
    type: "item", // Service Post
  },
];

const PostCards = () => {
  const [posts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("all"); // "service", "item", "all"
  const [selectedPost, setSelectedPost] = useState(null); // State to track selected post for the modal

  // Filter posts based on the active tab
  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.type === activeTab);

  const handleViewDetails = (post) => {
    setSelectedPost(post); // Set the selected post when "View details" is clicked
  };

  const handleCloseModal = () => {
    setSelectedPost(null); // Close the modal by resetting the selected post
  };

  return (
    <div className="p-6 h-auto overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-6">Posts</h1>

      {/* Tab Buttons */}
      <div className="mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`${
              activeTab === "all"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            All Posts
          </button>
          <button
            onClick={() => setActiveTab("service")}
            className={`${
              activeTab === "service"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            Service Posts
          </button>
          <button
            onClick={() => setActiveTab("item")}
            className={`${
              activeTab === "item"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            Item Posts
          </button>
        </div>
      </div>

      {/* Post Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 space-y-4"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={post.avatar}
                  alt={post.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{post.name}</h2>
                  <p className="text-sm text-gray-500">
                    {post.type === "service" ? "Service" : "Item"} •{" "}
                    {post.date}
                  </p>
                </div>
              </div>
              {/* <button className="text-gray-400 hover:text-gray-600">
                <span className="text-xl font-bold">...</span>
              </button> */}
            </div>

            {/* Post Details */}
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

            {/* Footer Section */}
            <div className="flex justify-between items-center border-t pt-4">
              {/* Likes and Bids */}
              <div className="flex items-center space-x-4 text-gray-500">
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <FaHeart className="text-gray-400" />
                  <span>{post.likes}</span>
                </button>
                <p className="text-sm">{post.bids} bids</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {/* <button className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f383b]">
                  Bid Now
                </button> */}
                <button
                  onClick={() => handleViewDetails(post)}
                  className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f383b]"
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <PostDetailModal post={selectedPost} onClose={handleCloseModal} />
    </div>
  );
};

export default PostCards;
