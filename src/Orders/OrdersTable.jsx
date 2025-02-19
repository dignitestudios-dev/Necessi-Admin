import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTableLoader from "../components/Loaders/OrdersTableLoader";
import axios from "../axios";
import Pagination from "../components/Pagination/Pagination";
import { getDateFormat } from "../data/DateFormat";

const OrdersTable = ({
  ordersData,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all_orders");

  // Filtered orders based on the selected filter
  const filteredOrders =
    filter === "all_orders"
      ? [
          ...(ordersData?.data?.item_orders || []),
          ...(ordersData?.data?.service_orders || []),
        ]
      : filter === "item_orders"
      ? ordersData?.data?.item_orders
      : ordersData?.data?.service_orders;

  const handleViewClick = (id) => {
    // Navigate to the order details page (you can modify the path as needed)
    navigate(`/order-details/${id}`);
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
    <div className="p-6 bg-gray-50 h-full w-full overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-3xl font-bold">Orders Management</h1>
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
          {["all_orders", "item_orders", "service_orders"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === category
                  ? "bg-[#074F57] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category === "all_orders"
                ? "All"
                : category === "item_orders"
                ? "Items"
                : "Services"}
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
                Order No
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Item/Service
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Ordered By
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Listed By
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Sale Price
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium">
                Order Date
              </th>
              {/* <th className="py-4 px-6 text-right text-sm font-medium">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <OrdersTableLoader />
            ) : filteredOrders.length > 0 ? (
              <>
                {filteredOrders?.map((order, index) => (
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
                      {order?.order_by}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {order?.order_by}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {order?.listed_by}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {order?.sale_price}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {getDateFormat(order?.created_at)}
                    </td>
                    {/* <td className="py-4 px-6 justify-items-end">
                  <FaRegEye
                    className="text-[#074F57] hover:text-[#0e2a2d] cursor-pointer"
                    onClick={() => handleViewClick(order.id)}
                  />
                </td> */}
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

export default OrdersTable;
