"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsOrder from "./StatisticsOrder";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ListOrderGeneral from "./ListOrderGeneral";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { columns } from "./columns";
import { Skeleton } from "../ui/skeleton";
const OrdersPage = () => {
  const [period, setPeriod] = React.useState<string>("weekly");
  const { data, error, isLoading } = useGetAllOrdersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="w-full flex flex-wrap items-center justify-between gap-4 ">
          <Skeleton className="w-[200px] h-[20px]  rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-[200px] h-[40px] rounded-md" />
            <Skeleton className="w-[200px] h-[40px] rounded-md" />
          </div>
        </div>
        <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Skeleton className="h-[180px]  rounded-md" />
          <Skeleton className="h-[180px]  rounded-md" />{" "}
          <Skeleton className="h-[180px]  rounded-md" />{" "}
          <Skeleton className="h-[180px]  rounded-md" />{" "}
          <Skeleton className="h-[180px]  rounded-md" />
        </div>
        <div className="w-full flex items-center justify-end my-5">
          <Skeleton className="w-[200px] h-[40px] rounded-md" />
        </div>
        <div className="w-full">
          <Skeleton className="w-full h-[500px] rounded-md" />
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="w-full h-dvh flex items-center justify center ">
      <span className="text-red-500">Error loading orders</span>
    </div>;
  }

  return (
    <section className="w-full">
      <ExportAndchange
        period={period}
        setPeriod={setPeriod}
        tableData={data.orders}
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
        <ListOrderGeneral data={data.orders} columns={columns} />
      </div>
    </section>
  );
};

export default OrdersPage;
