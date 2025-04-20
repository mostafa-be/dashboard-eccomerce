"use client";
import React from "react";
import { CloudDownload, FileDown } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import PeriodSelector from "../ui/PeriodSelector";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { Order } from "./columns";

type Props = {
  setPeriod(period: string): void;
  period: string;
  orders: Order[];
  refetch: () => void;
};

const ExportAndchange = ({ setPeriod, period, orders, refetch }: Props) => {
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    refetch();
  };

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
      body: orders.flatMap((order) =>
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

  const csvData = orders.flatMap((order) =>
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

  return (
    <div className="w-full flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-col justify-start gap-0.5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm text-gray-700/90 dark:text-white/90 hover:text-blue-500/90 dark:hover:text-blue-500/90"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/en/dashboard"
                className="text-sm text-gray-700/90 dark:text-white/90 hover:text-blue-500/90 dark:hover:text-blue-500/90"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm cursor-pointer text-blue-500/90">
                Orders
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        {/* Period Selector */}
        <PeriodSelector period={period} onChange={handlePeriodChange} />
        {/* Export CSV */}
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={"orders_report.csv"}
        >
          <div
            title="Export CSV"
            className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg rounded-lg transition-all duration-300"
          >
            <FileDown size={18} className="text-white text-sm font-semibold" />
            <span className="text-white text-sm">Export CSV</span>
          </div>
        </CSVLink>
        {/* Export PDF */}
        <div
          title="Export PDF"
          className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg rounded-lg transition-all duration-300"
          onClick={handleExportPDF}
        >
          <CloudDownload
            size={18}
            className="text-white text-sm font-semibold"
          />
          <span className="text-white text-sm">Export PDF</span>
        </div>
      </div>
    </div>
  );
};

export default ExportAndchange;
