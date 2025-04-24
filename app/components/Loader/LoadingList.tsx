import React from "react";
import { Skeleton } from "../ui/skeleton";

type LoadingListProps = {
  statistic?: boolean;
  product?: boolean;
  order?: boolean;
};
const LoadingList = ({ statistic, product, order }: LoadingListProps) => {
  if (order) {
    <section className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="w-full flex flex-wrap gap-3 items-center justify-between">
        <Skeleton className="w-[200px] h-5" />
        <div className="flex items-center gap-3">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="w-[100px] h-10 rounded-lg" />
          ))}
        </div>
      </div>
      {/* Cards Skeleton */}
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="w-full h-[400px] rounded-lg" />
        ))}
      </div>
    </section>;
  }
  if (product) {
    <section className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="w-full flex flex-wrap gap-3 items-center justify-between">
        <Skeleton className="w-[200px] h-5" />
        <div className="flex items-center gap-3">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="w-[100px] h-10 rounded-lg" />
          ))}
        </div>
      </div>
      {/* Cards Skeleton */}
      <Skeleton className="w-full h-[400px] rounded-lg" />
      <Skeleton className="w-full h-[200px] rounded-lg" />
      <div className="w-full grid gap-3">
        {[...Array(10)].map((_, index) => (
          <Skeleton key={index} className="w-full h-[150px] rounded-lg" />
        ))}
      </div>
    </section>;
  }
  return (
    <section className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="w-full flex flex-wrap gap-3 items-center justify-between">
        <Skeleton className="w-[200px] h-5" />
        <div className="flex items-center gap-3">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="w-[100px] h-10 rounded-lg" />
          ))}
        </div>
      </div>
      {/* Cards Skeleton */}
      {statistic && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[150px] rounded-lg" />
          ))}
        </div>
      )}
      <div className="w-full flex justify-end">
        <Skeleton className="w-[100px] h-10 rounded-lg" />
      </div>
      {/* Footer Skeleton */}
      <Skeleton className="w-full h-[450px]" />
    </section>
  );
};

export default LoadingList;
