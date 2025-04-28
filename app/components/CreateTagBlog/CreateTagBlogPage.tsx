import React from "react";
import TagBlogForm from "./TagBlogForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateTagBlogPage Component
 * Displays a page for creating a new blog tag with navigation options.
 */
const CreateTagBlogPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Blogs", url: "/en/dashboard/blogs" },
    { name: "Tags", url: "/en/dashboard/blogs/tags" },
  ];

  return (
    <section className="w-full">
      {/* Navigation Options */}
      <ChangerExporter links={links} active="Create Tag" />

      {/* Tag Blog Form */}
      <TagBlogForm />
    </section>
  );
};

export default CreateTagBlogPage;
