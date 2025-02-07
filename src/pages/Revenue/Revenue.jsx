import React, { useEffect, useState } from "react";
import RevenueManagement from "../../components/Revenue/RevenueManagement";
import axios from "../../axios";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState({});
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllRevenue = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/revenues?page=${currentPage}`);
      setRevenueData(data);
      setTotalPages(data?.last_page);
    } catch (error) {
      console.log("🚀 ~ getAllRevenue ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRevenue();
  }, [currentPage]);
  return (
    <RevenueManagement
      revenueData={revenueData?.data}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};

export default Revenue;
