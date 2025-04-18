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
  const {
    data: userData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    refetch: refetchUsers,
  } = useGetUserAnalyticsQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: orderData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    refetch: refetchOrders,
  } = useGetOrderAnalyticsQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: enquiryData,
    isLoading: isLoadingEnquiries,
    isError: isErrorEnquiries,
    refetch: refetchEnquiries,
  } = useGetEnquiriesAnalyticsQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: productData,
    isLoading: isLoadingProducts,
    isError: isErrorProduct,
    refetch: refetchProducts,
  } = useGetProductsAnalyticsQuery({}, { refetchOnMountOrArgChange: true });

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

  const analyticsCustomers = userData?.users?.last12Months || [];
  const analyticsSales = orderData?.orders?.last12Months || [];
  const analyticsEnquiries = enquiryData?.enquiries?.last12Months || [];
  const analyticsProducts = productData?.products?.last12Months || [];

  return (
    <section className="w-full">
      <ExportAndchange />
      <div className="w-full mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesAnalytics analyticsSales={analyticsSales} />
        <CustomersAnalytics analyticsCustomers={analyticsCustomers} />
        <EnquiriesAnalytics analyticsEnquiries={analyticsEnquiries} />
        <ProductsAnalytics analyticsProducts={analyticsProducts} />
      </div>
    </section>
  );
};

export default AnalyticsPage;
