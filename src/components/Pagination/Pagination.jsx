import React from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-end items-center p-4 w-full">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`p-1 rounded-full transition-all duration-300 text-[22px] font-bold text-[#074F57] bg-[#b7c3c4] ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#829c9f]"
        }`}
      >
        <GrFormPrevious />
      </button>

      <span className="text-gray-500 w-20 mx-2">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`p-1 rounded-full transition-all duration-300 text-[22px] font-bold text-[#074F57] bg-[#b7c3c4] ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#829c9f]"
        }`}
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;
