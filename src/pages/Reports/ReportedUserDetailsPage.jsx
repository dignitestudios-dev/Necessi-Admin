import React, { useState } from "react";
import { FaExclamationTriangle, FaTimes, FaStar } from "react-icons/fa";

// Static user and report details
const user = {
  id: 1,
  name: "Olivia James",
  email: "olivia.james@example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  status: "Active",
  walletBalance: 120.5,
  posts: [
    {
      id: 1,
      title: "Help me move!",
      content: "Need help with moving some furniture. Must have a truck.",
    },
    {
      id: 2,
      title: "Furniture Assembly",
      content: "Looking for someone to assemble furniture for my new apartment.",
    },
  ],
  reviews: [
    {
      id: 1,
      reviewer: "Jane Smith",
      comment: "Very helpful and prompt!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 2,
      reviewer: "Bob Brown",
      comment: "Very cooperative, would work with again.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ],
  transactions: [
    { id: 1, date: "2024-01-05", amount: -20.0, description: "Purchased item A" },
    { id: 2, date: "2024-01-03", amount: 50.0, description: "Wallet recharge" },
  ],
};

const reportDetails = {
  reportedBy: "John Doe",
  reportDate: "2024-01-10",
  reportReason: "Inappropriate content - Offensive language",
};

const ReportedUserDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [isDeactivated, setIsDeactivated] = useState(false);

  const deactivationReasons = [
    "Violation of terms",
    "Inactive for too long",
    "Requested by the user",
    "Other",
  ];

  const handleDeactivate = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDeactivation = () => {
    if (!deactivationReason) {
      alert("Please select a reason for deactivation.");
      return;
    }

    setIsDeactivated(true);
    setIsModalOpen(false);
    alert(`User deactivated successfully for the reason: ${deactivationReason}`);
  };

  return (
    <div className="p-6 h-full w-full overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-6">Reported User Details</h1>

      {/* Report Details Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-[#074F57]"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.status} • {user.email}</p>
              <p className="text-sm text-gray-500">Wallet Balance ${user.walletBalance}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-sm text-gray-700">
            <p><strong>Reported By:</strong> {reportDetails.reportedBy}</p>
            <p><strong>Report Date:</strong> {reportDetails.reportDate}</p>
          </div>

          <div className="text-sm text-gray-700">
            <p className="font-semibold">Reason for Report:</p>
            <p>{reportDetails.reportReason}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleDeactivate}
              className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f3539]"
            >
              Deactivate User
            </button>
          </div>
        </div>
      </div>

      {/* User Reviews Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8 space-y-6 mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Reviews</h3>
        {user.reviews.length > 0 ? (
          user.reviews.map((review) => (
            <div key={review.id} className="flex items-center space-x-4 mt-4">
              <img
                src={review.avatar}
                alt={review.reviewer}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
                <p className="font-semibold text-gray-800">{review.reviewer}</p>
                <p className="text-gray-600 text-sm">{review.comment}</p>
                <div className="flex space-x-1 text-yellow-400 mt-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
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

      {/* Deactivation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Deactivate User</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">Please select a reason for deactivating the user.</p>

              {/* Deactivation Reasons */}
              <div className="space-y-2">
                {deactivationReasons.map((reason, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={reason}
                      name="deactivationReason"
                      value={reason}
                      onChange={(e) => setDeactivationReason(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor={reason} className="text-sm text-gray-700">{reason}</label>
                  </div>
                ))}
              </div>

              {/* Other Reason Input */}
              {deactivationReason === "Other" && (
                <textarea
                  value={deactivationReason}
                  onChange={(e) => setDeactivationReason(e.target.value)}
                  placeholder="Please specify other reason"
                  className="w-full p-4 border border-gray-300 rounded-lg mt-4"
                  rows={4}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeactivation}
                className="bg-[#074F57] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f3539]"
              >
                Confirm Deactivation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedUserDetailPage;
