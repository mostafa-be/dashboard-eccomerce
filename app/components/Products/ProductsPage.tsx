"use client"
import React from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsProducts from "./StatisticsProducts";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ListProducts from "./ListProducts";

const ProductsPage = () => {
  const { data , isLoading, isError } = useGetAllProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
    );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }
    const products = data?.products;
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
      <ListProducts data={products}/>
    </section>
  );
};

export default ProductsPage;
