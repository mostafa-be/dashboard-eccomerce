"use client";
import React from "react";
import StatisticsOrder from "./StatisticsOrder";
import ListOrderGeneral from "./ListOrderGeneral";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetOrderStatisticsPeriodicallyQuery } from "@/redux/features/analytics/analyticsApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Order } from "./columns";
import { ButtonCreate } from "../ui/export";

/**
 * OrdersPage Component
 * Displays the orders page with statistics, order list, and export options.
 */
const OrdersPage = () => {
  const [period, setPeriod] = React.useState<string>("7d");

  // Fetch orders data
  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    refetch: refetchOrders,
  } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true });

  // Fetch order statistics data
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
  const statistics = statisticsData?.statistics || [];

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  /**
   * Handles period change for fetching statistics.
   *
   * @param {string} value - The selected period value.
   */
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    handleRefetch();
  };

  /**
   * Exports orders data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Orders Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "Order ID",
          "Product Title",
          "Brand",
          "Collection",
          "Category",
          "Color",
          "Size",
          "Quantity",
          "Price",
          "Total Price",
          "Order Status",
          "Date Created",
        ],
      ],
      body: orders.flatMap((order: Order) =>
        order.orderItems.map((item) => [
          order._id,
          item.product?.title || "N/A",
          item.product?.brand?.name || "N/A",
          item.product?.collections?.name || "N/A",
          item.product?.categories?.name || "N/A",
          item.color?.name || "N/A",
          item.size?.name || "N/A",
          item.quantity,
          item.product?.price || 0,
          item.quantity * (item.product?.price || 0),
          order.orderStatus,
          order.createdAt,
        ])
      ),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("orders_report.pdf");
  };

  const csvHeaders = [
    { label: "Order ID", key: "orderId" },
    { label: "Product Title", key: "productTitle" },
    { label: "Brand", key: "brand" },
    { label: "Collection", key: "collection" },
    { label: "Category", key: "category" },
    { label: "Color", key: "color" },
    { label: "Size", key: "size" },
    { label: "Quantity", key: "quantity" },
    { label: "Price", key: "price" },
    { label: "Total Price", key: "totalPrice" },
    { label: "Order Status", key: "orderStatus" },
    { label: "Date Created", key: "dateCreated" },
  ];

  const csvData = orders.flatMap((order: Order) =>
    order.orderItems.map((item) => ({
      orderId: order._id,
      productTitle: item.product?.title || "N/A",
      brand: item.product?.brand?.name || "N/A",
      collection: item.product?.collections?.name || "N/A",
      category: item.product?.categories?.name || "N/A",
      color: item.color?.name || "N/A",
      size: item.size?.name || "N/A",
      quantity: item.quantity,
      price: item.product?.price || 0,
      totalPrice: item.quantity * (item.product?.price || 0),
      orderStatus: order.orderStatus,
      dateCreated: order.createdAt,
    }))
  );

  const dataCSV = {
    headers: csvHeaders,
    data: csvData,
    filename: "orders_report.csv",
  };
  
  const dataPDF = {
    title: "Export PDF",
    handleExportPDF: handleExportPDF,
  };

  const dataPeriod = {
    handlePeriodChange: handlePeriodChange,
    period: period,
  };

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Orders"
        isPDF={true}
        isCSV={true}
        isPeriod={true}
        dataCSV={dataCSV}
        dataPDF={dataPDF}
        dataPeriod={dataPeriod}
      />

      {/* Statistics Section */}
      <StatisticsOrder statistics={statistics} period={period} />

      {/* Create Order Button */}
      <ButtonCreate
        url="/en/dashboard/orders/create-order"
        title="Create Order"
      />

      {/* Orders List */}
      <div className="w-full">
        <ListOrderGeneral data={orders} />
      </div>
    </section>
  );
};

export default OrdersPage;
