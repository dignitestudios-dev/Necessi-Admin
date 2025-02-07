import React, { useEffect, useState } from "react";
import UsersTable from "../../components/Users/UsersTable";
import axios from "../../axios";

const Users = () => {
  const [usersData, setUsersData] = useState({});
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/users?page=${currentPage}`);
      setUsersData(data);
      setTotalPages(data?.last_page);
    } catch (error) {
      console.log("🚀 ~ getAllUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  return (
    <UsersTable
      usersData={usersData?.data}
      loading={loading}
      getAllUsers={getAllUsers}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};

export default Users;
