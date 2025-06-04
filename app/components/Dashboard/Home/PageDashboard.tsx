"use client";
import React from "react";
import Statistic from "./Statistic";
import { AnalyticsSales } from "./AnalyticsSales";
import RecentAndSales from "./RecentAndSales";
import BestSelling from "./BestSelling/BestSelling";
import { VisitorByBrowser } from "./VisitorByBrowser";
import { VisitorByDevice } from "./VisitorByDevice";
import ListOrder from "./Order/ListOrder";
import {
  useGetGeneralStatisticsQuery,
  useGetOrderSalesPeriodicallyQuery,
} from "@/redux/features/analytics/analyticsApi";
import { useGetBestSellingProductsQuery } from "@/redux/features/products/productsApi";
import {
  useGetOrdersByStatusQuery,
  useGetAllOrdersQuery,
} from "@/redux/features/orders/ordersApi";
import CardLoading from "../../Loader/CardLoading";
import CardError from "../../Loader/CardError";
import ChangerExporter from "../../ui/ChangerExporter";

const PageDashboard = () => {
  const [period, setPeriod] = React.useState<string>("7d");
  const {
    data: dataGeneralStatics,
    isLoading: isLoadingGeneralStatics,
    isError: isErrorGeneralStatics,
    error: errorGeneralStatics,
    refetch: refetchGeneralStatics,
  } = useGetGeneralStatisticsQuery(
    { period: period },
    { refetchOnMountOrArgChange: true }
    );
  
  const {
    data: dataOrdersSales,
    isLoading: isLoadingOrdersSales,
    isError: isErrorOrdersSales,
    error: errorOrdersSales,
    refetch: refetchOrdersSales,
  } = useGetOrderSalesPeriodicallyQuery(
    { period },
    { refetchOnMountOrArgChange: true }
    );
  
  const {
    data: dataBestSellingProducts,
    isLoading: isLoadingBestSellingProducts,
    isError: isErrorBestSellingProducts,
    error: errorBestSellingProducts,
    refetch: refetchBestSellingProducts,
  } = useGetBestSellingProductsQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: ordersStatusData,
    isLoading: isLoadingOrdersStatus,
    isError: isErrorOrdersStatus,
    error: errorOrdersStatus,
    refetch: refetchOrdersStatus,
  } = useGetOrdersByStatusQuery(
    { status: "Delivered" },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: ordersData,
    isLoading: isLoadingOrdersData,
    isError: isErrorOrdersData,
    error: errorOrdersData,
    refetch: refetchOrdersData,
  } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true });
  const statistics = dataGeneralStatics?.statistics || {};
  const orders = dataOrdersSales?.analytics?.orders || [];
  const sales = dataOrdersSales?.analytics?.sales || {};
  const bestSellingProducts = dataBestSellingProducts?.products || [];
  const recentSales = ordersStatusData?.orders || [];
  const ordersTable = ordersData?.orders || [];

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    refetchOrdersSales();
    refetchGeneralStatics();
  };

  const renderCard = (
    isLoading: boolean,
    isError: boolean,
    error: any,
    onRetry: () => void,
    Component: React.ComponentType<any>,
    props: any,
    className: string
  ) => {
    if (isLoading) return <CardLoading className={className} />;
    if (isError) {
      return (
        <CardError
          className={className}
          message={error?.data?.message}
          onRetry={onRetry}
        />
      );
    }
    return <Component {...props} />;
  };
  const links = [{ name: "Home", url: "/" }];
  const handleExportPDF = () => {
    import("jspdf").then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      doc.text("Dashboard Report", 10, 10);
      doc.save("dashboard-report.pdf");
    });
  };
  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  } as { title: string; handleExportPDF: () => void };
  const dataPeriod = {
    period,
    handlePeriodChange,
  };
  console.log(statistics);
  return (
    <section className="w-full space-y-10">
      <ChangerExporter
        links={links}
        active="Dashboard"
        isCSV={false}
        isPDF={true}
        dataPDF={dataPDF}
        isPeriod={true}
        dataPeriod={dataPeriod}
      />
      {renderCard(
        isLoadingGeneralStatics,
        isErrorGeneralStatics,
        errorGeneralStatics,
        refetchGeneralStatics,
        Statistic,
        {
          statistics,
          period,
        },
        "w-full min-h-[150px]"
      )}

      <div className="max-w-full md:grid lg:grid-cols-9 gap-5">
        {renderCard(
          isLoadingOrdersSales,
          isErrorOrdersSales,
          errorOrdersSales,
          refetchOrdersSales,
          AnalyticsSales,
          {
            analyticsOrders: orders,
            analyticsSales: sales,
            revenue: statistics.totalProfit,
            period,
            handlePeriodChange,
          },
          "w-full min-h-[200px] md:col-span-5 lg:col-span-6"
        )}
        {renderCard(
          isLoadingOrdersStatus,
          isErrorOrdersStatus,
          errorOrdersStatus,
          refetchOrdersStatus,
          RecentAndSales,
          { data: recentSales },
          "max-md:mt-5 md:col-span-4 lg:col-span-3"
        )}
        {renderCard(
          isLoadingBestSellingProducts,
          isErrorBestSellingProducts,
          errorBestSellingProducts,
          refetchBestSellingProducts,
          BestSelling,
          { data: bestSellingProducts },
          "max-md:mt-5 w-full min-h-[200px] md:col-span-9 lg:col-span-6"
        )}
        <div className="max-md:mt-5 col-span-1 md:col-span-9 lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-1 gap-5">
          <VisitorByBrowser period={period} />
          <VisitorByDevice period={period} />
        </div>
      </div>
      {renderCard(
        isLoadingOrdersData,
        isErrorOrdersData,
        errorOrdersData,
        refetchOrdersData,
        ListOrder,
        { data: ordersTable },
        "max-md:mt-5 w-full col-span-9 "
      )}
      {/* Advanced Country Map Section */}
      <div className="w-full mt-8">
        {/* You can further customize this Country component to look like Shopify's map 
        <Country />*/}
      </div>
    </section>
  );
};

export default PageDashboard;
