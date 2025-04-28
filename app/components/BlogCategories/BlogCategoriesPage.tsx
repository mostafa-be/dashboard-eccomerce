"use client";

import React from "react";
import ListCategories from "./ListCategories";
import { useGetAllCategoriesBlogQuery } from "@/redux/features/blogCategories/blogCategoriesApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import { ButtonCreate } from "../ui/export";
import ChangerExporter from "../ui/ChangerExporter";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type Category = {
  _id: string;
  name: string;
};

/**
 * BlogCategoriesPage Component
 * Displays a list of blog categories with options to export data and create new categories.
 */
const BlogCategoriesPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllCategoriesBlogQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) {
    return <LoadingList />;
  }

  if (isError) {
    return (
      <LoadingError
        message="An error occurred while loading categories. Please try again."
        onRetry={refetch}
      />
    );
  }

  const categories = data?.categories || [];
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Blogs", url: "/en/dashboard/blogs" },
  ];

  /**
   * Exports categories data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Categories Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name"]],
      body: categories.map((category: Category) => [
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

  const csvData = categories.map((category: Category) => ({
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
    handleExportPDF: handleExportPDF,
  };

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Categories"
        isPDF
        isCSV
        dataCSV={dataCSV}
        dataPDF={dataPDF}
      />

      {/* Create Category Button */}
      <ButtonCreate
        url="/en/dashboard/blogs/categories/create-category"
        title="Create Category Blog"
      />

      {/* Categories List */}
      <ListCategories data={categories} />
    </section>
  );
};

export default BlogCategoriesPage;
