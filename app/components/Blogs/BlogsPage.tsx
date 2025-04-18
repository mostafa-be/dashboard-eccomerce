"use client";

import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllBlogsQuery } from "@/redux/features/blogs/blogsApi";
import ExportAndchange from "./ExportAndchange";
import ListBlogs from "./ListBlogs";
import StatisticsBlogs from "./StatisticsBlogs";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
const BlogsPage = () => {
  const { data, isLoading, isError,refetch } = useGetAllBlogsQuery(
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
    return <LoadingError message="Error loading blogs" onRetry={refetch} />;
  }
  // Handle empty data state
  const blogs = data?.blogs || [];

  return (
    <section className="w-full">
      <ExportAndchange blogs={blogs} />
      <StatisticsBlogs blogs={blogs} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/blogs/create-blog"
          title="Create Blog"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Blog</span>
        </Link>
      </div>
      <ListBlogs data={blogs} />
    </section>
  );
};

export default BlogsPage;
