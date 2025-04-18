import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingCreating = () => {
  return (
    <section className="w-full space-y-6">
      <div className="w-full flex flex-wrap items-center justify-between">
        <Skeleton className="w-[200px] h-5" />
        <Skeleton className="w-[15opx] h-10" />
      </div>
      <div className="w-full flex flex-wrap-reverse gap-3 items-center justify-between">
        <Skeleton className="w-full md:w-[75%] h-5" />
        <Skeleton className="w-full md:w-[23%] h-[300px]" />
      </div>
    </section>
  );
};

export default LoadingCreating;
