import React from "react";

type LoadingProps = {
  customer?: boolean;
};

const ViewLoading = ({ customer }: LoadingProps) => {
  return (
    <section className="w-full space-y-6">
      {customer ? (
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Add customer-specific skeletons here */}
          <div className="w-full h-96 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="w-full h-96 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      ) : (
        <>
          {/* Header Skeleton */}
          <div className="w-full flex flex-wrap items-center justify-between">
            <div className="w-[200px] h-5 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="w-[150px] h-10 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
          {/* Content Skeleton */}
          <div className="w-full flex flex-wrap-reverse gap-3 items-center justify-between">
            <div className="w-full md:w-[75%] h-5 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        </>
      )}
    </section>
  );
};

export default ViewLoading;
