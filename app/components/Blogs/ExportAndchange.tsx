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
type Blog = {
  _id: string;
  title: string;
  description: string;
  subDescription: string;
  author: {
    name: string;
    email: string;
  };
  category: {
    name: string;
  };
  tags: Array<{ name: string }>;
  numViews: number;
  createdAt: string;
};

type ExportAndchangeProps = {
  blogs: Array<Blog>;
};

const ExportAndchange = ({ blogs }: ExportAndchangeProps) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Blogs Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Author", "Category", "Tags", "Views", "Created At"]],
      body: blogs.map((blog) => [
        blog.title,
        blog.author.name,
        blog.category.name,
        blog.tags.map((tag) => tag.name).join(", "),
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
    Title: blog.title,
    Author: blog.author.name,
    Category: blog.category.name,
    Tags: blog.tags.map((tag) => tag.name).join(", "),
    Views: blog.numViews,
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
                Blogs
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={"blogs_report.csv"}
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
