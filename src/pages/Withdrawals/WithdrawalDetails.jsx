import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toast";
import NotificationsLoader from "../../components/Loaders/NotificationsLoader";

const WithdrawalDetails = () => {
  const { id } = useParams(); // Fetch the withdrawal ID from the URL
  const navigate = useNavigate();
  const [withdrawalData, setWithdrawalData] = useState("");

  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionModal, setRejectionModal] = useState(false);
  const [reasonError, setReasonError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const getWithDrawalDetail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/withdrawals/${id}`);
      setWithdrawalData(data);
    } catch (error) {
      console.log("🚀 ~ getAllUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Find the specific withdrawal request by ID
  useEffect(() => {
    getWithDrawalDetail();
  }, []);

  // Handle approve action
  const handleApprove = async () => {
    try {
      if (withdrawalData?.amount < 1) {
        ErrorToast("Withdrawal amount must be greater than 0");
        return;
      }
      setApproveLoading(true);
      const response = await axios.get(`/admin/withdrawals/${id}/approve`);
      if (response.status === 200) {
        setApproveLoading(false);
        SuccessToast("Approved");
        navigate("/withdrawals");
      }
    } catch (err) {
      console.log("🚀 ~ handleApprove ~ err:", err.response.data.message);
      ErrorToast(err.response.data.message);
      setApproveLoading(false);
    }
  };

  // Handle reject action
  const handleReject = async () => {
    if (!rejectionReason) {
      setReasonError("Please provide a reason for rejection.");
      return;
    }
    try {
      setRejectLoading(true);
      const response = await axios.post(`/admin/withdrawals/${id}/reject`, {
        reason: rejectionReason,
      });
      if (response.status === 200) {
        setRejectLoading(false);
        SuccessToast("Withdrawal Rejected");
        navigate("/withdrawals");
      }
    } catch (err) {
      console.log("🚀 ~ handleApprove ~ err:", err.response.data.message);
      ErrorToast(err.response.data.message);
      setRejectLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 h-auto overflow-auto">
      {loading ? (
        <div className="w-full">
          <NotificationsLoader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Withdrawal Details
          </h1>

          {/* User Info Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-8 relative">
            <div className="flex items-center mb-6">
              {/* Profile Picture (Bigger) */}
              <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* User Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {withdrawalData.userName}
                </h2>
                <p className="text-gray-600 mb-2">
                  <strong>Email:</strong> {withdrawalData?.user?.email}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Requested Amount:</strong> {withdrawalData.amount}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Status:</strong> {withdrawalData.status}
                </p>
                <p className="text-gray-600">
                  <strong>Request Date:</strong> {withdrawalData.request_date}
                </p>
              </div>
            </div>

            {/* Approve/Reject Buttons (Top-right aligned) */}
            {withdrawalData.status === "pending" && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  disabled={approveLoading}
                  onClick={handleApprove}
                  className="bg-[#074F57] text-white py-2 px-4 rounded-md text-sm font-normal flex items-center gap-1 focus:outline-none shadow-md transition duration-300"
                >
                  <FaCheck className="text-base" />{" "}
                  {approveLoading ? "Approve..." : "Approve"}
                </button>

                <button
                  onClick={() => setRejectionModal(true)}
                  className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-normal flex items-center gap-1 focus:outline-none shadow-md transition duration-300"
                >
                  <FaTimes className="text-base" /> Reject
                </button>
              </div>
            )}
          </div>

          {/* Rejection Modal */}
          {rejectionModal && (
            <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
              <textarea
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  setReasonError(null);
                }}
                className="w-full p-4 border border-gray-300 rounded-md
                  text-black text-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="5"
                placeholder="Enter reason for rejection"
              />
              <div className="w-full flex justify-end">
                <button
                  onClick={() => {
                    setRejectionModal(false);
                    setRejectionReason("");
                  }}
                  className="bg-red-600 text-white py-2 px-4 mr-1 rounded-md text-sm font-normal flex items-center gap-1 focus:outline-none shadow-md transition duration-300"
                >
                  <FaTimes className="text-base" /> Cancel
                </button>
                <button
                  disabled={rejectLoading}
                  onClick={handleReject}
                  className="bg-[#074F57] text-white py-2 px-4 rounded-md text-sm font-normal flex items-center gap-1 focus:outline-none shadow-md transition duration-300"
                >
                  <FaCheck className="text-base" />{" "}
                  {rejectLoading ? "..." : "Submit"}
                </button>
              </div>
              <div className="w-full flex justify-end pt-1">
                {reasonError && (
                  <p className="text-xs text-red-500">{reasonError}</p>
                )}
              </div>
            </div>
          )}

          {/* Transaction History Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Transaction History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead className=" text-gray-800 border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-lg font-medium">Date</th>
                    <th className="py-4 px-6 text-lg font-medium">Amount</th>
                    <th className="py-4 px-6 text-lg font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalData?.history?.data?.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b hover:bg-teal-50"
                    >
                      <td className="py-4 px-6 text-gray-800">
                        {transaction.request_date}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {transaction.amount}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {transaction.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WithdrawalDetails;
