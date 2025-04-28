"use client";
import React from "react";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import ListCategories from "./ListCategories";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { ButtonCreate } from "../ui/export";
import { category } from "./columns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * CategoriesPage Component
 * Displays a list of categories with options to export data and create new categories.
 */
const CategoriesPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) return <LoadingList />;
  if (isError)
    return (
      <LoadingError message="Error loading categories" onRetry={refetch} />
    );

  const categories = data?.categories || [];

  /**
   * Handles exporting categories data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Categories Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name"]],
      body: categories.map((category: category) => [
        category._id,
        category.name,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.text(
      `Total Categories: ${categories.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("categories_report.pdf");
  };

  const csvData = categories.map((category: category) => ({
    ID: category._id,
    Name: category.name,
  }));

  const csvHeaders = [
    { label: "ID", key: "ID" },
    { label: "Name", key: "Name" },
  ];

  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "categories_report.csv",
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
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Categories"
        isPDF
        isCSV
        dataPDF={dataPDF}
        dataCSV={dataCSV}
      />

      {/* Create Category Button */}
      <ButtonCreate
        url="/en/dashboard/products/categories/create-category"
        title="Create Category"
      />

      {/* List of Categories */}
      <ListCategories data={categories} />
    </section>
  );
};

export default CategoriesPage;
