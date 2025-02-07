import React, { useEffect, useState } from "react";
import WithdrawalRequestTable from "../../components/Withdrawals/WithdrawalRequestTable";
import axios from "../../axios";

const Withdrawals = () => {
  const [withdrawalsData, setWithdrawalsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllWithdrawals = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/admin/withdrawals?page=${currentPage}`
      );
      setWithdrawalsData(data);
      setTotalPages(data?.last_page);
    } catch (error) {
      console.log("🚀 ~ postsData ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllWithdrawals();
  }, [currentPage]);
  return (
    <WithdrawalRequestTable
      withdrawalsData={withdrawalsData}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};

export default Withdrawals;
