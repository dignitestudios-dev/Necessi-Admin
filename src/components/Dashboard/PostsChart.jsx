import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PostsChart = ({ newData }) => {
  const [filter, setFilter] = useState("weekly");
  const [graphData, setGraphData] = useState({});

  // Categories of posts (only Services and Items)
  const categories = ["Services", "Items"];

  // Data for the Bar chart
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Posts Count",
        data: graphData[filter], // Data based on the selected filter
        backgroundColor: "#074F5750",
        borderColor: "#074F57",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  useEffect(() => {
    setGraphData({
      today: [
        newData?.today?.points?.items?.value,
        newData?.today?.points?.services?.value,
      ],
      weekly: [
        newData?.weekly?.points?.items?.value,
        newData?.weekly?.points?.services?.value,
      ],
      monthly: [
        newData?.monthly?.points?.items?.value,
        newData?.monthly?.points?.services?.value,
      ],
      lastMonth: [
        newData?.last_month?.points?.items?.value,
        newData?.last_month?.points?.services?.value,
      ],
    });
  }, [newData]);

  return (
    <div className="w-full p-6 border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg">
      {/* Filter Buttons */}
      <div className="w-full h-10 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">Posts Chart</h1>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setFilter("today")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "today"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("weekly")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "weekly"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setFilter("monthly")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "monthly"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setFilter("lastMonth")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "lastMonth"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Last Month
          </button>
          <button
            onClick={() => setFilter("yearly")}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "yearly"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
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
              x: {
                grid: { display: false },
                title: { display: true, text: "Post Count" },
                ticks: {
                  beginAtZero: true,
                  precision: 0, // Ensure that the ticks are only integers
                },
              },
              y: {
                grid: { display: false },
                title: { display: true, text: "Categories" },
              },
            },
            plugins: {
              tooltip: {
                backgroundColor: "#074F57",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PostsChart;
