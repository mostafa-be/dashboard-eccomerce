import React from "react";

const LoadingNotifications = () => {
  return (
    <section className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="w-full flex flex-wrap gap-3 items-center justify-between">
        <div className="w-[200px] h-5 bg-gray-200 animate-pulse rounded"></div>
        <div className="flex items-center gap-3">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="w-[100px] h-10 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
      <div className="w-full grid gap-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="w-full h-16 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    </section>
  );
};

export default LoadingNotifications;
