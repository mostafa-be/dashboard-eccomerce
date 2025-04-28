"use client";
import React from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandsApi";
import ListBrands from "./ListBrands";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import ChangerExporter from "../ui/ChangerExporter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const BrandsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllBrandsQuery(
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
  // Handle error state
  if (isError) {
    return <LoadingError message="Error loading brands" onRetry={refetch} />;
  }
  // Handle empty data state
  const brands = data?.brands || [];
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Brands Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "Active"]],
      body: brands.map((brand) => [
        brand._id,
        brand.name,
        brand.isActive ? "Yes" : "No",
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    doc.text(
      `Total Brands: ${brands.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("brands_report.pdf");
  };

  const csvData = brands.map((brand) => ({
    ID: brand._id,
    Name: brand.name,
    Active: brand.isActive ? "Yes" : "No",
  }));

  const csvHeaders = [
    { label: "ID", key: "ID" },
    { label: "Name", key: "Name" },
    { label: "Active", key: "Active" },
  ];
  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  };
  const dataCSV = {
    title: "Export CSV",
    data: csvData,
    headers: csvHeaders,
    filename: "brands_report.csv",
  };
  const links = [
    {
      name: "Home",
      url: "/en",
    },
    {
      name: "Dashboard",
      url: "/en/dashboard",
    },
    {
      name: "Products",
      url: "/en/dashboard/products",
    },
  ];
  return (
    <section className="w-full">
      <ChangerExporter
        links={links}
        active="Brands"
        isPDF
        isCSV
        isPeriod={false}
        dataPDF={dataPDF}
        dataCSV={dataCSV}
      />
      <div className="w-full flex items-center justify-end my-5">
        <Link
          href="/en/dashboard/products/brands/create-brand"
          title="Create Brand"
          className="px-3 py-2.5 rounded-md shadow bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white flex items-center gap-2 transition-all duration-300"
        >
          <SquarePen size={20} />
          <span className="text-[16px] font-[500]">Create Brand</span>
        </Link>
      </div>
      <ListBrands data={brands} />
    </section>
  );
};

export default BrandsPage;
