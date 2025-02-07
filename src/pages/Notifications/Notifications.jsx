import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NotificationsModal from "../../components/Notifications/NotificationsModal";
import axios from "../../axios";
import NotificationsLoader from "../../components/Loaders/NotificationsLoader";
import { getDateFormat } from "../../data/DateFormat";
import Pagination from "../../components/Pagination/Pagination";

const Notifications = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [notificationsData, setNotificationsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/admin/notifications?page=${currentPage}`
      );
      setNotificationsData(data?.data);
      setTotalPages(data?.last_page);
    } catch (error) {
      console.log("🚀 ~ getAllNotifications ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, [currentPage]);

  return (
    <div className="p-6  w-full min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Notifications
        </h1>
      </div>

      {/* Create Notification Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#074F57] text-white p-4 rounded-full shadow-lg hover:bg-[#113b3f] transition duration-300"
      >
        <IoAddCircleOutline className="text-3xl" />
      </button>

      {/* New Notification Modal */}
      <NotificationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        getAllNotifications={getAllNotifications}
      />

      {loading ? (
        <NotificationsLoader />
      ) : notificationsData.length > 0 ? (
        <div className="mt-8 space-y-4">
          {notificationsData?.map((notification) => (
            <div
              key={notification.id}
              className="cursor-pointer rounded-xl border border-[#074F57] bg-[#074F5715] shadow p-5 flex flex-col gap-3 "
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#074F57]">
                  {notification.title}
                </h3>
                <span className="text-sm text-gray-700">
                  {getDateFormat(notification.created_at)}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-medium">
                {notification.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <p className="text-black">No record found</p>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Notifications;
