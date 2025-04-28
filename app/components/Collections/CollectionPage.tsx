"use client";
import React from "react";
import { useGetAllCollectionsQuery } from "@/redux/features/collections/collectionsApi";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import ListCollections from "./ListCollections";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { Collection } from "./columns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * CollectionsPage Component
 * Displays a list of collections with options to export data and create new collections.
 */
const CollectionsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllCollectionsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) return <LoadingList />;
  if (isError)
    return (
      <LoadingError message="Error loading collections" onRetry={refetch} />
    );

  const collections = data?.collections || [];

  /**
   * Handles exporting collections data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Collections Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name"]],
      body: collections.map((collection: Collection) => [
        collection._id,
        collection.name,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.text(
      `Total Collections: ${collections.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("collections_report.pdf");
  };

  const csvData = collections.map((collection: Collection) => ({
    ID: collection._id,
    Name: collection.name,
  }));

  const csvHeaders = [
    { label: "ID", key: "ID" },
    { label: "Name", key: "Name" },
  ];

  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "collections_report.csv",
  };

  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  };

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
  ];

  return (
    <section className="w-full">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Collections"
        isPDF
        isCSV
        dataPDF={dataPDF}
        dataCSV={dataCSV}
      />

      {/* Create Collection Button */}
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/products/collections/create-collection"
          title="Create Collection"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Collection</span>
        </Link>
      </div>

      {/* List of Collections */}
      <ListCollections data={collections} />
    </section>
  );
};

export default CollectionsPage;
