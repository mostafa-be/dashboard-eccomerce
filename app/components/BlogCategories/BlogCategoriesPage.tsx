"use client";
import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ExportAndchange from "./ExportAndchange";
import ListCategories from "./ListCategories";
import { useGetAllCategoriesBlogQuery } from "@/redux/features/blogCategories/blogCategoriesApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const BlogCategoriesPage = () => {
  const { data, isLoading, isError,refetch } = useGetAllCategoriesBlogQuery(
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
    return <LoadingError message="An error occurred while loading categories. Please try again." onRetry={refetch} />;
  }
  // Handle empty data state
  const categories = data?.categories || [];

  return (
    <section className="w-full">
      <ExportAndchange categories={categories} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/blogs/categories/create-category"
          title="Create Category Blog"
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

export default BlogCategoriesPage;
