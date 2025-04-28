"use client";

import React from "react";
import { useGetAllEnquiriesQuery } from "@/redux/features/enquiries/enquiriesApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import StatisticsEnquiries from "./StatisticsEnquiries";
import ListEnquiries from "./ListEnquiries";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * EnquiriesPage Component
 * Displays a list of enquiries with options to export data and view statistics.
 */
const EnquiriesPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllEnquiriesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) return <LoadingList statistic={true} />;
  if (isError)
    return <LoadingError message="Error loading enquiries" onRetry={refetch} />;

  const enquiries = data?.enquiries || [];

  /**
   * Handles exporting enquiries data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Enquiries Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Email", "Mobile", "Comment", "Status"]],
      body: enquiries.map((enquiry) => [
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
      `Total Enquiries: ${enquiries.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("enquiries_report.pdf");
  };

  const csvData = enquiries.map((enquiry) => ({
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

  const dataCSV = {
    data: csvData,
    headers: csvHeaders,
    filename: "enquiries_report.csv",
  };

  const dataPDF = {
    handleExportPDF,
  };

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Enquiries"
        isPDF
        isCSV
        dataPDF={dataPDF}
        dataCSV={dataCSV}
      />

      {/* Statistics and List of Enquiries */}
      <StatisticsEnquiries enquiries={enquiries} />
      <ListEnquiries data={enquiries} />
    </section>
  );
};

export default EnquiriesPage;
