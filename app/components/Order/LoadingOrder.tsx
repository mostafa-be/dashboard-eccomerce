import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingOrder = () => {
  return (
    <section className="w-full">
      <div className="w-full flex  flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-14 w-72" />
      </div>
      <div className="w-full mt-5 flex  flex-wrap items-center justify-end gap-3">
        <Skeleton className="h-14 w-72" />
      </div>
      <div className="w-full mt-5 grid md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
      </div>
      <div className="w-full mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="w-full max-md:hidden h-96" />
        <Skeleton className="w-full max-lg:hidden h-96" />
        <Skeleton className="w-full max-lg:hidden h-96" />
        <Skeleton className="w-full h-96" />
      </div>
      <div className="w-full mt-5">
        <Skeleton className="w-full h-[600px]" />
      </div>
    </section>
  );
};

export default LoadingOrder;
