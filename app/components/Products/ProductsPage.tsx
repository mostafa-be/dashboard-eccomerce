"use client";
import React from "react";
import ExportAndchange from "./ExportAndChange";
import StatisticsProducts from "./StatisticsProducts";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ListProducts from "./ListProducts";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const ProductsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllProductsQuery({});

  if (isLoading) {
    return <LoadingList statistic={true} />;
  }
  // Handle error state
  if (isError) {
    return <LoadingError message="Error loading products" onRetry={refetch} />;
  }
  // Handle empty data state
  const products = data?.products || [];
  return (
    <section className="w-full space-y-6">
      <ExportAndchange products={products} />
      <StatisticsProducts products={products} />
      <div className="w-full flex items-center justify-end">
        <Link
          href={"/en/dashboard/products/create-product"}
          title="Create Product"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
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
