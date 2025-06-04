"use client";
import CreateBlogPage from "@/app/components/CreateBlog/CreateBlogPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Create Blog"
        keywords="Create Blog"
        description="Create Blog"
      />
      <CreateBlogPage />
    </>
  );
};

export default page;
