import React from "react";
import { FaDollarSign } from "react-icons/fa";

const TransactionModal = ({ selectedTransaction, closeModal }) => {
  const calculateTotalRevenue = (transaction) => {
    return parseFloat(transaction.totalAmount.replace('$', '').replace(',', ''));
  };

  const calculatePlatformEarnings = (transaction) => {
    return parseFloat(transaction.platformFee.replace('$', '').replace(',', ''));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        {/* Modal Title */}
        <h2 className="text-3xl font-semibold text-[#074F57] mb-6 border-b pb-4">Transaction Report
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedTransaction.status === "Received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {selectedTransaction.status}
          </span>
        </h2>

        {/* Transaction Details Section */}
        <div className="space-y-6">
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
  );
};

export default TransactionModal;