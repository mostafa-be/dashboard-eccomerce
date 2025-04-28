"use client";
import React from "react";
import { useGetAllTagsQuery } from "@/redux/features/tags/tagsApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { ButtonCreate } from "../ui/export";
import ListTags from "./ListTags";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * TagsPage Component
 * Displays a list of tags with options to export data and create new tags.
 */
const TagsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllTagsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) return <LoadingList />;
  if (isError)
    return <LoadingError message="Error loading tags" onRetry={refetch} />;

  const tags = data?.tags || [];

  /**
   * Handles exporting tags data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Tags Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "Created At"]],
      body: tags.map((tag) => [
        tag._id,
        tag.name,
        new Intl.DateTimeFormat("en-US").format(new Date(tag.createdAt)),
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.text(`Total Tags: ${tags.length}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("tags_report.pdf");
  };

  const csvData = tags.map((tag) => ({
    ID: tag._id,
    Name: tag.name,
    CreatedAt: new Intl.DateTimeFormat("en-US").format(new Date(tag.createdAt)),
  }));

  const csvHeaders = [
    { label: "ID", key: "ID" },
    { label: "Name", key: "Name" },
    { label: "Created At", key: "CreatedAt" },
  ];

  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "tags_report.csv",
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
        active="Tags"
        isPDF
        isCSV
        dataPDF={dataPDF}
        dataCSV={dataCSV}
      />

      {/* Create Tag Button */}
      <ButtonCreate
        url="/en/dashboard/products/tags/create-tag"
        title="Create Tag"
      />

      {/* List of Tags */}
      <ListTags data={tags} />
    </section>
  );
};

export default TagsPage;
