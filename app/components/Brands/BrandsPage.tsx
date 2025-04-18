"use client";
import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandsApi";
import ExportAndchange from "./ExportAndchange";
import ListBrands from "./ListBrands";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const BrandsPage = () => {
  const { data, isLoading, isError,refetch } = useGetAllBrandsQuery(
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
    return <LoadingError message="Error loading brands" onRetry={refetch} />;
  }
  // Handle empty data state
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
