"use client";
import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllTagsQuery } from "@/redux/features/tags/tagsApi";
import ExportAndChange from "./ExportAndChange";
import ListTags from "./ListTags";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const TagsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllTagsQuery(
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
  if (isError) {
    return <LoadingError message="Error loading tags" onRetry={refetch} />;
  }
  const tags = data?.tags || [];

  return (
    <section className="w-full">
      <ExportAndChange tags={tags} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/products/tags/create-tag"}
          title="Create Tag"
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

export default TagsPage;
