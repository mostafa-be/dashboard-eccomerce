"use client";
import React, { useEffect } from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsProducts from "./StatisticsProducts";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ListProducts from "./ListProducts";
import { Skeleton } from "../ui/skeleton";

const ProductsPage = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery({});

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="w-full flex flex-wrap items-center justify-between gap-4 ">
          <Skeleton className="w-[200px] h-[20px]  rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-[200px] h-[40px] rounded-md" />
            <Skeleton className="w-[200px] h-[40px] rounded-md" />
          </div>
        </div>
        <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Skeleton className="h-[120px]  rounded-md" />
          <Skeleton className="h-[120px]  rounded-md" />{" "}
          <Skeleton className="h-[120px]  rounded-md" />{" "}
          <Skeleton className="h-[120px]  rounded-md" />
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
    return <div>Error loading products</div>;
  }
  const products = data?.products || [];
  return (
    <section className="w-full">
      <ExportAndchange products={products} />
    <StatisticsProducts products={products} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/products/create-product"}
          title="Create Product"
          className="px-3 py-2.5 rounded-md shadow bg-blue-650 text-white flex items-center gap-2"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Product</span>
        </Link>
      </div>
    <ListProducts data={products} />
    </section>
  );
};

export default ProductsPage;
