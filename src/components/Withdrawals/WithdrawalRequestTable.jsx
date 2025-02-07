import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrdersTableLoader from "./../Loaders/OrdersTableLoader";
import WithDrawalTableLoader from "../Loaders/WithDrawalTableLoader";
import Pagination from "../Pagination/Pagination";

const WithdrawalRequestTable = ({
  withdrawalsData,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending");

  // Navigate to withdrawal details page when eye icon is clicked
  const handleViewDetails = (requestId) => {
    navigate(`/withdrawal-details/${requestId}`); // Navigate to the specific detail page
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
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
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
              <th className="py-4 px-6 text-left text-sm font-medium">
                Amount
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
              <WithDrawalTableLoader />
            ) : withdrawalsData?.data?.length > 0 ? (
              <>
                {withdrawalsData?.data?.map((request) => (
                  <tr
                    key={request.id}
                    className={`${
                      request.status === "pending"
                        ? "bg-gray-50"
                        : request.status === "approved"
                        ? "bg-green-50"
                        : "bg-red-50"
                    } border-b hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      {request.user.first_name} {request.user.last_name}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {request.user?.email}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {request.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : request.status === "approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {request.status === "approved"
                          ? "Approved"
                          : request.status === "pending"
                          ? "Pending"
                          : "Rejected"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex space-x-2 justify-end">
                        <FaRegEye
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => handleViewDetails(request.id)} // Handle eye click event
                        />
                      </div>
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
    </div>
  );
};

export default WithdrawalRequestTable;
