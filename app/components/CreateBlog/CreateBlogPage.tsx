import React from "react";
import BlogForm from "./BlogForm";
import ChangerExporter from "../ui/ChangerExporter";

/**
 * CreateBlogPage Component
 * Displays the page for creating a new blog post.
 */
const CreateBlogPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Blogs", url: "/en/blogs" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Export Options */}
      <ChangerExporter links={links} active="Create Blog" />
      {/* Blog Form */}
      <BlogForm />
    </section>
  );
};

export default CreateBlogPage;
