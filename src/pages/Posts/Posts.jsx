import React, { useEffect, useState } from "react";
import PostCards from "../../components/Posts/PostCards";
import axios from "../../axios";

const Posts = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/posts?page=${currentPage}`);
      setPostsData(data);
      setTotalPages(data?.last_page);
    } catch (error) {
      console.log("🚀 ~ postsData ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [currentPage]);
  return (
    <PostCards
      postsData={postsData}
      loading={loading}
      getAllPosts={getAllPosts}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};

export default Posts;
