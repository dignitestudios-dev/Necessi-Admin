import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import RevenueChart from "../../components/Dashboard/RevenueChart";
import UsersChart from "../../components/Dashboard/UsersChart";
import PostsChart from "../../components/Dashboard/PostsChart";
import SalesChart from "../../components/Dashboard/SalesChart";

const Home = () => {
  return (
    <>
      <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-white">
        <h1 className="text-black text-3xl font-bold">Dashboard</h1>

        {/* Stats Section */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <DashboardStats />
        </div>

        {/* Charts Section (Two charts side by side) */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <RevenueChart />
          </div>
          <div className="w-full lg:w-1/2">
            <PostsChart />
          </div>
          
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
            <UsersChart />
          </div>
          <div className="w-full lg:w-1/2">
            <SalesChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
