import React from "react";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * LayoutPage Component
 * Represents the layout management page for a website with breadcrumb navigation and a placeholder for layout-related content.
 *
 * @returns {JSX.Element} The rendered layout management page.
 */
const LayoutPage = () => {
  // Breadcrumb navigation links
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Breadcrumb navigation */}
      <ChangerExporter links={links} active="Layout" />

      {/* Placeholder for layout-related content */}
      <div className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Website Layout Management
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This is the layout management page for the website. Add layout-related
          content and tools here.
        </p>
      </div>
    </section>
  );
};

export default LayoutPage;
