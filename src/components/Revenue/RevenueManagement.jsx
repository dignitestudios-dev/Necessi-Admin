import React, { useState } from "react";
import { FaDollarSign, FaRegEye } from "react-icons/fa";
import TransactionModal from "./TransactionModal";
import RevenueTableLoader from "../Loaders/RevenueTableLoader";
import Pagination from "../Pagination/Pagination";

const RevenueManagement = ({
  revenueData,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const [filter, setFilter] = useState("All"); // Default filter (All, Received, Withdrawn)
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Store the selected transaction

  const filteredTransactions =
    filter === "All"
      ? revenueData?.all
      : filter === "Received"
      ? revenueData?.received
      : revenueData?.withdrawn;

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
              <h2 className="text-lg font-semibold text-black">
                Total Revenue
              </h2>
              <p className="text-xl font-medium text-gray-800">
                ${revenueData?.total_revenue}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-[#074F57]">
          <div className="flex items-center space-x-4">
            <FaDollarSign className="text-[#074F57] text-4xl" />
            <div>
              <h2 className="text-lg font-semibold text-black">
                Platform Earnings
              </h2>
              <p className="text-xl font-medium text-gray-800">
                ${revenueData?.platform_earnings}
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
              <th className="py-4 px-6 text-left text-sm font-medium">
                Transaction No
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Transaction Date
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Total Amount
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Platform Fee
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Status
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Total Revenue
              </th>
              {/* <th className="py-4 px-6 text-left text-sm font-medium">
                Platform Earnings
              </th> */}
              <th className="py-4 px-6 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <RevenueTableLoader />
            ) : filteredTransactions?.length > 0 ? (
              <>
                {filteredTransactions?.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      #{index + 1}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {transaction.user}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {transaction.transaction_date}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      ${transaction.total_amount}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {transaction.platform_fee}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === "received"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.status === "received"
                          ? "Received"
                          : "WithDrawn"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      ${transaction.total_revenue}
                    </td>
                    {/* <td className="py-4 px-6 text-gray-800">
                      ${transaction.platform_fee}
                    </td> */}
                    <td className="py-4 px-6 justify-items-end">
                      <FaRegEye
                        className="text-[#074F57] hover:text-[#0e2a2d] cursor-pointer"
                        onClick={() => setSelectedTransaction(transaction)} // Open modal when clicked
                      />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <div className=" py-4 pr-2 pl-1">
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

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionModal
          selectedTransaction={selectedTransaction}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default RevenueManagement;
