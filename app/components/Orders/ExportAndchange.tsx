"use client";
import React from "react";
import { ChevronDown, CloudDownload } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { Button } from "../ui/button";

type Props = {
  setPeriod(period: string): void;
  period: string;
  tableData: any[];
  columns: any[];
};

const ExportAndchange = ({ setPeriod, period }: Props) => {
  const timePeriods = ["weekly", "monthly", "yearly"];
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const exportToPDF = () => {
    alert("orders.pdf");
  //  const doc = new jsPDF();
//  const tableColumn = columns.map((col) => col.header);
//  const tableRows: any[] = [];
//
//  tableData.forEach((row) => {
//    const rowData = columns.map((col) => row[col.accessorKey]);
//    tableRows.push(rowData);
//  });
//
//  autoTable(doc, {
//    head: [tableColumn],
//    body: tableRows,
//  });

    //   doc.save("orders.pdf");
 
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
                Orders
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-32 z-10 py-2.5 px-3 flex items-center cursor-pointer justify-between relative bg-white dark:bg-black-100/90 shadow rounded border border-gray-500/90"
        >
          <span className="text-sm font-normal text-gray-900 dark:text-white capitalize">
            {period}
          </span>
          <ChevronDown size={15} className="text-gray-900 dark:text-white" />
          {isOpen && (
            <div className="absolute overflow-hidden top-14 left-0 w-full rounded-lg bg-white dark:bg-black-100/90 shadow flex-col border border-gray-500/90">
              {timePeriods.map((time, i) => (
                <div
                  onClick={() => setPeriod(time)}
                  key={i}
                  className={`hover:bg-gray-300/50 px-3 py-2.5 ${
                    i > 0 && "border-t border-gray-500/90"
                  } ${period === time ? "bg-gray-300/60" : "bg-transparent"}`}
                >
                  <span className="text-sm text-gray-900 dark:text-white capitalize">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          title="Export PDF"
          className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-blue-650 shadow rounded"
          onClick={exportToPDF}
        >
          <CloudDownload size={18} className="text-white text-sm font-semibold" />
          <span className="text-white text-sm">Export PDF</span>
        </div>
      </div>
    </div>
  );
};

export default ExportAndchange;