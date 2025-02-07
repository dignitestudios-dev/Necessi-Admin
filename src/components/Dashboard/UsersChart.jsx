import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { monthEnum, timeEnum, weekDayEnum } from "../../data/graphEnum";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UsersChart = ({ newData }) => {
  const [filter, setFilter] = useState("weekly");
  const [graphData, setGraphData] = useState({});
  const [timeLabels, setTimeLabels] = useState({});

  // Data for the Line chart
  const chartData = {
    labels: timeLabels[filter],
    datasets: [
      {
        label: "New Users",
        data: graphData[filter],
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

  useEffect(() => {
    if (newData) {
      let timeLabel = newData?.today?.labels?.map((item) => timeEnum[item]);
      let weekLabel = newData?.weekly?.labels?.map((item) => weekDayEnum[item]);
      let monthLabel = newData?.monthly?.labels?.map((item) => item);
      let lastMonthLabel = newData?.last_month?.labels?.map((item) => item);
      let yearLabel = newData?.yearly?.labels?.map((item) => monthEnum[item]);

      setTimeLabels({
        daily: timeLabel,
        weekly: weekLabel,
        monthly: monthLabel,
        lastMonth: lastMonthLabel,
        yearly: yearLabel,
      });

      setGraphData({
        daily: newData?.today?.points?.map((item) => Number(item)),
        weekly: newData?.weekly?.points?.map((item) => Number(item)),
        monthly: newData?.monthly?.points?.map((item) => Number(item)),
        lastMonth: newData?.last_month?.points?.map((item) => Number(item)),
        yearly: newData?.yearly?.points?.map((item) => Number(item)),
      });
    }
  }, [newData]);

  return (
    <div className="w-full p-6 border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg">
      {/* Filter Buttons */}
      <div className="w-full h-10 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">User Growth Chart</h1>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setFilter("daily");
            }}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "daily"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => {
              setFilter("weekly");
            }}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "weekly"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => {
              setFilter("monthly");
            }}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "monthly"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => {
              setFilter("lastMonth");
            }}
            className={`px-2 py-1 text-xs font-normal rounded-full ${
              filter === "lastMonth"
                ? "bg-[#074F57] text-white"
                : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
            }`}
          >
            Last Month
          </button>
          <button
            onClick={() => {
              setFilter("yearly");
            }}
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

      {/* Line Chart */}
      <div style={{ height: "400px" }} className="relative">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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

export default UsersChart;
