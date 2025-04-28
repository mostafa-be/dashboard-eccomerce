"use client";

import React from "react";
import { useGetAllBlogsQuery } from "@/redux/features/blogs/blogsApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import { ButtonCreate } from "../ui/export";
import StatisticsBlogs from "./StatisticsBlogs";
import ListBlogs from "./ListBlogs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * BlogsPage Component
 * Displays a list of blogs with options to export data and view statistics.
 */
const BlogsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllBlogsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  if (isLoading) return <LoadingList />;
  if (isError)
    return <LoadingError message="Error loading blogs" onRetry={refetch} />;

  const blogs = data?.blogs || [];

  /**
   * Exports blogs data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Blogs Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Author", "Category", "Tags", "Views", "Created At"]],
      body: blogs.map((blog) => [
        blog.title,
        blog.author?.name,
        blog.category?.name,
        blog.tags.map((tag) => tag?.name).join(", "),
        blog.numViews,
        new Intl.DateTimeFormat("en-US").format(new Date(blog.createdAt)),
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.text(`Total Blogs: ${blogs.length}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("blogs_report.pdf");
  };

  const csvData = blogs.map((blog) => ({
    Title: blog?.title,
    Author: blog.author?.name,
    Category: blog.category?.name,
    Tags: blog.tags.map((tag) => tag?.name).join(", "),
    Views: blog?.numViews,
    CreatedAt: new Intl.DateTimeFormat("en-US").format(
      new Date(blog.createdAt)
    ),
  }));

  const csvHeaders = [
    { label: "Title", key: "Title" },
    { label: "Author", key: "Author" },
    { label: "Category", key: "Category" },
    { label: "Tags", key: "Tags" },
    { label: "Views", key: "Views" },
    { label: "Created At", key: "CreatedAt" },
  ];

  const links = [
    { name: "Home", url: "/en/" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  };

  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "blogs_report.csv",
  };

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Blogs"
        isPDF
        isCSV
        dataCSV={dataCSV}
        dataPDF={dataPDF}
      />

      {/* Statistics Section */}
      <StatisticsBlogs blogs={blogs} />

      {/* Create Blog Button */}
      <ButtonCreate url="/en/dashboard/blogs/create-blog" title="Create Blog" />

      {/* Blogs List */}
      <ListBlogs data={blogs} />
    </section>
  );
};

export default BlogsPage;
