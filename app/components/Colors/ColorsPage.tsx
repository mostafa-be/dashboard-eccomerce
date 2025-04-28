"use client";
import { useGetAllColorsQuery } from "@/redux/features/colors/colorsApi";
import React from "react";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { ButtonCreate } from "../ui/export";
import ListColors from "./ListColors";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Color = {
  _id: string;
  name: string;
  code: string;
};

/**
 * ColorsPage Component
 * Displays a list of colors with options to export data and create new colors.
 */
const ColorsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllColorsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) return <LoadingList />;
  if (isError)
    return <LoadingError message="Error loading colors" onRetry={refetch} />;

  const colors = data?.colors || [];

  /**
   * Handles exporting colors data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Colors Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "Code"]],
      body: colors.map((color: Color) => [color._id, color.name, color.code]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.text(
      `Total Colors: ${colors.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("colors_report.pdf");
  };

  const csvData = colors.map((color: Color) => ({
    ID: color._id,
    Name: color.name,
    Code: color.code,
  }));

  const csvHeaders = [
    { label: "ID", key: "ID" },
    { label: "Name", key: "Name" },
    { label: "Code", key: "Code" },
  ];

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
  ];

  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "colors_report.csv",
  };

  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  };

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Colors"
        isPDF
        isCSV
        dataCSV={dataCSV}
        dataPDF={dataPDF}
      />

      {/* Create Color Button */}
      <ButtonCreate
        title="Create Color"
        url="/en/dashboard/products/colors/create-color"
      />

      {/* List of Colors */}
      <ListColors data={colors} />
    </section>
  );
};

export default ColorsPage;
