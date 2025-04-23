"use client";
import React from "react";
import ExportAndchange from "./ExportAndchange";
import Statistic from "./Statistic";
import { AnalyticsSales } from "./AnalyticsSales";
import RecentAndSales from "./RecentAndSales";
import BestSelling from "./BestSelling/BestSelling";
import { VisitorByBrowser } from "./VisitorByBrowser";
import { VisitorByDevice } from "./VisitorByDevice";
import ListOrder from "./Order/ListOrder";
import { useGetOrderSalesPeriodicallyQuery } from "@/redux/features/analytics/analyticsApi";

const PageDashboard = () => {
  const [period, setPeriod] = React.useState<string>("7d");
  const {
    data: dataOrdersSales,
    isLoading: isLoadingOrdersSales,
    isError: isErrorOrdersSales,
    error: errorOrdersSales,
    refetch: refetchOrdersSales,
  } = useGetOrderSalesPeriodicallyQuery(
    { period: period },
    { refetchOnMountOrArgChange: true }
  );
  const isLoading = isLoadingOrdersSales;
  const isError = isErrorOrdersSales;
  const error = errorOrdersSales as { data: { message: string } };
  if (isLoading) {
    return <div className="w-full">Loading...</div>;
  }
  if (isError) {
    return (
      <div className="w-full">
        <h1 className="text-red-500 text-center text-xl font-bold">
          {error.data.message}
        </h1>
      </div>
    );
  }
  const orders = dataOrdersSales?.analytics?.orders || [];
  const sales = dataOrdersSales?.analytics?.sales || {};

  const onRetry = () => {
    // Refetch logic can be implemented here if needed
    refetchOrdersSales();
  };
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onRetry();
  };
  return (
    <section className="w-full">
      <ExportAndchange period={period} setPeriod={setPeriod} />
      <Statistic period={period} />
      <div className="max-w-full  md:grid  lg:grid-cols-9 gap-5 mt-10 ">
        <AnalyticsSales
          analyticsOrders={orders}
          analyticsSales={sales}
          period={period}
          handlePeriodChange={handlePeriodChange}
        />
        <RecentAndSales />
        <BestSelling />
        <div className="max-md:mt-5 col-span-1 md:col-span-9 lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-1 gap-5">
          <VisitorByBrowser period={period} />
          <VisitorByDevice period={period} />
        </div>
        <ListOrder />
      </div>
    </section>
  );
};

export default PageDashboard;
