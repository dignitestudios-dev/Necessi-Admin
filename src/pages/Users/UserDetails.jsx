import React, { useState } from "react";
import {
  FaStar,
  FaRegMoneyBillAlt,
  FaThumbsUp,
  FaCommentAlt,
  FaLocationArrow,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const UserDetails = ({ user }) => {
  if (!user) {
    user = {
      name: "Test User",
      email: "john.doe@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=1",
      walletBalance: 120.5,
      posts: [
        { id: 1, title: "Post Title 1", content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet." },
        { id: 2, title: "Post Title 2", content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet." },
      ],
      reviews: [
        { id: 1, reviewer: "Jane Smith", comment: "Great user! lorem ipsum dolar lorem ipsum lorem ipsum lorem lorem dollar dollar", rating: 5, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 2, reviewer: "Bob Brown", comment: "Very cooperative. lorem ipsum dolar lorem ipsum lorem ipsum lorem lorem dollar dollar", rating: 4, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
      transactions: [
        { id: 1, date: "2024-01-05", amount: -20.0, description: "Purchased item A" },
        { id: 2, date: "2024-01-03", amount: 50.0, description: "Wallet recharge" },
      ],
    };
  }

  const totalSpent  = user.transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalRevenue = user.transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

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
    <div className="p-6 h-auto w-full font-sans overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-8">User Details</h1>

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Profile and Info */}
        <div className="lg:w-1/3 w-full space-y-6">
          {/* Profile Card */}
          <div className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full shadow-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{user.name} <span
                    className={`mt-2 ml-1 px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>{user.status}</span></h2>
                  <p className="text-gray-500 text-sm mb-1">{user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mt-2">Wallet Balance</p>
                <div className="flex items-center justify-end space-x-2">
                  <FaRegMoneyBillAlt className="text-[#074F57]" />
                  <p className="text-lg font-semibold text-[#074F57]">${user.walletBalance}</p>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="border border-[#074F57] bg-gray-50 shadow transition-shadow text-[#074F57] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100">
                  Total Spent: ${Math.abs(totalSpent).toFixed(2)}
                </div>
                <div className="border border-[#074F57] bg-gray-50 text-[#074F57] shadow transition-shadow px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100">
                  Total Revenue: ${totalRevenue.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Deactivate Button */}
            <div className="mt-6 text-right ">
              <button
                onClick={handleDeactivate}
                className="border border-[#074F57] bg-[#074F57] shadow transition-shadow text-white justify-start w-full  px-4 py-2 rounded-lg  duration-300 font-semibold hover:bg-[#0e3438]"
              >
                Deactivate User
              </button>
            </div>
          </div>

          {/* Reviews Card */}
          <div className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>
            <div className="space-y-4">
              {user.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border rounded-xl bg-white transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.avatar}
                      alt={review.reviewer}
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-gray-800 -mb-2">{review.reviewer}</p>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                  <div className="flex space-x-1 text-yellow-400 mt-2">
                    {Array(review.rating)
                      .fill(null)
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History Card */}
          <div className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h3>
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b text-gray-800">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {user.transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-gray-600">{transaction.date}</td>
                    <td className="py-2 px-4 text-gray-800">{transaction.description}</td>
                    <td
                      className={`py-2 px-4 font-medium ${
                        transaction.amount < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      ${transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section - Posts */}
        <div className="lg:w-2/3 w-full space-y-6">
          {user.posts.map((post) => (
            <div key={post.id} className="border border-gray-200 bg-gray-50 shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{user.name}</h4>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-[#074F57] text-white rounded-full p-2">just now</span>
              </div>

              <div className="mt-3">
                <h5 className="text-lg font-semibold text-gray-800 mb-1">{post.title}</h5>
                <p className="text-md text-gray-600">{post.content}</p>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p>
                  <strong>Budget:</strong> $40
                </p>
                <p>
                  <strong>Duration:</strong> 12 Dec - 16 Jan 23
                </p>
                <p className="flex items-center">
                  <FaLocationArrow className="mr-2 text-gray-500" />
                  New York, 4 miles away
                </p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-xs">
                    <FaThumbsUp />
                    <span>10.4k likes</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-xs">
                    <FaCommentAlt />
                    <span>24 bids</span>
                  </button>
                </div>

                {/* <button className="bg-[#074F57] text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-[#074F57]">
                  View details
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deactivation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center transition-opacity">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deactivation</h2>
            <div className="space-y-4">
              <div className="flex items-center text-yellow-500">
                <p className="text-sm text-gray-600">Please select a reason for deactivating this user:</p>
              </div>

              <select
                value={deactivationReason}
                onChange={(e) => setDeactivationReason(e.target.value)}
                className="w-full text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#074F57]"
              >
                <option value="">Select a reason</option>
                {deactivationReasons.map((reason, idx) => (
                  <option key={idx} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDeactivation}
                  className="bg-[#074F57] text-white py-2 px-4 rounded-md hover:bg-[#0c292d] transition duration-300"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
