"use client";

import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import StatisticsProducts from "./StatisticsProducts";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ListProducts from "./ListProducts";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import { Product } from "./columns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * ProductsPage Component
 * Displays a list of products, statistics, and export options.
 */
const ProductsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllProductsQuery({});

  if (isLoading) return <LoadingList statistic />;
  if (isError)
    return <LoadingError message="Error loading products" onRetry={refetch} />;

  const products = data?.products || [];

  /**
   * Handles exporting product data to a PDF file.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Products Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Collection", "Category", "Brand", "Price", "Stock"]],
      body: products.map((product: Product) => [
        product.title,
        product.collections?.name || "N/A",
        product.categories?.name || "N/A",
        product.brand?.name || "N/A",
        product.price.toFixed(2),
        product.quantity,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    const summary = [
      `In Stock: ${products.filter((p) => p.quantity > 0).length}`,
      `Out of Stock: ${products.filter((p) => p.quantity === 0).length}`,
      `Total Products: ${products.length}`,
      `Best Selling Product: ${
        products.length > 0
          ? products.reduce((prev, current) =>
              prev.sales > current.sales ? prev : current
            ).title
          : "N/A"
      }`,
    ];

    summary.forEach((text, index) =>
      doc.text(text, 14, doc.lastAutoTable.finalY + 10 * (index + 1))
    );

    doc.save("products_report.pdf");
  };

  const csvHeaders = [
    { label: "Title", key: "Title" },
    { label: "Collection", key: "Collection" },
    { label: "Category", key: "Category" },
    { label: "Brand", key: "Brand" },
    { label: "Price", key: "Price" },
    { label: "Stock", key: "Stock" },
  ];

  const csvData = products.map((product: Product) => ({
    Title: product.title,
    Collection: product.collections?.name || "N/A",
    Category: product.categories?.name || "N/A",
    Brand: product.brand?.name || "N/A",
    Price: product.price.toFixed(2),
    Stock: product.quantity,
  }));

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  const dataPDF = { title: "Export PDF", handleExportPDF };
  const dataCSV = {
    title: "Export CSV",
    headers: csvHeaders,
    data: csvData,
    filename: "products_report.csv",
  };

  return (
    <section className="w-full space-y-6">
      {/* Export Options */}
      <ChangerExporter
        links={links}
        active="Products"
        isPDF
        isCSV
        isPeriod={false}
        dataCSV={dataCSV}
        dataPDF={dataPDF}
      />

      {/* Product Statistics */}
      <StatisticsProducts products={products} />

      {/* Create Product Button */}
      <div className="w-full flex items-center justify-end">
        <Link
          href="/en/dashboard/products/create-product"
          title="Create Product"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Product</span>
        </Link>
      </div>

      {/* Product List */}
      <ListProducts data={products} />
    </section>
  );
};

export default ProductsPage;
