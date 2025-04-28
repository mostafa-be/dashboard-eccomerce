import React from "react";
import ColorForm from "./ColorForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateColorPage Component
 * Displays a page for creating a new color with navigation breadcrumbs.
 */
const CreateColorPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Colors", url: "/en/dashboard/products/colors" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Export Options */}
      <ChangerExporter links={links} active="Create Color" />

      {/* Color Form */}
      <ColorForm />
    </section>
  );
};

export default CreateColorPage;
