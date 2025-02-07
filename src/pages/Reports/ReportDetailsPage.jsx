import { getDownloadURL, getStorage, ref } from "firebase/storage";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../firebase/firebase";
import { SuccessToast } from "../../components/Toaster/Toast";
import DeleteConfirmationModal from "../../components/Posts/DeleteConfirmationModal";
import NotificationsLoader from "../../components/Loaders/NotificationsLoader";

const ReportDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storage = getStorage(app);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [deactivateError, setDeactivateError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [reportData, setReportData] = useState("");

  const [loading, setLoading] = useState(false);

  const [userImage, setUserImage] = useState("");

  const handleActionClick = (actionType) => {
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

  const handleDeletePost = () => {
    navigate("/posts");
  };

  const handleConfirmAction = async () => {
    if (!deactivationReason) {
      setDeactivateError("Please select a reason for deactivation.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/admin/deactivate-user/${reportData?.reported_post?.post_user?.id}`
      );
      if (response.status === 200) {
        setIsLoading(false);
        SuccessToast("Deactivated");
        setDeactivationReason("");
        handleCloseModal();
      }
    } catch (err) {
      console.log("🚀 ~ handleConfirmDeactivation ~ err:", err);
      setIsLoading(false);
      ErrorToast(err.response.data.message);
    }
  };

  const getReportDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/reports/${id}`);
      setReportData(data);
    } catch (error) {
      console.log("🚀 ~ getAllUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportDetails();
  }, []);

  const getUserUrl = async (imagePath) => {
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
      const url = await getUserUrl(
        reportData?.reported_post?.post_user?.avatar?.replace(/%2F/g, "/")
      );

      setUserImage(url);
    };

    fetchImageUrls();
  }, [reportData]);

  return (
    <div className="p-6 h-full w-full overflow-auto ">
      <h1 className="text-black text-3xl font-bold mb-6">
        Reported Post Details
      </h1>
      {loading ? (
        <NotificationsLoader />
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={userImage}
                alt="user image"
                className="w-16 h-16 rounded-full border-2 border-[#074F57] object-contain"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {reportData?.reported_post?.post_user?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {reportData.type === "service" ? "Service" : "Item"} •{" "}
                  {reportData?.reported_post?.date}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="text-sm text-gray-700 font-medium">
                <p>
                  <strong>Reported By:</strong> {reportData?.reporter?.name}
                </p>
                <p>
                  <strong>Report Date:</strong> {reportData?.report_date}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-yellow-600">
                <FaExclamationTriangle className="text-2xl" />
                <span className="font-semibold">Reported Post</span>
              </div>
            </div>

            <div className="text-sm text-gray-700">
              <p className="font-semibold">Reason for Report:</p>
              <p>{reportData?.report_reason}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Budget:</strong> {reportData?.reported_post?.budget}
              </p>
              {reportData.type === "service" && (
                <p className="text-sm text-gray-700 flex items-center">
                  <FaClock className="mr-2 text-gray-500" />
                  <strong>Duration:</strong>{" "}
                  {reportData?.reported_post?.duration}
                </p>
              )}
              <p className="text-sm text-gray-700">
                {reportData?.reported_post?.description}
              </p>
            </div>

            <div className="flex justify-between items-center border-t pt-6">
              <div className="flex items-center space-x-4 text-gray-500">
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <FaHeart className="text-gray-400" />
                  <span>{reportData?.reported_post?.likes_count}</span>
                </button>
                <p className="text-sm">
                  {reportData?.reported_post?.bids_count} bids
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleActionClick("delete")}
                  className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#10363a]"
                >
                  Delete Post
                </button>
                {reportData?.reported_post?.post_user?.is_deactivate ? (
                  <button
                    disabled
                    className="bg-[#10363a] text-white px-4 py-2 rounded-md text-sm "
                  >
                    Deactivated
                  </button>
                ) : (
                  <button
                    onClick={() => handleActionClick("deactivate")}
                    className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#10363a]"
                  >
                    Deactivate User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          id={reportData?.reported_post?.post_user?.id}
          onDelete={handleDeletePost}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      {/* Deactivate Modal */}
      {isDeactivateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Are you sure you want to deactivate this user?
            </h3>
            <textarea
              value={deactivationReason}
              onChange={(e) => {
                setDeactivationReason(e.target.value);
                setDeactivateError(null);
              }}
              placeholder="Please provide a reason for deactivating the user"
              className="w-full text-black p-2 border rounded-md mb-4"
            />
            <div className="flex space-x-4">
              <button
                disabled={isLoading}
                onClick={handleConfirmAction}
                className="bg-[#074F57] text-white px-4 py-2 rounded-md hover:bg-[#0f383b]"
              >
                {isLoading ? "Deactivating..." : "Confirm"}
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
            {deactivateError && (
              <p className="text-red-500 text-xs">{deactivateError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetailsPage;
