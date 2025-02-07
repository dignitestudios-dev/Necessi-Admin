import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import RevenueChart from "../../components/Dashboard/RevenueChart";
import UsersChart from "../../components/Dashboard/UsersChart";
import PostsChart from "../../components/Dashboard/PostsChart";
import SalesChart from "../../components/Dashboard/SalesChart";
import axios from "../../axios";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({});

  const [loading, setLoading] = useState(false);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/admin/dashboard");
      setDashboardData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-white">
      <h1 className="text-black text-3xl font-bold">Dashboard</h1>
      {loading ? (
        <>
          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="w-full animate-pulse">
              <div className="h-24 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          {/* Charts Section (Two charts side by side) */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="h-72 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="h-72 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="h-72 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="h-72 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Stats Section */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
            <DashboardStats data={dashboardData} />
          </div>

          {/* Charts Section (Two charts side by side) */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <RevenueChart newData={dashboardData?.revenue_graph} />
            </div>
            <div className="w-full lg:w-1/2">
              <PostsChart newData={dashboardData?.posts_graph} />
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <UsersChart newData={dashboardData?.users_growth_graph} />
            </div>
            <div className="w-full lg:w-1/2">
              <SalesChart newData={dashboardData?.sales_graph} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
