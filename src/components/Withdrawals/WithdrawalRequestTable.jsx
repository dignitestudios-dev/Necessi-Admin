import React, { useState } from "react";
import { FaEllipsisV, FaCheck, FaTimes } from "react-icons/fa";

// Dummy Data for Withdrawal Requests
const initialWithdrawals = [
  {
    id: 1,
    userName: "John Doe",
    email: "john.doe@example.com",
    amount: "$500",
    status: "Pending",
    requestDate: "2024-01-10",
  },
  {
    id: 2,
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    amount: "$1,000",
    status: "Approved",
    requestDate: "2024-01-09",
  },
  {
    id: 3,
    userName: "Alice Johnson",
    email: "alice.johnson@example.com",
    amount: "$300",
    status: "Rejected",
    requestDate: "2024-01-08",
  },
  {
    id: 4,
    userName: "Bob Brown",
    email: "bob.brown@example.com",
    amount: "$750",
    status: "Pending",
    requestDate: "2024-01-07",
  },
];

const WithdrawalRequestTable = () => {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [activeTab, setActiveTab] = useState("Pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Filter requests based on the selected tab
  const filteredRequests = withdrawals.filter((request) =>
    activeTab === "All" ? true : request.status === activeTab
  );

  // Handle approve action
  const handleApprove = (requestId) => {
    setWithdrawals((prevState) =>
      prevState.map((request) =>
        request.id === requestId ? { ...request, status: "Approved" } : request
      )
    );
  };

  // Handle reject action
  const handleReject = (requestId) => {
    if (!rejectionReason) {
      alert("Please provide a reason for rejection.");
      return;
    }

    setWithdrawals((prevState) =>
      prevState.map((request) =>
        request.id === requestId
          ? { ...request, status: "Rejected", rejectionReason }
          : request
      )
    );
    setIsModalOpen(false);
  };

  // Open rejection modal
  const openRejectionModal = (request) => {
    setCurrentRequest(request);
    setRejectionReason("");
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 h-full w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-3xl font-bold">Withdrawal Requests</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {["All","Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === tab
                  ? "bg-[#074F57] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-300 rounded-xl shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-[#074F57] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Email</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Amount</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Status</th>
              <th className="py-4 px-6 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr
                key={request.id}
                className={`${
                  request.status === "Pending"
                    ? "bg-gray-50"
                    : request.status === "Approved"
                    ? "bg-green-50"
                    : "bg-red-50"
                } border-b hover:bg-gray-100 transition duration-200`}
              >
                <td className="py-4 px-6 text-gray-800 font-medium">{request.userName}</td>
                <td className="py-4 px-6 text-gray-800">{request.email}</td>
                <td className="py-4 px-6 text-gray-800">{request.amount}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : request.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  {request.status === "Pending" && (
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => openRejectionModal(request)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rejection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reject Withdrawal</h2>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting the withdrawal request.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              rows="4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(currentRequest.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalRequestTable;
