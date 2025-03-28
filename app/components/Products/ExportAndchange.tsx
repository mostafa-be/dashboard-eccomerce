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
import { Product } from "./columns";

type ExportAndchangeProps = {
  products: Array<Product>;
};

const ExportAndchange = ({ products }: ExportAndchangeProps) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Products Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Collection", "Category", "Brand", "Price", "Stock"]],
      body: products.map((product: Product) => [
        product.title,
        product.collections?.name,
        product.categories?.name,
        product.brand?.name,
        product.price,
        product.quantity,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    const inStock = products.filter((product:Product) => product.quantity > 0).length;
    const outOfStock = products.filter(
      (product) => product.quantity === 0
    ).length;
    const totalProducts = products.length;
    const bestProduct = products.reduce((prev, current) =>
      prev.sales > current.sales ? prev : current
    );

    doc.text(`In Stock: ${inStock}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Out of Stock: ${outOfStock}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(
      `Total Products: ${totalProducts}`,
      14,
      doc.lastAutoTable.finalY + 30
    );
    doc.text(
      `Best Selling Product: ${bestProduct.title}`,
      14,
      doc.lastAutoTable.finalY + 40
    );

    doc.save("products_report.pdf");
  };

  const csvData = products.map((product) => ({
    Title: product.title,
    Collection: product.collections?.name,
    Category: product.categories?.name,
    Brand: product.brand?.name,
    Price: product.price,
    Stock: product.quantity,
  }));

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
                Products
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center select-none gap-2.5">
        <CSVLink data={csvData} filename={"products_report.csv"}>
          <div
            title="Export CSV"
            className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-blue-650 shadow rounded"
          >
            <FileDown size={18} className="text-white text-sm font-semibold" />
            <span className="text-white text-sm">Export CSV</span>
          </div>
        </CSVLink>
        <div
          title="Export PDF"
          className="font-Poppins py-2.5 px-3.5 flex items-center cursor-pointer gap-2 bg-blue-650 shadow rounded"
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
