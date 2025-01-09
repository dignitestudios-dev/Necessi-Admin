import React, { useState } from "react";
import { FaEllipsisV, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Dummy Data for Orders (Items and Services)
const initialOrders = [
  {
    id: 1,
    itemName: "Item Name",
    listingType: "Item",
    orderedBy: "John Doe",
    listedBy: "Lister Name",
    salePrice: "$1,200",
    orderDate: "2024-11-20 08:00",
  },
  {
    id: 2,
    itemName: "Service Name",
    listingType: "Service",
    orderedBy: "Jane Smith",
    listedBy: "Lister Name",
    salePrice: "$3,500",
    orderDate: "2024-11-19 14:00",
  },
  {
    id: 3,
    itemName: "Item Name",
    listingType: "Item",
    orderedBy: "Alice Johnson",
    listedBy: "Lister Name",
    salePrice: "$300",
    orderDate: "2024-11-17 20:00",
  },
  {
    id: 4,
    itemName: "Service Name",
    listingType: "Service",
    orderedBy: "Bob Brown",
    listedBy: "Lister Name",
    salePrice: "$2,000",
    orderDate: "2024-11-16 19:00",
  },
];

const OrdersTable = () => {
  const navigate = useNavigate();
  const [orders] = useState(initialOrders);
  const [filter, setFilter] = useState("All");

  // Filtered orders based on the selected filter
  const filteredOrders = orders.filter(
    (order) => filter === "All" || order.listingType === filter
  );

  const handleViewClick = (id) => {
    // Navigate to the order details page (you can modify the path as needed)
    navigate(`/order-details/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 h-full w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-3xl font-bold">Orders Management</h1>
        <button className="bg-[#074F57] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#063E47] transition">
          Export PDF
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {["All", "Item", "Service"].map((category) => (
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
              <th className="py-4 px-6 text-left text-sm font-medium">Order No</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Item/Service</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Ordered By</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Listed By</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Sale Price</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Order Date</th>
              {/* <th className="py-4 px-6 text-right text-sm font-medium">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b hover:bg-gray-100 transition duration-200`}
              >
                <td className="py-4 px-6 text-gray-800 font-medium">#{order.id}</td>
                <td className="py-4 px-6 text-gray-800">{order.itemName}</td>
                <td className="py-4 px-6 text-gray-800">{order.orderedBy}</td>
                <td className="py-4 px-6 text-gray-800">{order.listedBy}</td>
                <td className="py-4 px-6 text-gray-800">{order.salePrice}</td>
                <td className="py-4 px-6 text-gray-800">{order.orderDate}</td>
                {/* <td className="py-4 px-6 justify-items-end">
                  <FaRegEye
                    className="text-[#074F57] hover:text-[#0e2a2d] cursor-pointer"
                    onClick={() => handleViewClick(order.id)}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
