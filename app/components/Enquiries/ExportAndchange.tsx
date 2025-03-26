"use client";

import React from "react";
import { CloudDownload, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

type Enquiry = {
  name: string;
  email: string;
  mobile: string;
  comment: string;
  status: string;
};

type ExportAndchangeProps = {
  enquiries: Array<Enquiry> | null | undefined;
};

const ExportAndchange = ({ enquiries }: ExportAndchangeProps) => {
  const validEnquiries = Array.isArray(enquiries) ? enquiries : [];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Enquiries Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Email", "Mobile", "Comment", "Status"]],
      body: validEnquiries.map((enquiry) => [
        enquiry.name,
        enquiry.email,
        enquiry.mobile,
        enquiry.comment,
        enquiry.status,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.text(
      `Total Enquiries: ${validEnquiries.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("enquiries_report.pdf");
  };

  const csvData = validEnquiries.map((enquiry) => ({
    Name: enquiry.name,
    Email: enquiry.email,
    Mobile: enquiry.mobile,
    Comment: enquiry.comment,
    Status: enquiry.status,
  }));

  const csvHeaders = [
    { label: "Name", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "Mobile", key: "Mobile" },
    { label: "Comment", key: "Comment" },
    { label: "Status", key: "Status" },
  ];

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
                Enquiries
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={"enquiries_report.csv"}
        >
          <div
            title="Export CSV"
            className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg rounded-lg transition-all duration-300"
          >
            <FileDown size={18} className="text-white text-sm font-semibold" />
            <span className="text-white text-sm">Export CSV</span>
          </div>
        </CSVLink>
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
