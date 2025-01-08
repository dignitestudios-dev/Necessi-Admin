import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import RevenueChart from "../../components/Dashboard/RevenueChart";

const Home = () => {

  return (
    <>
      <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-white">
        <h1 className="text-black text-3xl font-bold">Dashboard</h1>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <DashboardStats />
        </div>

        <div className="w-full ">
          <RevenueChart />
        </div>
        {/* <div className="w-full bg-white p-6 rounded-[18px] ">
          <DashboardEvents />
        </div> */}

        
      </div>
    </>
  );
};

export default Home;
