import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

// Dummy User Data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "User",
    bookingDate: "2024-11-20 08:00",
    totalAmount: "$16,000",
    source: "Web Reservation",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Post",
    bookingDate: "2024-11-19 14:00",
    totalAmount: "$21,000",
    source: "Font Desks",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "User",
    bookingDate: "2024-11-17 20:00",
    totalAmount: "$24,500",
    source: "Group Reservation",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    status: "Post",
    bookingDate: "2024-11-16 19:00",
    totalAmount: "$14,000",
    source: "Font Desks",
  },
];

const ReportsTable = () => {
  const [users] = useState(initialUsers);
  const [filter, setFilter] = useState("All"); // Default filter

  // Filtered users based on the selected filter
  const filteredUsers = users.filter((user) => 
    filter === "All" ? true : user.status === filter
  );

  return (
    <div className="p-6 bg-gray-50 h-full w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-3xl font-bold">Reports Management</h1>
        <button className="bg-[#074F57] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#063E47] transition">
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
              <th className="py-4 px-6 text-left text-sm font-medium">Report No</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Reported User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Report Type</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Report Date</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Total Amount</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Status</th>
              <th className="py-4 px-6 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b hover:bg-gray-100 transition duration-200`}
              >
                <td className="py-4 px-6 text-gray-800 font-medium">#{user.id}</td>
                <td className="py-4 px-6 text-gray-800">{user.name}</td>
                <td className="py-4 px-6 text-gray-800">{user.source}</td>
                <td className="py-4 px-6 text-gray-800">{user.bookingDate}</td>
                <td className="py-4 px-6 text-gray-800">{user.totalAmount}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "User"
                        ? "bg-green-100 text-green-600"
                        : user.status === "Post"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <FaEllipsisV className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;
