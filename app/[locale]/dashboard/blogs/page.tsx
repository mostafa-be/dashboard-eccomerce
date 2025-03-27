"use client";
import BlogsPage from "@/app/components/Blogs/BlogsPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Blogs"
        keywords="Blogs"
        description="Blogs"
      />
      <BlogsPage />
    </>
  );
};

export default page;
