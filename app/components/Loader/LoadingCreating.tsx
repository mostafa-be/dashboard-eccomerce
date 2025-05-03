import React from "react";
import { Skeleton } from "../ui/skeleton";

/**
 * LoadingCreating Component
 * Displays a skeleton loading state for creation forms.
 */
const LoadingCreating = () => {
  return (
    <section className="w-full space-y-6">
      <div className="w-full flex flex-wrap items-center justify-between">
        <Skeleton className="w-[200px] h-5 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="w-[150px] h-10 bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="w-full flex flex-wrap-reverse gap-3 items-center justify-between">
        <Skeleton className="w-full md:w-[75%] h-5 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="w-full md:w-[23%] h-[300px] bg-gray-200 dark:bg-gray-700" />
      </div>
    </section>
  );
};

export default LoadingCreating;
