"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import StatisticsOrder from "./StatisticsOrder";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ListOrderGeneral from "./ListOrderGeneral";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetOrderStatisticsPeriodicallyQuery } from "@/redux/features/analytics/analyticsApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";

const OrdersPage = () => {
  const [period, setPeriod] = React.useState<string>("7d");

  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    refetch: refetchOrders,
  } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: statisticsData,
    isLoading: isLoadingStatistics,
    isError: isErrorStatistics,
    refetch: refetchStatistics,
  } = useGetOrderStatisticsPeriodicallyQuery(
    { period },
    { refetchOnMountOrArgChange: true }
  );

  const isLoading = isLoadingOrders || isLoadingStatistics;
  const isError = isErrorOrders || isErrorStatistics;

  if (isLoading) {
    return <LoadingList statistic />;
  }

  if (isError) {
    return (
      <LoadingError
        message="Error loading orders or statistics."
        onRetry={() => {
          refetchOrders();
          refetchStatistics();
        }}
      />
    );
  }
  const handleRefetch = () => {
    refetchOrders();
    refetchStatistics();
  };
  const orders = ordersData?.orders || [];
  const statistics = statisticsData?.statistics || {};

  return (
    <section className="w-full">
      <ExportAndchange
        refetch={handleRefetch}
        period={period}
        setPeriod={setPeriod}
        orders={orders}
      />
      <StatisticsOrder statistics={statistics} period={period} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/orders/create-order"
          title="Create Order"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Order</span>
        </Link>
      </div>
      <div className="w-full">
        <ListOrderGeneral data={orders} />
        {/* Ensure ListOrderGeneral handles column layouts internally or via other props */}
      </div>
    </section>
  );
};

export default OrdersPage;
