import React from "react";
import BrandForm from "./BrandForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateBrandPage Component
 * Displays a page for creating a new brand with navigation breadcrumbs.
 */
const CreateBrandPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Brands", url: "/en/dashboard/products/brands" },
  ];

  return (
    <section className="w-full">
      {/* Navigation and Export Options */}
      <ChangerExporter
        links={links}
        active="Create Brand"
        isPDF={false}
        isCSV={false}
        isPeriod={false}
      />

      {/* Brand Form */}
      <BrandForm />
    </section>
  );
};

export default CreateBrandPage;
