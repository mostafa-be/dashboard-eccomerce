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
import { User } from "./columns";

type ExportAndchangeProps = {
  customers: Array<User>;
};

const ExportAndchange = ({ customers }: ExportAndchangeProps) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Customers Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Email", "Mobile", "Role", "Verified", "Blocked"]],
      body: customers.map((customer: User) => [
        customer.name,
        customer.email,
        customer.mobile,
        customer.role,
        customer.isVerified ? "Yes" : "No",
        customer.isBlocked ? "Yes" : "No",
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    const totalCustomers = customers.length;
    const verifiedCustomers = customers.filter(
      (customer) => customer.isVerified
    ).length;
    const blockedCustomers = customers.filter(
      (customer) => customer.isBlocked
    ).length;

    doc.text(
      `Total Customers: ${totalCustomers}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Verified Customers: ${verifiedCustomers}`,
      14,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(
      `Blocked Customers: ${blockedCustomers}`,
      14,
      doc.lastAutoTable.finalY + 30
    );

    doc.save("customers_report.pdf");
  };

  const csvData = customers.map((customer) => ({
    Name: customer.name,
    Email: customer.email,
    Mobile: customer.mobile,
    Role: customer.role,
    Verified: customer.isVerified ? "Yes" : "No",
    Blocked: customer.isBlocked ? "Yes" : "No",
  }));

  const csvHeaders = [
    { label: "Name", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "Mobile", key: "Mobile" },
    { label: "Role", key: "Role" },
    { label: "Verified", key: "Verified" },
    { label: "Blocked", key: "Blocked" },
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
                Customers
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={"customers_report.csv"}
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
