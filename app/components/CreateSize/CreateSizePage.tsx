import React from "react";
import SizeForm from "./SizeForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateSizePage Component
 * Displays a page for creating a new size with navigation breadcrumbs.
 */
const CreateSizePage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Sizes", url: "/en/dashboard/products/sizes" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Export Options */}
      <ChangerExporter links={links} active="Create Size" />

      {/* Size Form */}
      <SizeForm />
    </section>
  );
};

export default CreateSizePage;
