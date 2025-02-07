import { React, useState, useEffect } from "react";
import OrdersTable from "../../Orders/OrdersTable";
import axios from "../../axios";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/orders?page=${currentPage}`);
      setTotalPages(data?.last_page);
      setOrdersData(data);
    } catch (error) {
      console.log("🚀 ~ getAllUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [currentPage]);
  return (
    <OrdersTable
      ordersData={ordersData}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};

export default Orders;
