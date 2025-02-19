import React, { useState } from "react";
import { FaEllipsisV, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrdersTableLoader from "../Loaders/OrdersTableLoader";
import axios from "../../axios";
import Pagination from "../Pagination/Pagination";
import { getDateFormat } from "../../data/DateFormat";

const ReportsTable = ({
  reportsData,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  // Filtered users based on the selected filter
  const filteredReports =
    filter === "All"
      ? [...(reportsData?.data?.user || []), ...(reportsData?.data?.post || [])]
      : filter === "User"
      ? reportsData?.data?.user
      : reportsData?.data?.post;

  const handleViewClick = (status) => {
    if (status?.reported_entity?.type === "User") {
      navigate(`/report-user-details/${status?.report_id}`);
    } else if (status?.reported_entity?.type === "Post") {
      navigate(`/report-details/${status?.report_id}`);
    }
  };

  const handlePdf = async () => {
    try {
      const response = await axios.get("/admin/reports-pdf", {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log("🚀 ~ handlePdf ~ err:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 h-full w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-3xl font-bold">Reports Management</h1>
        <button
          onClick={handlePdf}
          className="bg-[#074F57] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#063E47] transition"
        >
          Export PDF
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {["All", "User", "Post"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === category
                  ? "bg-[#074F57] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-300 rounded-xl shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-[#074F57] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Report No
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Reported User
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Reason
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Report Date
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Report Type
              </th>
              <th className="py-4 px-6 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <OrdersTableLoader />
            ) : filteredReports?.length > 0 ? (
              <>
                {filteredReports?.map((report, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      # {report.report_id}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {report.reporter_user.name}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {report.report_reason}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {getDateFormat(report.report_date)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report?.reported_entity?.type === "User"
                            ? "bg-green-100 text-green-600"
                            : report?.reported_entity?.type === "Post"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {report?.reported_entity?.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 justify-items-end">
                      <FaRegEye
                        className="text-[#074F57] hover:text-[#0e2a2d] cursor-pointer"
                        onClick={() => handleViewClick(report)}
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
    </div>
  );
};

export default ReportsTable;
