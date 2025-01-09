import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UsersChart = () => {
  const [filter, setFilter] = useState("weekly");

  // Sample data for the user chart (replace with actual data)
  const data = {
    daily: [50, 60, 70, 80, 90, 100, 110],
    weekly: [300, 400, 450, 500, 550, 600, 650],
    monthly: [1200, 1400, 1500, 1600, 1700, 1800, 1900],
    lastMonth: [1000, 1100, 1200, 1300, 1400, 1500, 1600],
    yearly: [4000, 4200, 4300, 4400, 4600, 4800, 5000],
  };

  // Data for the Line chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Labels represent months (or any other unit depending on filter)
    datasets: [
      {
        label: "New Users",
        data: data[filter], // Data based on the selected filter
        borderColor: "#074F57",
        backgroundColor: "#074F5750",
        fill: true, // Fill area below the line
        tension: 0.4, // For smooth curves
        borderWidth: 2,
        pointRadius: 5, // Points on the line
        pointBackgroundColor: "#074F57",
      },
    ],
  };

  return (
    <div className="w-full p-6 border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg">
      {/* Filter Buttons */}
      <div className="w-full h-10 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">User Growth Chart</h1>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setFilter("daily")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "daily" ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setFilter("weekly")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "weekly" ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setFilter("monthly")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "monthly" ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setFilter("lastMonth")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "lastMonth" ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Last Month
          </button>
          <button
            onClick={() => setFilter("yearly")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "yearly" ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Line Chart */}
      <div style={{ height: "400px" }} className="relative">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false } } } }} />
      </div>
    </div>
  );
};

export default UsersChart;
