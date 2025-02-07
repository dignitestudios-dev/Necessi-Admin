import { getStorage, getDownloadURL, ref } from "firebase/storage";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaTimes, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { app } from "../../firebase/firebase";
import DeactivationModal from "../../components/Users/DeactivationModal";
import NotificationsLoader from "../../components/Loaders/NotificationsLoader";

const ReportedUserDetailPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uid, setUid] = useState("");

  const [reportData, setReportData] = useState("");
  const [loading, setLoading] = useState(false);

  const storage = getStorage(app);
  const [imageUrls, setImageUrls] = useState({});
  const [userImage, setUserImage] = useState("");

  const handleDeactivate = (id) => {
    setIsModalOpen(true);
    setUid(id);
  };

  const handleConfirmDeactivation = () => {
    getReportDetails();
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
        reportData?.reported_user?.avatar?.replace(/%2F/g, "/")
      );
      console.log("🚀 ~ fetchImageUrls ~ url:", url);

      setUserImage(url);
    };

    fetchImageUrls();
  }, [reportData]);

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
      for (const user of reportData?.reported_user?.reviews?.data) {
        console.log("🚀 ~ fetchImageUrls ~ user:", user);
        const url = await getImageUrl(user.avatar.replace(/%2F/g, "/"));
        urls[user.id] = url;
      }
      setImageUrls(urls);
    };

    if (reportData?.reported_user?.reviews?.data.length > 0) {
      fetchImageUrls();
    }
  }, [reportData]);

  return (
    <div className="p-6 h-full w-full overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-6">
        Reported User Details
      </h1>
      {loading ? (
        <NotificationsLoader />
      ) : (
        <>
          {/* Report Details Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={userImage}
                  alt="avatar"
                  className="w-16 h-16 rounded-full border-2 border-[#074F57]"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {reportData?.reported_user?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {reportData?.reported_user?.is_online
                      ? "Online"
                      : "Offline"}{" "}
                    • {reportData?.reported_user?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Wallet Balance ${reportData?.reported_user?.wallet_balance}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Reported By:</strong> {reportData?.reporter?.name}
                </p>
                <p>
                  <strong>Report Date:</strong> {reportData?.report_date}
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <p className="font-semibold">Reason for Report:</p>
                <p>{reportData?.report_reason}</p>
              </div>

              {/* Action Buttons */}
              {reportData?.reported_user?.is_deactivate ? (
                <div className="flex space-x-4 mt-6">
                  <button
                    disabled
                    className="bg-[#0f3539] text-white px-4 py-2 rounded-md text-sm"
                  >
                    Deactivated
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() =>
                      handleDeactivate(reportData?.reported_user?.id)
                    }
                    className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f3539]"
                  >
                    Deactivate User
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Reviews Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8 space-y-6 mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">Reviews</h3>
            {reportData?.reported_user?.reviews?.data.length > 0 ? (
              reportData?.reported_user?.reviews?.data?.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center space-x-4 mt-4"
                >
                  <img
                    src={imageUrls}
                    alt="avatar"
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review?.user?.name}
                    </p>
                    <p className="text-gray-600 text-sm">{review?.data}</p>
                    <div className="flex space-x-1 text-yellow-400 mt-2">
                      {Array.from({ length: review.rating })?.map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            )}
          </div>
        </>
      )}

      {/* Deactivation Modal */}
      <DeactivationModal
        uid={uid}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDeactivation}
      />
    </div>
  );
};

export default ReportedUserDetailPage;
