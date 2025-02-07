import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { monthEnum, timeEnum, weekDayEnum } from "../../data/graphEnum";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ newData }) => {
  const [filter, setFilter] = useState("weekly");
  const [graphData, setGraphData] = useState({});
  const [timeLabels, setTimeLabels] = useState({});

  // Data for the line chart
  const chartData = {
    labels: timeLabels[filter], // Time periods for x-axis
    datasets: [
      {
        label: "Services Sales",
        data: graphData[filter], // Sales data for services
        fill: false,
        borderColor: "#074F57", // Line color for services
        tension: 0.1,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#074F57", // Point color for services
      },
    ],
  };

  useEffect(() => {
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
  }, [newData]);

  return (
    <div className="w-full p-6 border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg">
      {/* Filter Buttons */}
      <div className="w-full h-10 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">Sales Chart</h1>

        <div className="flex justify-end gap-2">
          {["daily", "weekly", "monthly", "lastMonth", "yearly"].map(
            (period) => (
              <button
                key={period}
                onClick={() => setFilter(period)}
                className={`px-2 py-1 text-xs font-normal rounded-full ${
                  filter === period
                    ? "bg-[#074F57] text-white"
                    : "bg-[#074F57]/[0.2] hover:bg-[#074F57] hover:text-white border border-[#074F57] text-[#074F57]"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            )
          )}
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
              tooltip: {
                backgroundColor: "#074F57",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
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
