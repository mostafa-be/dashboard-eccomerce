"use client";

import React from "react";
import { useGetAllTagsBlogQuery } from "@/redux/features/blogTags/blogTagsApi";
import ExportAndchange from "./ExportAndchange";
import ListTags from "./ListTags";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
const BlogTagsPage = () => {
  const { data, isLoading, isError,refetch } = useGetAllTagsBlogQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  // Handle loading state
  if (isLoading) {
    return <LoadingList />;
  }
  // Handle error state
  if (isError) {
    return <LoadingError message="Error loading tags" onRetry={refetch} />;
  }
  // Handle empty data state
  const tags = data?.tags || [];

  return (
    <section className="w-full">
      <ExportAndchange tags={tags} />
      <div className="w-full flex items-center justify-end my-10">
        <Link
          href="/en/dashboard/blogs/tags/create-tag"
          title="Create Tag Blog"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Tag</span>
        </Link>
      </div>
      <ListTags data={tags} />
    </section>
  );
};

export default BlogTagsPage;
