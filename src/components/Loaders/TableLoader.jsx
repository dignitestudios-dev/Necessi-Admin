import React from "react";

const TableLoader = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="bg-gray-200 animate-pulse w-full">
          <td className="py-4 px-6">
            <div className="h-6 bg-gray-300 rounded"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-6 bg-gray-300 rounded"></div>
          </td>
          <td className="py-4 px-6">
            <div className="h-6 bg-gray-300 rounded"></div>
          </td>
          <td className="py-4 px-6 text-right">
            <div className="h-6 bg-gray-300 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableLoader;
