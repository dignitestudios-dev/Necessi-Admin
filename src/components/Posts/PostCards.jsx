import React, { useEffect, useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PostDetailModal from "./PostDetailModal";
import CardsLoader from "../Loaders/CardsLoader";
// import imageHandler from "../../data/imageHandler";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "../../firebase/firebase";
import Pagination from "../Pagination/Pagination";

const PostCards = ({
  postsData,
  loading,
  getAllPosts,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const [activeTab, setActiveTab] = useState("all_posts");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectImage, setSelectImage] = useState("");

  const storage = getStorage(app);

  const [imageUrls, setImageUrls] = useState({});

  const filteredPosting =
    activeTab === "all_posts"
      ? [
          ...(postsData?.data?.services || []),
          ...(postsData?.data?.items || []),
        ]
      : activeTab === "items"
      ? postsData?.data?.items
      : postsData?.data?.services;

  const handleViewDetails = (post, image) => {
    setSelectedPost(post);
    setSelectImage(image);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const getImageUrl = async (imagePath) => {
    const imageRef = ref(storage, `/${imagePath}`);
    try {
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null; // Handle error appropriately
    }
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = {};
      for (const post of filteredPosting) {
        const url = await getImageUrl(
          post.user.user_avatar.replace(/%2F/g, "/")
        );
        urls[post.post_id] = url;
      }
      setImageUrls(urls);
    };

    if (filteredPosting?.length > 0) {
      fetchImageUrls();
    }
  }, [postsData]);

  return (
    <div className="p-6 h-auto overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-6">Posts</h1>

      {/* Tab Buttons */}
      <div className="mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("all_posts")}
            className={`${
              activeTab === "all_posts"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            All Posts
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`${
              activeTab === "services"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            Service Posts
          </button>
          <button
            onClick={() => setActiveTab("items")}
            className={`${
              activeTab === "items"
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
        {loading ? (
          <CardsLoader />
        ) : filteredPosting?.length > 0 ? (
          <>
            {filteredPosting?.map((post) => (
              <div
                key={post.post_id}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 space-y-4 relative h-[340px] w-[380px]"
              >
                {/* Header Section */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={imageUrls[post.post_id] || "/default-avatar.jpg"}
                      alt={post.title}
                      className="w-12 h-12 rounded-full object-contain"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {post.type === "service" ? "Service" : "Item"} •{" "}
                        {post.start_date}
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
                  {post.type === "service" ? (
                    <p className="text-sm text-gray-700 flex items-center">
                      <FaClock className="mr-2 text-gray-500" />
                      <strong className="pr-1">Duration: </strong>{" "}
                      {post.duration}
                    </p>
                  ) : (
                    <p className="h-6"></p>
                  )}
                  <p className="text-sm text-gray-700">{post.description}</p>
                  {post.type === "service" ? (
                    <p className="text-sm text-gray-700 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      {post.state} • {post.city}
                    </p>
                  ) : (
                    <p className="h-6"></p>
                  )}
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center border-t pt-4 absolute bottom-1 w-[90%] ">
                  {/* Likes and Bids */}
                  <div className="flex items-center space-x-4 text-gray-500">
                    <div className="flex items-center space-x-1 hover:text-gray-700">
                      <span>{post.likes_count}</span>
                      <FaHeart className="text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-1 hover:text-gray-700">
                      <span>{post.bids_count} </span>
                      <span>bid(s)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {/* <button className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f383b]">
                  Bid Now
                </button> */}
                    <button
                      onClick={() =>
                        handleViewDetails(post, imageUrls[post.post_id])
                      }
                      className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f383b]"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="mt-8 space-y-4">
            <p className="text-black">No record found</p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      {/* Modal */}
      <PostDetailModal
        post={selectedPost}
        selectImage={selectImage}
        onClose={handleCloseModal}
        onDeletePost={() => getAllPosts()}
      />
    </div>
  );
};

export default PostCards;
