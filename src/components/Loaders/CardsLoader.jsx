import React from "react";

const CardsLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 space-y-4 relative h-[340px] w-[380px] animate-pulse"
        >
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>

          {/* Post Details */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-56 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center border-t pt-4 absolute bottom-1 w-[90%]">
            {/* Likes and Bids */}
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>

            {/* Action Buttons */}
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardsLoader;
