import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [filter, setFilter] = useState("weekly");

  // Sample data for the bar chart (You would replace this with your real data)
  const data = {
    weekly: [500, 1000, 1500, 1200, 1300, 1600, 1800],
    monthly: [7000, 8500, 9000, 9500, 10200, 11000, 11500],
    yearly: [40000, 42000, 43000, 44000, 46000, 48000, 50000],
  };

  // Data for the bar chart
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    datasets: [
      {
        label: "Revenue",
        data: data[filter],
        backgroundColor: "#074F5750",
        borderColor: "#074F57",
        borderRadius: {topLeft: 30, topRight:30},
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full p-6  border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg  ">
      {/* Filter Buttons */}

      <div className="w-full h-10 flex justify-between items-center">
      <h1 className="text-black text-xl font-bold">Revenue Graph</h1>

      <div className="flex justify-end gap-2 ">
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
          onClick={() => setFilter("yearly")}
          className={`px-2 py-1 text-xs font-normal rounded-full ${
            filter === "yearly" ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
          }`}
        >
          Yearly
        </button>
      </div>
      </div>

      {/* Bar Chart */}
      <div style={{ height: "400px" }} className="relative">
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales:{x:{grid:{display:false}}} }} />
      </div>
    </div>
  );
};

export default RevenueChart;
