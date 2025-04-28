"use client";
import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllCustomersQuery } from "@/redux/features/users/usersApi";
import ListCustomer from "./ListCustomer";
import StatisticsCustomers from "./StatisticsCustomers";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { User } from "./columns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CustomersPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllCustomersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) return <LoadingList statistic />;
  if (isError)
    return <LoadingError message="Error loading Customers" onRetry={refetch} />;

  const customers = data?.customers || [];
  
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

    const summary = [
      `Total Customers: ${customers.length}`,
      `Verified Customers: ${customers.filter((c:User) => c.isVerified).length}`,
      `Blocked Customers: ${customers.filter((c:User) => c.isBlocked).length}`,
    ];
    summary.forEach((text, index) =>
      doc.text(text, 14, doc.lastAutoTable.finalY + 10 * (index + 1))
    );

    doc.save("customers_report.pdf");
  };

  const csvHeaders = [
    { label: "Name", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "Mobile", key: "Mobile" },
    { label: "Role", key: "Role" },
    { label: "Verified", key: "Verified" },
    { label: "Blocked", key: "Blocked" },
  ];

  const csvData = customers.map((customer: User) => ({
    Name: customer.name,
    Email: customer.email,
    Mobile: customer.mobile,
    Role: customer.role,
    Verified: customer.isVerified ? "Yes" : "No",
    Blocked: customer.isBlocked ? "Yes" : "No",
  }));

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  const dataPDF = { title: "Export PDF", handleExportPDF };
  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "customers_report.csv",
  };

  return (
    <section className="w-full">
      <ChangerExporter
        links={links}
        active="Customers"
        isPDF
        dataPDF={dataPDF}
        isCSV
        dataCSV={dataCSV}
        isPeriod={false}
      />
      <StatisticsCustomers customers={customers} />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/customers/create-customer"
          title="Create Customer"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Customer</span>
        </Link>
      </div>
      <ListCustomer data={customers} />
    </section>
  );
};

export default CustomersPage;
