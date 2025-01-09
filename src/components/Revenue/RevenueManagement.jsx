import React, { useState } from "react";
import { FaDollarSign, FaRegEye } from "react-icons/fa";

// Dummy Transaction Data
const initialTransactions = [
  {
    id: 1,
    user: "John Doe",
    status: "Received",
    transactionDate: "2024-11-20 08:00",
    totalAmount: "$16,000",
    platformFee: "$1,600", // 10% platform fee
    source: "Web Reservation",
  },
  {
    id: 2,
    user: "Jane Smith",
    status: "Withdrawn",
    transactionDate: "2024-11-19 14:00",
    totalAmount: "$21,000",
    platformFee: "$2,100",
    source: "Font Desks",
  },
  {
    id: 3,
    user: "Alice Johnson",
    status: "Received",
    transactionDate: "2024-11-17 20:00",
    totalAmount: "$24,500",
    platformFee: "$2,450",
    source: "Group Reservation",
  },
  {
    id: 4,
    user: "Bob Brown",
    status: "Withdrawn",
    transactionDate: "2024-11-16 19:00",
    totalAmount: "$14,000",
    platformFee: "$1,400",
    source: "Font Desks",
  },
];

const RevenueManagement = () => {
  const [transactions] = useState(initialTransactions);
  const [filter, setFilter] = useState("All"); // Default filter (All, Received, Withdrawn)
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Store the selected transaction

  // Calculate total revenue and platform earnings
  const calculateTotalRevenue = (transaction) => {
    return parseFloat(transaction.totalAmount.replace('$', '').replace(',', ''));
  };

  const calculatePlatformEarnings = (transaction) => {
    return parseFloat(transaction.platformFee.replace('$', '').replace(',', ''));
  };

  // Filter transactions based on the selected status
  const filteredTransactions = transactions.filter((transaction) =>
    filter === "All" ? true : transaction.status === filter
  );

  // Close modal
  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="p-6 h-full w-full overflow-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-3xl font-bold">Revenue Management</h1>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {["All", "Received", "Withdrawn"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === status
                  ? "bg-[#074F57] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Summary Section - Modern Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-[#074F57]">
          <div className="flex items-center space-x-4">
            <FaDollarSign className="text-[#074F57] text-4xl" />
            <div>
              <h2 className="text-lg font-semibold text-black">Total Revenue</h2>
              <p className="text-xl font-medium text-gray-800">
                ${transactions.reduce((acc, curr) => acc + calculateTotalRevenue(curr), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-[#074F57]">
          <div className="flex items-center space-x-4">
            <FaDollarSign className="text-[#074F57] text-4xl" />
            <div>
              <h2 className="text-lg font-semibold text-black">Platform Earnings</h2>
              <p className="text-xl font-medium text-gray-800">
                ${transactions.reduce((acc, curr) => acc + calculatePlatformEarnings(curr), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-300 rounded-xl shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-[#074F57] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium">Transaction No</th>
              <th className="py-4 px-6 text-left text-sm font-medium">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Transaction Date</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Total Amount</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Platform Fee</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Status</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Total Revenue</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Platform Earnings</th>
              <th className="py-4 px-6 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b hover:bg-gray-100 transition duration-200`}
              >
                <td className="py-4 px-6 text-gray-800 font-medium">#{transaction.id}</td>
                <td className="py-4 px-6 text-gray-800">{transaction.user}</td>
                <td className="py-4 px-6 text-gray-800">{transaction.transactionDate}</td>
                <td className="py-4 px-6 text-gray-800">{transaction.totalAmount}</td>
                <td className="py-4 px-6 text-gray-800">{transaction.platformFee}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "Received"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-800">
                  ${calculateTotalRevenue(transaction).toLocaleString()}
                </td>
                <td className="py-4 px-6 text-gray-800">
                  ${calculatePlatformEarnings(transaction).toLocaleString()}
                </td>
                <td className="py-4 px-6 justify-items-end">
                  <FaRegEye
                    className="text-[#074F57] hover:text-[#0e2a2d] cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)} // Open modal when clicked
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
{selectedTransaction && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      {/* Modal Title */}
      <h2 className="text-3xl font-semibold text-[#074F57] mb-6 border-b pb-4">Transaction Report <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedTransaction.status === "Received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {selectedTransaction.status}
          </span></h2>

      {/* Transaction Details Section */}
      <div className="space-y-6">
        {/* Transaction Status */}
        {/* <div className="flex  items-center">
          <p className="text-sm text-gray-500 mr-1">Status</p>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedTransaction.status === "Received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {selectedTransaction.status}
          </span>
        </div> */}
        {/* User and Date */}
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-800 font-medium">User: <span className="font-semibold text-[#074F57]">{selectedTransaction.user}</span></p>
          <p className="text-md text-gray-600">{selectedTransaction.transactionDate}</p>
        </div>

        {/* Transaction Amount and Platform Fee */}
        <div className="grid grid-cols-2 gap-4">
          
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-lg font-semibold text-[#074F57]">{selectedTransaction.totalAmount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Platform Fee</p>
            <p className="text-lg font-semibold text-[#074F57]">{selectedTransaction.platformFee}</p>
          </div>
        </div>

        

        {/* Total Revenue and Platform Earnings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-lg font-semibold text-[#074F57]">${calculateTotalRevenue(selectedTransaction).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Platform Earnings</p>
            <p className="text-lg font-semibold text-[#074F57]">${calculatePlatformEarnings(selectedTransaction).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={closeModal}
        className="bg-[#074F57] text-white py-3 px-6 rounded-lg mt-8 w-full text-lg font-semibold hover:bg-[#0f383b] transition duration-200"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default RevenueManagement;
