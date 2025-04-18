import React from "react";

const LoadingAnalytics = () => {
  return (
    <section className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="w-full flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-3">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="w-[100px] h-10 rounded-lg bg-gray-300 animate-pulse"
            />
          ))}
        </div>
      </div>
      {/* Cards Skeleton */}
      <div className="grid md:grid-cols-2  gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full h-[400px] rounded-lg bg-gray-300 animate-pulse"
          />
        ))}
      </div>
    </section>
  );
};

export default LoadingAnalytics;
