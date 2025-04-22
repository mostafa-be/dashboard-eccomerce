"use client";
import React from "react";
import { CloudDownload } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Chart, registerables } from "chart.js";
import PeriodSelector from "../ui/PeriodSelector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

Chart.register(...registerables);

type Analytics = {
  date: string;
  count: number;
}[];

type ExportAndchangeProps = {
  onRetry?: () => void;
  period?: string;
  setPeriod?: React.Dispatch<React.SetStateAction<string>>;
  analyticsSales: Analytics;
  analyticsCustomers: Analytics;
  analyticsEnquiries: Analytics;
  analyticsProducts: Analytics;
};

const ExportAndchange = ({
  period,
  setPeriod,
  onRetry,
  analyticsSales,
  analyticsCustomers,
  analyticsEnquiries,
  analyticsProducts,
}: ExportAndchangeProps) => {
  const generateChartImage = async (
    data: Analytics,
    label: string,
    color: string
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map((item) => item.date),
            datasets: [
              {
                label,
                data: data.map((item) => item.count),
                borderColor: color,
                backgroundColor: `${color}33`,
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: false,
            animation: {
              onComplete: () => {
                resolve(canvas.toDataURL("image/png"));
                chart.destroy();
              },
            },
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: { display: true },
              y: { display: true },
            },
          },
        });
      } else {
        resolve("");
      }
    });
  };

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
      "This report provides an overview of key analytics data for the selected period. It includes insights into sales, customer behavior, product performance, and enquiry trends. Use this information to make informed business decisions and optimize your operations.",
      40,
      140,
      { maxWidth: doc.internal.pageSize.width - 80 }
    );
    doc.text(
      "Additionally, this report is a valuable tool for analyzing cash flow and understanding revenue trends. By reviewing the data, you can identify areas of improvement and ensure financial stability for your business.",
      40,
      180,
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
        body: section.data.map((item) => [item.date, item.count]),
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

  const handlePeriodChange = (value: string) => {
    if (setPeriod && onRetry) {
      setPeriod(value);
      onRetry();
    }
  };

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
                Analytics
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        <PeriodSelector period={period || "7d"} onChange={handlePeriodChange} />
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
