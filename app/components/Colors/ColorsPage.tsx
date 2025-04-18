"use client";
import { useGetAllColorsQuery } from "@/redux/features/colors/colorsApi";
import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ExportAndchange from "./ExportAndchange";
import ListColors from "./ListColors";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const ColorsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllColorsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) {
    return <LoadingList />;
  }
  // Handle error state
  if (isError) {
    return <LoadingError message="Error loading colors" onRetry={refetch} />;
  }
  // Handle empty data state
  const colors = data?.colors;
  
  return (
    <section className="w-full">
      <ExportAndchange colors={colors} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/products/colors/create-color"}
          title="Create Color"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Collection</span>
        </Link>
      </div>
      <ListColors data={colors} />
    </section>
  );
};

export default ColorsPage;
