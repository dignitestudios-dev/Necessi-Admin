const NotificationsLoader = () => {
  // Create an array of 3 items to show multiple loading skeletons
  const skeletons = Array(3).fill(null);

  return (
    <div className="mt-8 space-y-4">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white shadow p-5 flex flex-col gap-3 animate-pulse"
        >
          <div className="flex items-center justify-between">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            {/* Date skeleton */}
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          {/* Body text skeleton - two lines */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsLoader;
