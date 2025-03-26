"use client";
import React from "react";
import { CloudDownload } from "lucide-react";
import { jsPDF } from "jspdf";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

type Props = {
  enquiry: {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    comment: string;
    status: string;
  };
};

const ExportAndchange = ({ enquiry }: Props) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Enquiry Customer Information", 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${enquiry.name}`, 14, 30);
    doc.text(`Email: ${enquiry.email}`, 14, 40);
    doc.text(`Mobile: ${enquiry.mobile}`, 14, 50);
    doc.text(`Comment: ${enquiry.comment}`, 14, 60);
    doc.text(`Status: ${enquiry.status}`, 14, 70);

    doc.save(`Enquiry${enquiry._id}.pdf`);
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
              <BreadcrumbLink
                href="/en/dashboard/enquiries"
                className="text-sm text-gray-700/90 dark:text-white/90 hover:text-blue-500/90 dark:hover:text-blue-500/90"
              >
                Enquiries
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm cursor-pointer text-blue-500/90">
                Enquiry
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        <div
          title="Export PDF"
          className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-blue-650 shadow rounded"
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
