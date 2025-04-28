import React from "react";
import TagForm from "./TagForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateTagPage Component
 * Displays a page for creating a new tag with navigation breadcrumbs.
 */
const CreateTagPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Tags", url: "/en/dashboard/products/tags" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Export Options */}
      <ChangerExporter links={links} active="Create Tag" />

      {/* Tag Form */}
      <TagForm />
    </section>
  );
};

export default CreateTagPage;
