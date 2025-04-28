import React from "react";
import CategoryBlogForm from "./CategoryBlogForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateCategoryBlogPage Component
 * Displays a page for creating a new blog category with navigation options.
 */
const CreateCategoryBlogPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Blogs", url: "/en/dashboard/blogs" },
    { name: "Categories", url: "/en/dashboard/blogs/categories" },
  ];

  return (
    <section className="w-full">
      {/* Navigation Options */}
      <ChangerExporter links={links} active="Create Category" />

      {/* Category Blog Form */}
      <CategoryBlogForm />
    </section>
  );
};

export default CreateCategoryBlogPage;
