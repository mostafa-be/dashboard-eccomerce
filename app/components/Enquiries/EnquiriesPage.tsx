"use client";

import React from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsEnquiries from "./StatisticsEnquiries";
import { useGetAllEnquiriesQuery } from "@/redux/features/enquiries/enquiriesApi";
import ListEnquiries from "./ListEnquiries";

const EnquiriesPage = () => {
  const { data, isLoading } = useGetAllEnquiriesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
