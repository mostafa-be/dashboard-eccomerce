"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsOrder from "./StatisticsOrder";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ListOrderGeneral from "./ListOrderGeneral";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { columns } from "./columns";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
const OrdersPage = () => {
  const [period, setPeriod] = React.useState<string>("weekly");
  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <LoadingList statistic={true} />;
  }

  if (isError) {
    return <LoadingError message="Error loading orders" onRetry={refetch} />;
  }
  // Handle empty data state
  const orders = data?.orders || [];

  return (
    <section className="w-full">
      <ExportAndchange
        period={period}
        setPeriod={setPeriod}
        tableData={orders}
        columns={columns}
      />
      <StatisticsOrder period={period} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href={"/en/dashboard/orders/create-order"}
          title="Create Order"
          className="px-3 py-2.5 rounded-md shadow bg-blue-650 text-white flex items-center gap-2"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Order</span>
        </Link>
      </div>
      <div className="w-full">
        <ListOrderGeneral data={orders} columns={columns} />
      </div>
    </section>
  );
};

export default OrdersPage;
