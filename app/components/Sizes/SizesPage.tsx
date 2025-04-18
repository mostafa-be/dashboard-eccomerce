"use client";
import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllSizesQuery } from "@/redux/features/sizes/sizesApi";
import ExportAndchange from "./ExportAndchange";
import ListSizes from "./ListSizes";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const SizesPage = () => {
  const { data, isLoading, isError,refetch } = useGetAllSizesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) {
    return <LoadingList  />;
  }
  // Handle error state
  if (isError) {
    return <LoadingError message="Error loading sizes" onRetry={refetch} />;
  }
  const sizes = data?.sizes || [];

  return (
    <section className="w-full">
      <ExportAndchange sizes={sizes} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/products/sizes/create-size"}
          title="Create Size"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Size</span>
        </Link>
      </div>
     <ListSizes data={sizes} />
    </section>
  );
};

export default SizesPage;
