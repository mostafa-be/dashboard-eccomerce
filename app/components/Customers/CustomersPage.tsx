"use client";

import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllCustomersQuery } from "@/redux/features/users/usersApi";
import ExportAndChange from "./ExportAndchange";
import ListCustomer from "./ListCustomer";
import StatisticsCustomers from "./StatisticsCustomers";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const CustomersPage = () => {
  const { data, isLoading, isError,refetch } = useGetAllCustomersQuery(
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
    return <LoadingError message="Error loading Customers" onRetry={refetch} />;

  }

  const customers = data?.customers || [];

  return (
    <section className="w-full">
      <ExportAndChange customers={customers} />
      <StatisticsCustomers customers={customers} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/customers/create-customer"
          title="Create Customer"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Customer</span>
        </Link>
      </div>
      <ListCustomer data={customers} />
    </section>
  );
};

export default CustomersPage;
