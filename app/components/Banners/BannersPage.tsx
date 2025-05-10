"use client";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ListBanners from "./ListBanner";
import ViewLoading from "../Loader/ViewLoading";
import LoadingError from "../Loader/LoadingError";
import { useGetAllBannersQuery } from "@/redux/features/banners/bannersApi";

/**
 * BannersPage Component
 * Displays a list of banners with options to create a new banner.
 *
 * @returns {JSX.Element} The rendered banners page.
 */
const BannersPage = () => {
  const { data, isSuccess, isLoading, isError, refetch } =
    useGetAllBannersQuery(
      {},
      { refetchOnMountOrArgChange: true }
    );

  // Navigation links for the breadcrumb
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Layout", url: "/en/dashboard/layout" },
  ];

  // Extract banners if the query is successful
  const banners = isSuccess ? data?.banners : [];

  // Render loading state
  if (isLoading) {
    return <ViewLoading />;
  }

  // Render error state
  if (isError) {
    return (
      <LoadingError
        message="Failed to load banners. Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Banners" />

      {/* Create Banner Button */}
      <div className="w-full flex items-center justify-end">
        <Link
          href="/en/dashboard/layout/banners/create-banner"
          title="Create Banner"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Banner</span>
        </Link>
      </div>
      {/* List of Banners */}
      <ListBanners data={banners} />
    </section>
  );
};

export default BannersPage;
