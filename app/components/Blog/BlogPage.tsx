import { Blog } from "@/app/@types/types";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import BlogDetails from "./BlogDetails";

type Props = {
  blog: Blog;
};

/**
 * BlogPage Component
 * Displays the details of a single blog post along with navigation links.
 *
 * @param {Props} props - The component props.
 * @param {Blog} props.blog - The blog data to display.
 * @returns {JSX.Element} The rendered component.
 */
const BlogPage = ({ blog }: Props) => {
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Blogs", url: "/en/dashboard/blogs" },
  ];

  return (
    <section className="w-full space-y-10">
      <ChangerExporter links={links} active="Blog details" />
      <BlogDetails blog={blog} />
    </section>
  );
};

export default BlogPage;
