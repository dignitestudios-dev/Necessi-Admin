import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [filter, setFilter] = useState("weekly");

  // Sample sales data for line chart (replace with actual data)
  const data = {
    today: {
      services: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650], // Hourly sales data for Services today
      items: [120, 170, 220, 270, 320, 380, 440, 500, 560, 620, 680, 740], // Hourly sales data for Items today
    },
    weekly: {
      services: [5000, 7000, 8000, 8500, 9000, 10500, 12000],
      items: [3000, 5000, 7000, 7500, 8000, 9500, 10500],
    },
    monthly: {
      services: [15000, 18000, 22000, 24000, 26000],
      items: [12000, 16000, 20000, 22000, 23000],
    },
    lastMonth: {
      services: [11000, 13000, 14000, 16000, 18000],
      items: [10000, 12000, 14000, 15000, 16000],
    },
    yearly: {
      services: [350000, 360000, 380000, 400000],
      items: [300000, 320000, 340000, 360000],
    },
  };

  // Define time periods based on filter
  const timePeriods = {
    today: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM"], // Hourly periods for today
    weekly: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    monthly: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    lastMonth: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    yearly: ["Q1", "Q2", "Q3", "Q4"],
  };

  // Data for the line chart
  const chartData = {
    labels: timePeriods[filter], // Time periods for x-axis
    datasets: [
      {
        label: "Services Sales",
        data: data[filter].services, // Sales data for services
        fill: false,
        borderColor: "#074F57", // Line color for services
        tension: 0.1,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#074F57", // Point color for services
      },
      {
        label: "Items Sales",
        data: data[filter].items, // Sales data for items
        fill: false,
        borderColor: "#4F9D8E", // Line color for items
        tension: 0.1,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#4F9D8E", // Point color for items
      },
    ],
  };

  return (
    <div className="w-full p-6 border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg">
      {/* Filter Buttons */}
      <div className="w-full h-10 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">Sales Chart</h1>

        <div className="flex justify-end gap-2">
          {["today", "weekly", "monthly", "lastMonth", "yearly"].map((period) => (
            <button
              key={period}
              onClick={() => setFilter(period)}
              className={`px-2 py-1 text-xs font-normal rounded-full ${
                filter === period ? "bg-[#074F57] text-white" : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Line Chart */}
      <div style={{ height: "400px" }} className="relative">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: { backgroundColor: "#074F57", titleColor: "#fff", bodyColor: "#fff" },
            },
            scales: {
              x: {
                title: { display: true, text: "Time Period" },
                grid: { display: false },
              },
              y: {
                title: { display: true, text: "Sales Amount ($)" },
                beginAtZero: true,
                grid: { display: true, color: "#e0e0e0" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalesChart;
