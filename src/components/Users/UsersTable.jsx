import React, { useState } from "react";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { PiTrashSimpleBold } from "react-icons/pi";


// Dummy User Data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    teams: ["Design", "Product"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Offline",
    teams: ["Engineering", "Product"],
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "Active",
    teams: ["Marketing", "Product"],
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    status: "Offline",
    teams: ["Finance"],
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

const UserTable = () => {
  const [users, setUsers] = useState(initialUsers);
  const [statusFilter, setStatusFilter] = useState("All"); // "All", "Active", "Offline"

  // Filter users based on selected status
  const filteredUsers =
    statusFilter === "All"
      ? users
      : users.filter((user) => user.status === statusFilter);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleViewUser = (userId) => {
    alert(`Viewing details for user ${userId}`); // Replace with actual view logic
  };

  return (
    <div className="p-6 h-auto w-full bg-gray-50">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>

        {/* Filter Control */}
        <div className="flex space-x-4">
          <button
            onClick={() => setStatusFilter("All")}
            className={`${
              statusFilter === "All"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("Active")}
            className={`${
              statusFilter === "Active"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter("Offline")}
            className={`${
              statusFilter === "Offline"
                ? "bg-[#074F57] text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#074F57] hover:text-white transition`}
          >
            Offline
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden bg-white border border-gray-300 rounded-xl shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#074F57] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium">User</th>
              <th className="py-4 px-6 text-left text-sm font-medium">Email Address</th>
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
                } border-b hover:bg-gray-100`}
              >
                {/* User Info */}
                <td className="py-4 px-6 flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">{user.name}</p>
                    <p className="text-gray-500 text-sm">@{user.name.split(" ")[0].toLowerCase()}</p>
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-6 text-gray-600">{user.email}</td>

                {/* Status */}
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end space-x-2">
                    {/* View Button */}
                    <button
                      onClick={() => handleViewUser(user.id)}
                      className="text-[#074F57] hover:text-[#0e2a2d]"
                    >
                      <FaRegEye size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-[#074F57] hover:text-[#0e2a2d]"
                    >
                      <PiTrashSimpleBold size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
