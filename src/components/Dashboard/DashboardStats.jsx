import React from "react";
import { FiUsers } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiDollarSign } from "react-icons/fi";
import { CiMoneyCheck1 } from "react-icons/ci";

const DashboardStats = ({ data }) => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: data?.total_users?.value,
      icon: <FiUsers className="text-[#074F57] text-2xl" />,
      change: `${data?.total_users?.change_from_yesterday}% change from yesterday`,
      bgColor: "#074F5720",
      route: "/users",
    },
    {
      title: "Total Posts",
      value: data?.total_posts?.value,
      icon: <CgFileDocument className="text-[#074F57] text-2xl" />,
      change: `${data?.total_posts?.change_from_yesterday}% change from yesterday`,
      bgColor: "#074F5720",
      route: "/posts",
    },
    {
      title: "Total Sales",
      value: data?.total_sales?.value,
      icon: <CiMoneyCheck1 className="text-[#074F57] text-2xl" />,
      change: `${data?.total_sales?.change_from_yesterday}% change from yesterday`,
      bgColor: "#074F5720",
      route: "/withdrawals",
    },
    {
      title: "Total Revenue",
      value: data?.total_revenue?.value,
      icon: <FiDollarSign className="text-[#074F57] text-2xl" />,
      change: `${data?.total_revenue?.change_from_yesterday}% change from yesterday`,
      bgColor: "#074F5720",
      route: "/revenue",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          onClick={() => navigate(stat.route)}
          className="cursor-pointer w-full rounded-xl border border-gray-200 bg-gray-50 shadow transition-shadow duration-300 p-5 flex items-center justify-between"
        >
          <div className="flex flex-col items-start justify-between">
            <span className="text-3xl font-bold text-gray-800">
              {stat.value}
            </span>
            <span className="text-gray-500 text-sm font-medium">
              {stat.title}
            </span>
            <span className="mt-2 text-xs text-gray-500">{stat.change}</span>
          </div>
          <div
            className="w-12 h-12 flex items-center justify-center rounded-full"
            style={{ backgroundColor: stat.bgColor }}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
