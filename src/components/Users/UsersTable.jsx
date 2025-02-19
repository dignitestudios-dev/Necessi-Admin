import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { PiTrashSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import DeactivationModal from "./DeactivationModal"; // Import the deactivation modal
import TableLoader from "../Loaders/TableLoader";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "../../firebase/firebase";
import Pagination from "../Pagination/Pagination";

const UserTable = ({
  usersData,
  loading,
  getAllUsers,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all_users");
  const [isDeactivationModalOpen, setDeactivationModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const storage = getStorage(app);

  const [imageUrls, setImageUrls] = useState({});

  // Filter users based on selected status
  const filteredUsers =
    statusFilter === "all_users"
      ? usersData?.all_users
      : statusFilter === "active_users"
      ? usersData?.active_users
      : usersData?.deactive_users;

  const handleViewUser = (userId, imgUrl) => {
    navigate(`/user-details/${userId}`, { state: { imgUrl } });
  };

  const handleDeactivateUser = () => {
    setDeactivationModalOpen(false);
    getAllUsers();
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
      for (const user of filteredUsers) {
        const url = await getImageUrl(user.user_avatar.replace(/%2F/g, "/"));
        urls[user.user_id] = url;
      }
      setImageUrls(urls);
    };

    if (filteredUsers?.length > 0) {
      fetchImageUrls();
    }
  }, [usersData]);

  return (
    <div className="p-6 h-full w-full bg-gray-50 overflow-y-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>

        {/* Filter Control */}
        <div className="flex space-x-4">
          <button
            onClick={() => setStatusFilter("all_users")}
            className={`${
              statusFilter === "all_users"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("active_users")}
            className={`${
              statusFilter === "active_users"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter("offline_users")}
            className={`${
              statusFilter === "offline_users"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden bg-white border border-gray-300 rounded-xl shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#074F57] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Email Address
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Status
              </th>
              <th className="py-4 px-6 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableLoader />
            ) : filteredUsers?.length > 0 ? (
              <>
                {filteredUsers?.map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b hover:bg-gray-100`}
                  >
                    {/* User Info */}
                    <td className="py-4 px-6 flex items-center space-x-4">
                      <img
                        src={imageUrls[user?.user_id] || "/default-avatar.jpg"}
                        alt={user?.user_name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {user?.user_name}
                        </p>
                        {/* <p className="text-gray-500 text-sm">
                          @{user?.user_name?.split(" ")[0].toLowerCase()}
                        </p> */}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-6 text-gray-600">{user?.email}</td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user?.is_deactivate === true
                            ? "bg-gray-100 text-gray-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user?.is_deactivate ? "Inactive" : "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        {/* View Button */}
                        <button
                          onClick={() =>
                            handleViewUser(
                              user?.user_uid,
                              imageUrls[user?.user_id]
                            )
                          }
                          className="text-[#074F57] hover:text-[#0e2a2d]"
                        >
                          <FaRegEye size={18} />
                        </button>

                        {/* Delete Button */}
                        {user?.is_deactivate ? (
                          <button disabled className="text-[#a7a8a8]">
                            <PiTrashSimpleBold size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedUserId(user.user_id);
                              setDeactivationModalOpen(true);
                            }}
                            className="text-[#074F57] hover:text-[#0e2a2d]"
                          >
                            <PiTrashSimpleBold size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <div className="p-4 space-y-4">
                <p className="text-black">No record found</p>
              </div>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Deactivation Modal */}
      <DeactivationModal
        isOpen={isDeactivationModalOpen}
        onClose={() => setDeactivationModalOpen(false)}
        onConfirm={handleDeactivateUser}
        uid={selectedUserId}
      />
    </div>
  );
};

export default UserTable;
