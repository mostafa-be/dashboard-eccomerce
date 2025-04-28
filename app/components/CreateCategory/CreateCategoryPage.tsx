import React from "react";
import CategoryForm from "./CategoryForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateCategoryPage Component
 * Displays a page for creating a new category with navigation breadcrumbs.
 */
const CreateCategoryPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Categories", url: "/en/dashboard/products/categories" },
  ];

  return (
    <section className="w-full">
      {/* Navigation and Export Options */}
      <ChangerExporter links={links} active="Create Category" />

      {/* Category Form */}
      <CategoryForm />
    </section>
  );
};

export default CreateCategoryPage;
