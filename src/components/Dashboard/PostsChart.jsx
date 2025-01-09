import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PostsChart = () => {
  const [filter, setFilter] = useState("weekly");

  // Sample data for the posts chart (replace with actual data)
  const data = {
    today: [5, 8], // Example posts data for today (Services, Items)
    weekly: [35, 50],
    monthly: [120, 150],
    lastMonth: [100, 120],
    yearly: [400, 500],
  };

  // Categories of posts (only Services and Items)
  const categories = ["Services", "Items"];

  // Data for the Bar chart
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Posts Count",
        data: data[filter], // Data based on the selected filter
        backgroundColor: "#074F5750",
        borderColor: "#074F57",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="w-full p-6 border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg">
      {/* Filter Buttons */}
      <div className="w-full h-10 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">Posts Chart</h1>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setFilter("today")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "today" ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Today
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

      {/* Horizontal Bar Chart */}
      <div style={{ height: "400px" }} className="relative">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y", // Make the bars horizontal
            scales: {
              x: { grid: { display: false }, title: { display: true, text: "Post Count" } },
              y: { grid: { display: false }, title: { display: true, text: "Categories" } },
            },
            plugins: {
              tooltip: { backgroundColor: "#074F57", titleColor: "#fff", bodyColor: "#fff" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PostsChart;
