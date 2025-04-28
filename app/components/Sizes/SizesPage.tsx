"use client";
import React from "react";
import { useGetAllSizesQuery } from "@/redux/features/sizes/sizesApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { ButtonCreate } from "../ui/export";
import ListSizes from "./ListSizes";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Size = {
  _id: string;
  name: string;
};

/**
 * SizesPage Component
 * Displays a list of sizes with options to export data and create new sizes.
 */
const SizesPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllSizesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) return <LoadingList />;
  if (isError)
    return <LoadingError message="Error loading sizes" onRetry={refetch} />;

  const sizes = data?.sizes || [];

  /**
   * Handles exporting sizes data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Sizes Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name"]],
      body: sizes.map((size: Size) => [size._id, size.name]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.text(`Total Sizes: ${sizes.length}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("sizes_report.pdf");
  };

  const csvData = sizes.map((size: Size) => ({
    ID: size._id,
    Name: size.name,
  }));

  const csvHeaders = [
    { label: "ID", key: "ID" },
    { label: "Name", key: "Name" },
  ];

  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "sizes_report.csv",
  };

  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  };

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Sizes"
        isPDF
        isCSV
        dataCSV={dataCSV}
        dataPDF={dataPDF}
      />

      {/* Create Size Button */}
      <ButtonCreate
        title="Create Size"
        url="/en/dashboard/products/sizes/create-size"
      />

      {/* List of Sizes */}
      <ListSizes data={sizes} />
    </section>
  );
};

export default SizesPage;
