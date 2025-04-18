"use client";

import React from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsEnquiries from "./StatisticsEnquiries";
import { useGetAllEnquiriesQuery } from "@/redux/features/enquiries/enquiriesApi";
import ListEnquiries from "./ListEnquiries";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const EnquiriesPage = () => {
  const { data, isLoading,isError,refetch } = useGetAllEnquiriesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) {
    return <LoadingList statistic={true} />;
  }
  // Handle error state
  if (isError) {
    return <LoadingError message="Error loading enquiries" onRetry={refetch} />;
  }
  // Handle empty data state
  const enquiries = data?.enquiries || [];

  return (
    <section className="w-full">
      <ExportAndchange enquiries={enquiries} />
      <StatisticsEnquiries enquiries={enquiries} />
      <ListEnquiries data={enquiries} />
    </section>
  );
};

export default EnquiriesPage;
