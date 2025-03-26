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

const AnalyticsPage = () => {
  const { data: userData, isLoading: isLoadingUsers } =
    useGetUserAnalyticsQuery({}, { refetchOnMountOrArgChange: true });
  const { data: orderData, isLoading: isLoadingOrders } =
    useGetOrderAnalyticsQuery({}, { refetchOnMountOrArgChange: true });
  const { data: enquiryData, isLoading: isLoadingEnquiries } =
    useGetEnquiriesAnalyticsQuery({}, { refetchOnMountOrArgChange: true });
  const { data: productData, isLoading: isLoadingProducts } =
    useGetProductsAnalyticsQuery({}, { refetchOnMountOrArgChange: true });

  if (
    isLoadingUsers ||
    isLoadingOrders ||
    isLoadingEnquiries ||
    isLoadingProducts
  ) {
    return <div>Analytics is loading...</div>;
  }

  const analyticsCustomers = Array.isArray(userData?.users?.last12Months)
    ? userData.users.last12Months
    : [];
  const analyticsSales = Array.isArray(orderData?.orders?.last12Months)
    ? orderData.orders.last12Months
    : [];
  const analyticsEnquiries = Array.isArray(enquiryData?.enquiries?.last12Months)
    ? enquiryData.enquiries.last12Months
    : [];
  const analyticsProducts = Array.isArray(productData?.products?.last12Months)
    ? productData.products.last12Months
    : [];
console.log(productData)
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
