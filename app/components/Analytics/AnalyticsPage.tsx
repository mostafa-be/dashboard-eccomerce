"use client";

import React from "react";
import CustomersAnalytics from "./CustomersAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EnquiriesAnalytics from "./EnquiriesAnalytics";
import ProductsAnalytics from "./ProductsAnalytics";
import {
  useGetOrderAnalyticsQuery,
  useGetUserAnalyticsQuery,
  useGetEnquiriesAnalyticsQuery,
  useGetProductsAnalyticsQuery,
  useGetAnalyticsExpensesQuery,
} from "@/redux/features/analytics/analyticsApi";
import LoadingAnalytics from "../Loader/LoadingAnalytics";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { generateChartImage } from "./generateChartImage";
import ExpensesAnalytics from "./ExpensesAnalytics"
/**
 * AnalyticsPage Component
 * Displays analytics for sales, customers, enquiries, and products with export options.
 */
const AnalyticsPage = () => {
  const [period, setPeriod] = React.useState<string>("7d");

  // Fetch analytics data
  const {
    data: userData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    refetch: refetchUsers,
  } = useGetUserAnalyticsQuery({ period }, { refetchOnMountOrArgChange: true });

  const {
    data: orderData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    refetch: refetchOrders,
  } = useGetOrderAnalyticsQuery(
    { period },
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: expensesData,
    isLoading: isLoadingexpenses,
    isError: isErrorexpenses,
    refetch: refetchexpenses,
  } = useGetAnalyticsExpensesQuery(
    { period },
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: enquiryData,
    isLoading: isLoadingEnquiries,
    isError: isErrorEnquiries,
    refetch: refetchEnquiries,
  } = useGetEnquiriesAnalyticsQuery(
    { period },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: productData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useGetProductsAnalyticsQuery(
    { period },
    { refetchOnMountOrArgChange: true }
  );

  const isLoading =
    isLoadingUsers ||
    isLoadingexpenses ||
    isLoadingOrders ||
    isLoadingEnquiries ||
    isLoadingProducts;
  const isError =
    isErrorUsers ||
    isErrorexpenses ||
    isErrorOrders ||
    isErrorEnquiries ||
    isErrorProducts;

  const onRetry = () => {
    refetchUsers();
    refetchexpenses();
    refetchOrders();
    refetchEnquiries();
    refetchProducts();
  };

  if (isLoading) return <LoadingAnalytics />;
  if (isError)
    return (
      <LoadingError
        message="An error occurred while loading analytics."
        onRetry={onRetry}
      />
    );

  const analyticsCustomers = userData?.analytics?.data || [];
  const analyticsExpenses = expensesData?.analytics?.timeline || [];
  const analyticsSales = orderData?.analytics?.data || [];
  const analyticsEnquiries = enquiryData?.analytics?.data || [];
  const analyticsProducts = productData?.analytics?.data || [];

  /**
   * Exports analytics data to a PDF file.
   */
  const handleExportPDF = async () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Header Section
    doc.setFontSize(24);
    doc.setTextColor("#333");
    doc.text("Analytics Report", doc.internal.pageSize.width / 2, 40, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.setTextColor("#666");
    doc.text(
      `Period: ${
        period === "7d"
          ? "Last 7 Days"
          : period === "1m"
          ? "Last 1 Month"
          : "Last 1 Year"
      }`,
      40,
      70
    );
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 85);

    // Divider
    doc.setDrawColor(200);
    doc.line(40, 100, doc.internal.pageSize.width - 40, 100);

    // Introduction Section
    doc.setFontSize(16);
    doc.setTextColor("#333");
    doc.text("Introduction", 40, 120);
    doc.setFontSize(12);
    doc.setTextColor("#555");
    doc.text(
      "This report provides an overview of key analytics data for the selected period. It includes insights into sales, customer behavior, product performance, and enquiry trends.",
      40,
      140,
      { maxWidth: doc.internal.pageSize.width - 80 }
    );

    // Divider
    doc.line(40, 220, doc.internal.pageSize.width - 40, 220);

    // Analytics Sections
    const sections = [
      { title: "Sales Analytics", data: analyticsSales, color: "#4CAF50" },
      {
        title: "Customers Analytics",
        data: analyticsCustomers,
        color: "#2196F3",
      },
      {
        title: "Enquiries Analytics",
        data: analyticsEnquiries,
        color: "#FFC107",
      },
      {
        title: "Products Analytics",
        data: analyticsProducts,
        color: "#FF5722",
      },
    ];

    for (const [index, section] of sections.entries()) {
      if (index > 0) doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor("#333");
      doc.text(section.title, 40, 40);

      const chartImage = await generateChartImage(
        section.data,
        section.title,
        section.color
      );
      doc.addImage(chartImage, "PNG", 40, 60, 500, 200);

      autoTable(doc, {
        startY: 280,
        head: [["Date", "Count"]],
        body: section.data.map((item: { date: string; count: number }) => [
          item.date,
          item.count,
        ]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { left: 40, right: 40 },
      });
    }

    // Footer Section
    doc.setFontSize(10);
    doc.setTextColor("#999");
    doc.text(
      "This report is generated automatically by the system.",
      40,
      doc.internal.pageSize.height - 30
    );
    doc.save("analytics_report.pdf");
  };

  /**
   * Handles period change for fetching analytics data.
   *
   * @param {string} value - The selected period value.
   */
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onRetry();
  };

  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  };

  const dataPeriod = {
    period,
    handlePeriodChange,
  };

  const links = [
    { name: "Home", url: "/en/" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Analytics"
        isPeriod
        dataPeriod={dataPeriod}
        isPDF
        dataPDF={dataPDF}
      />

      {/* Analytics Sections */}
      <div
        id="analytics"
        className="w-full mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <SalesAnalytics period={period} analyticsSales={analyticsSales} />
        <CustomersAnalytics
          period={period}
          analyticsCustomers={analyticsCustomers}
        />
        <ExpensesAnalytics
          period={period}
          analyticsExpenses={analyticsExpenses || []}
        />
        <EnquiriesAnalytics
          period={period}
          analyticsEnquiries={analyticsEnquiries}
        />
        <ProductsAnalytics
          period={period}
          analyticsProducts={analyticsProducts}
        />
      </div>
    </section>
  );
};

export default AnalyticsPage;
