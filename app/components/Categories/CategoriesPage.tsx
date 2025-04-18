"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ListCategories from "./ListCategories";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const CategoriesPage = () => {
  const { data, isLoading, isError,refetch } = useGetAllCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  if (isLoading) {
    return <LoadingList />;
  }
  // Handle error state
  if (isError) {
    return <LoadingError message="Error loading categories" onRetry={refetch} />;
  }
  // Handle empty data state
  const categories = data?.categories || [];

  return (
    <section className="w-full">
      <ExportAndchange categories={categories} />{" "}
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/products/categories/create-category"}
          title="Create Category"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Category</span>
        </Link>
      </div>
      <ListCategories data={categories} />
    </section>
  );
};

export default CategoriesPage;
