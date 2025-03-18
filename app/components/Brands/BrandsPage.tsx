"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandsApi";
import ExportAndchange from "./ExportAndchange";
import ListBrands from "./ListBrands";

const BrandsPage = () => {
  const { data, isLoading, isError } = useGetAllBrandsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="w-[200px] h-[20px] rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-[200px] h-[40px] rounded-md" />
            <Skeleton className="w-[200px] h-[40px] rounded-md" />
          </div>
        </div>
        <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Skeleton className="h-[120px] rounded-md" />
          <Skeleton className="h-[120px] rounded-md" />
          <Skeleton className="h-[120px] rounded-md" />
          <Skeleton className="h-[120px] rounded-md" />
        </div>
        <div className="w-full flex items-center justify-end my-5">
          <Skeleton className="w-[200px] h-[40px] rounded-md" />
        </div>
        <div className="w-full">
          <Skeleton className="w-full h-[500px] rounded-md" />
        </div>
      </section>
    );
  }

  if (isError) {
    return <div>Error loading brands</div>;
  }

  const brands = data?.brands || [];

  return (
    <section className="w-full">
      <ExportAndchange brands={brands} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/products/brands/create-brand"
          title="Create Brand"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Brand</span>
        </Link>
      </div>
      <ListBrands data={brands} />
    </section>
  );
};

export default BrandsPage;
