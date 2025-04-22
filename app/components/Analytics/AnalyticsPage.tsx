"use client";

import React from "react";
import ExportAndchange from "./ExportAndchange";
import CustomersAnalytics from "./CustomersAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EnquiriesAnalytics from "./EnquiriesAnalytics";
import ProductsAnalytics from "./ProductsAnalytics";
import {
  useGetOrderAnalyticsQuery,
  useGetUserAnalyticsQuery,
  useGetEnquiriesAnalyticsQuery,
  useGetProductsAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import LoadingAnalytics from "../Loader/LoadingAnalytics";
import LoadingError from "../Loader/LoadingError";

const AnalyticsPage = () => {
  const [period, setPeriod] = React.useState<string>("7d");
  // Fetching analytics data using custom hooks
  const {
    data: userData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    refetch: refetchUsers,
  } = useGetUserAnalyticsQuery(
    { period: period },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: orderData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    refetch: refetchOrders,
  } = useGetOrderAnalyticsQuery(
    { period: period },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: enquiryData,
    isLoading: isLoadingEnquiries,
    isError: isErrorEnquiries,
    refetch: refetchEnquiries,
  } = useGetEnquiriesAnalyticsQuery(
    { period: period },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: productData,
    isLoading: isLoadingProducts,
    isError: isErrorProduct,
    refetch: refetchProducts,
  } = useGetProductsAnalyticsQuery(
    { period: period },
    { refetchOnMountOrArgChange: true }
  );

  const onRetry = () => {
    refetchUsers();
    refetchOrders();
    refetchEnquiries();
    refetchProducts();
  };

  if (
    isLoadingUsers ||
    isLoadingOrders ||
    isLoadingEnquiries ||
    isLoadingProducts
  ) {
    return <LoadingAnalytics />;
  }

  if (isErrorUsers || isErrorOrders || isErrorEnquiries || isErrorProduct) {
    return (
      <LoadingError
        message="An error occurred while loading analytics."
        onRetry={onRetry}
      />
    );
  }

  const analyticsCustomers = userData?.analytics?.data || [];
  const analyticsSales = orderData?.analytics?.data || [];
  const analyticsEnquiries = enquiryData?.analytics?.data || [];
  const analyticsProducts = productData?.analytics?.data || [];

  return (
    <section className="w-full">
      <ExportAndchange
        onRetry={onRetry}
        period={period}
        setPeriod={setPeriod}
        analyticsSales={analyticsSales}
        analyticsCustomers={analyticsCustomers}
        analyticsEnquiries={analyticsEnquiries}
        analyticsProducts={analyticsProducts}
      />
      <div id="analytics" className="w-full mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesAnalytics period={period} analyticsSales={analyticsSales} />
        <CustomersAnalytics period={period} analyticsCustomers={analyticsCustomers} />
        <EnquiriesAnalytics period={period} analyticsEnquiries={analyticsEnquiries} />
        <ProductsAnalytics period={period} analyticsProducts={analyticsProducts} />
      </div>
    </section>
  );
};

export default AnalyticsPage;
