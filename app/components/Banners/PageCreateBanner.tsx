"use client";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import BannerForm from "./BannerForm";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";

/**
 * PageCreateBanner Component
 * Renders the page for creating a new banner, including navigation links and a banner form.
 *
 * @returns {JSX.Element} The rendered page for creating a banner.
 */
const PageCreateBanner = () => {
  const { data, isSuccess, isError, isLoading, error } =
    useGetAllProductsQuery();

  // Navigation links for the breadcrumb
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Layout", url: "/en/dashboard/layout" },
    { name: "Banners", url: "/en/dashboard/layout/banners" },
  ];

  // Log loading state
  if (isLoading) {
    console.log("Fetching products...");
  }

  // Extract products if the query is successful
  const products = isSuccess ? data?.products : [];

  // Log error if the query fails
  if (isError) {
    console.error("Error fetching products:", error);
  }

  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Create Banner" />

      {/* Banner form */}
      <BannerForm
        onSubmit={(formData) => {
          console.log("Form submitted with data:", formData);
          // Add logic to handle form submission
        }}
        products={products}
      />
    </section>
  );
};

export default PageCreateBanner;
