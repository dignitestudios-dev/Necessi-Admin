import React, { Fragment, useEffect, useState } from "react";
import {
  FaStar,
  FaRegMoneyBillAlt,
  FaThumbsUp,
  FaCommentAlt,
  FaLocationArrow,
} from "react-icons/fa";
import DeactivationModal from "../../components/Users/DeactivationModal";
import { useLocation, useParams } from "react-router-dom";
import axios from "../../axios";
import { getDateFormat } from "../../data/DateFormat";
import CardsLoader from "../../components/Loaders/CardsLoader";

const UserDetails = () => {
  const { id } = useParams();
  const {
    state: { imgUrl },
  } = useLocation();

  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/user-details/${id}`);
      setUserData(data);
    } catch (error) {
      console.log("🚀 ~ getAllUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmDeactivation = () => {
    getUserDetails();
  };

  return (
    <div className="p-6 h-auto w-full font-sans overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-8">User Details</h1>

      {loading ? (
        <CardsLoader />
      ) : (
        <Fragment>
          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 w-full space-y-6">
              {/* Profile Card */}
              <div className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={imgUrl}
                      alt={userData?.user?.user_name}
                      className="w-16 h-16 rounded-full shadow-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {userData?.user?.user_name}{" "}
                        <span
                          className={`mt-2 ml-1 px-3 py-1 rounded-full text-xs font-medium ${
                            userData?.user?.is_deactivate === false
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {userData?.user?.is_deactivate
                            ? "Deactivated"
                            : "Active"}
                        </span>
                      </h2>
                      <p className="text-gray-500 text-sm mb-1">
                        {userData?.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mt-2">Wallet Balance</p>
                    <div className="flex items-center justify-end space-x-2">
                      <FaRegMoneyBillAlt className="text-[#074F57]" />
                      <p className="text-lg font-semibold text-[#074F57]">
                        ${userData?.user?.balance}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="border border-[#074F57] bg-gray-50 shadow transition-shadow text-[#074F57] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100">
                      Total Spent: ${userData?.user?.spent_amount}
                    </div>
                    <div className="border border-[#074F57] bg-gray-50 text-[#074F57] shadow transition-shadow px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100">
                      Total Revenue: ${userData?.user?.total_revenue}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <button
                    disabled={userData?.user?.is_deactivate}
                    onClick={() => setIsModalOpen(true)}
                    className={`border border-[#074F57] bg-[#074F57] shadow transition-shadow text-white justify-start 
                    w-full  px-4 py-2 rounded-lg  duration-300 font-semibold 
                    ${
                      userData?.user?.is_deactivate
                        ? "hover:bg-[#074F57]"
                        : "hover:bg-[#0e3438]"
                    } `}
                  >
                    Deactivate User
                  </button>
                </div>
              </div>

              {/* Reviews Card */}
              <div className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Reviews
                </h3>
                <div className="space-y-4">
                  {userData?.user_reviews?.length > 0 ? (
                    <>
                      {userData?.user_reviews?.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 border rounded-xl bg-white transition-all cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={imgUrl}
                              alt={review.reviewer}
                              className="w-10 h-10 rounded-full border border-gray-300"
                            />
                            <div>
                              <p className="font-medium text-gray-800 -mb-2">
                                {review.reviewer}
                              </p>
                              <span className="text-sm text-gray-500">
                                {getDateFormat(review.created_at)}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">
                            {review.data}
                          </p>
                          <div className="flex space-x-1 text-yellow-400 mt-2">
                            {Array(review.rating)
                              .fill(null)
                              .map((_, i) => (
                                <FaStar key={i} />
                              ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-black">No review found</p>
                  )}
                </div>
              </div>

              {/* Transaction History Card */}
              <div className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Transaction History
                </h3>
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="border-b text-gray-800">
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Type</th>
                      <th className="py-2 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData?.transaction_history?.length > 0 ? (
                      <>
                        {userData?.transaction_history?.map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-2 px-4 text-gray-600">
                              {transaction.created_at}
                            </td>
                            <td className="py-2 px-4 text-gray-800">
                              {transaction.type === "service"
                                ? "Service"
                                : "Item"}
                            </td>
                            <td
                              className={`py-2 px-4 font-medium ${
                                transaction.amount < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              ${transaction.amount}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <p className="text-black">No transaction yet</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Section - Posts */}
            <div className="lg:w-2/3 w-full space-y-6">
              {userData?.user_posts?.length ? (
                <>
                  {userData?.user_posts?.map((user) => (
                    <div
                      key={user?.id}
                      className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <img
                            src={imgUrl}
                            alt={user.user.user_name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                              {user.user.user_name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-medium bg-[#074F57] text-white rounded-full p-2">
                          {new Date(user?.created_at)?.toDateString() ===
                          new Date()?.toDateString()
                            ? "Today"
                            : new Date(user?.created_at)?.toDateString() ===
                              new Date(Date.now() - 86400000)?.toDateString()
                            ? "Yesterday"
                            : getDateFormat(user?.created_at)}
                        </span>
                      </div>

                      <div className="mt-3">
                        <h5 className="text-lg font-semibold text-gray-800 mb-1">
                          {user?.title}
                        </h5>
                        <p className="text-md text-gray-600">
                          {user?.description}
                        </p>
                      </div>

                      <div className="mt-3 space-y-1 text-sm text-gray-700">
                        <p>
                          <strong>Budget:</strong> ${user?.budget}
                        </p>
                        <p>
                          <strong>Duration:</strong>{" "}
                          {getDateFormat(user?.start_date)} -{" "}
                          {getDateFormat(user?.end_date)}
                        </p>
                        <p className="flex items-center">
                          <FaLocationArrow className="mr-2 text-gray-500" />
                          {user?.state}, {user?.city}, {user?.location}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-xs">
                            <FaThumbsUp />
                            <span>{user?.likes_count} likes</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-xs">
                            <FaCommentAlt />
                            <span>{user?.bids_count}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
                  <p className="text-black">Oops! No posts to display.</p>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}

      {/* Deactivation Modal */}
      <DeactivationModal
        uid={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDeactivation}
      />
    </div>
  );
};

export default UserDetails;
