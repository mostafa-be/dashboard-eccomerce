"use client";
import React from "react";
import { CloudDownload } from "lucide-react";
import jsPDF from "jspdf";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

type ExportAndchangeProps = {
  //  brands: Array<Brand>;
};

const ExportAndchange = ({}: ExportAndchangeProps) => {
  const handleExportPDF = () => {
    /*  const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Brands Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "Active"]],
      body: brands.map((brand) => [
        brand._id,
        brand.name,
        brand.isActive ? "Yes" : "No",
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    doc.text(
      `Total Brands: ${brands.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("brands_report.pdf");*/
    alert("brands_report.pdf");
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
