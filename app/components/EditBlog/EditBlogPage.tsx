import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import BlogForm from "../CreateBlog/BlogForm";
import { Blog } from "@/app/@types/types";

type EditBlogPageProps = {
    blog: Blog;
};

const EditBlogPage = ({ blog}: EditBlogPageProps) => {
    const links = [
        { name: "Home", url: "/en" },
        { name: "Dashboard", url: "/en/dashboard" },
        { name: "Blogs", url: "/en/dashboard/blogs" },
    ]
    return <section className="w-full space-y-10">
        <ChangerExporter links={links} active="Edit Blog" />
        <BlogForm blog={blog} isEdit={true} />
  </section>;
};

export default EditBlogPage;
