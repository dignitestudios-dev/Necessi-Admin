import React, { useEffect, useState } from "react";
import ReportsTable from "../../components/Reports/ReportsTable";
import axios from "../../axios";

const Reports = () => {
  const [reportsData, setRePortsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllReports = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/reports?page=${currentPage}`);
      setRePortsData(data);
      setTotalPages(data?.last_page);
    } catch (error) {
      console.log("🚀 ~ postsData ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllReports();
  }, [currentPage]);
  return (
    <ReportsTable
      reportsData={reportsData}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};

export default Reports;
