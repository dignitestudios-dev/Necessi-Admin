import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

// Dummy Data for Withdrawal Requests and Transaction History
const initialWithdrawals = [
  {
    id: 1,
    userName: "John Doe",
    email: "john.doe@example.com",
    amount: "$500",
    status: "Pending",
    requestDate: "2024-01-10",
  },
  {
    id: 2,
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    amount: "$1,000",
    status: "Approved",
    requestDate: "2024-01-09",
  },
  {
    id: 3,
    userName: "Alice Johnson",
    email: "alice.johnson@example.com",
    amount: "$300",
    status: "Rejected",
    requestDate: "2024-01-08",
  },
  {
    id: 4,
    userName: "Bob Brown",
    email: "bob.brown@example.com",
    amount: "$750",
    status: "Pending",
    requestDate: "2024-01-07",
  },
];

const initialTransactions = [
  { id: 1, date: "2024-01-01", amount: "$200", type: "Deposit" },
  { id: 2, date: "2024-01-05", amount: "$500", type: "Withdrawal" },
  { id: 3, date: "2024-01-06", amount: "$150", type: "Deposit" },
];

const WithdrawalDetails = () => {
  const { id } = useParams(); // Fetch the withdrawal ID from the URL
  const navigate = useNavigate();
  const [withdrawal, setWithdrawal] = useState(null);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [status, setStatus] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  // Find the specific withdrawal request by ID
  useEffect(() => {
    const currentWithdrawal = initialWithdrawals.find(
      (request) => request.id === parseInt(id)
    );
    if (currentWithdrawal) {
      setWithdrawal(currentWithdrawal);
      setStatus(currentWithdrawal.status);
    } else {
      navigate("/withdrawals"); // Redirect to withdrawal list page if not found
    }
  }, [id, navigate]);

  // Handle approve action
  const handleApprove = () => {
    setStatus("Approved");
    alert("Withdrawal Approved!");
  };

  // Handle reject action
  const handleReject = () => {
    if (!rejectionReason) {
      alert("Please provide a reason for rejection.");
      return;
    }
    setStatus("Rejected");
    alert("Withdrawal Rejected!");
  };

  return (
    <div className="w-full mx-auto p-6 h-auto overflow-auto">
  {withdrawal && (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Withdrawal Details</h1>

      {/* User Info Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-8 relative">
        <div className="flex items-center mb-6">
          {/* Profile Picture (Bigger) */}
          <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{withdrawal.userName}</h2>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> {withdrawal.email}</p>
            <p className="text-gray-600 mb-2"><strong>Requested Amount:</strong> {withdrawal.amount}</p>
            <p className="text-gray-600 mb-2"><strong>Status:</strong> {status}</p>
            <p className="text-gray-600"><strong>Request Date:</strong> {withdrawal.requestDate}</p>
          </div>
        </div>

        {/* Approve/Reject Buttons (Top-right aligned) */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleApprove}
            className="bg-[#074F57] text-white py-2 px-4 rounded-md text-sm font-normal flex items-center gap-1 focus:outline-none shadow-md transition duration-300"
          >
            <FaCheck className="text-base" /> Approve
          </button>

          <button
            onClick={() => setRejectionReason("")}
            className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-normal flex items-center gap-1 focus:outline-none shadow-md transition duration-300"
          >
            <FaTimes className="text-base" /> Reject
          </button>
        </div>

      </div>

      {/* Transaction History Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead className=" text-gray-800 border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 text-lg font-medium">Date</th>
                <th className="py-4 px-6 text-lg font-medium">Amount</th>
                <th className="py-4 px-6 text-lg font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-teal-50">
                  <td className="py-4 px-6 text-gray-800">{transaction.date}</td>
                  <td className="py-4 px-6 text-gray-800">{transaction.amount}</td>
                  <td className="py-4 px-6 text-gray-800">{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {status === "Rejected" && (
        <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md text-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="5"
            placeholder="Enter reason for rejection"
          />
        </div>
      )}
    </>
  )}
</div>

  
  );
};

export default WithdrawalDetails;
