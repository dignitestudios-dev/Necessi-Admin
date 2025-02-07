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
import { monthEnum, weekDayEnum } from "../../data/graphEnum";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const allDays = Object.values(weekDayEnum);

const RevenueChart = ({ newData }) => {
  const [filter, setFilter] = useState("weekly");
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  const [graphLabels, setGraphLabels] = useState([]);

  // Sample data for the bar chart (You would replace this with your real data)
  const data = {
    weekly: weeklyData,
    monthly: monthlyData,
    yearly: yearlyData,
  };

  // Data for the bar chart
  const chartData = {
    labels: graphLabels,
    datasets: [
      {
        label: "Revenue",
        data: data[filter],
        backgroundColor: "#074F5750",
        borderColor: "#074F57",
        borderRadius: { topLeft: 30, topRight: 30 },
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setGraphLabels(allDays.map((day, index) => day));
    if (newData) {
      setWeeklyData(newData?.weekly?.points?.map((item) => Number(item)));
      setMonthlyData(newData?.monthly?.points?.map((item) => Number(item)));
      setYearlyData(newData?.yearly?.points?.map((item) => Number(item)));
    }
  }, [newData]);

  return (
    <div className="w-full p-6  border border-gray-200 bg-gray-50 rounded-[18px] shadow-lg  ">
      {/* Filter Buttons */}

      <div className="w-full h-10 flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">Revenue Graph</h1>

        <div className="flex justify-end gap-2 ">
          <button
            onClick={() => {
              setFilter("weekly");
              setGraphLabels(allDays.map((day, index) => day));
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
              setGraphLabels(
                Array.from({ length: 31 })?.map((item, index) => index)
              );
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
              setFilter("yearly");
              setGraphLabels(
                Object.values(monthEnum)?.map((day, index) => day)
              );
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

      {/* Bar Chart */}
      <div style={{ height: "400px" }} className="relative">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { grid: { display: false } } },
          }}
        />
      </div>
    </div>
  );
};

export default RevenueChart;
