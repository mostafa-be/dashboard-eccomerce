"use client";
import React from "react";
import { useGetAllCollectionsQuery } from "@/redux/features/collections/collectionsApi";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ListCollections from "./ListCollections";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ExportAndChange from "./ExportAndchange";

const CollectionsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllCollectionsQuery(
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
    return <LoadingError message="Error loading collections" onRetry={refetch} />;
  }
  // Handle empty data state
  const collections = data?.collections;
  return (
    <section className="w-full">
      <ExportAndChange collections={collections} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/products/collections/create-collection"}
          title="Create Collection"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Collection</span>
        </Link>
      </div>
      <ListCollections data={collections} />
    </section>
  );
};

export default CollectionsPage;
