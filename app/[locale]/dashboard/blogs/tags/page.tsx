"use client";
import BlogTagsPage from "@/app/components/BlogTags/BlogTagsPage";
import Heading from "@/utils/Heading";
import React from "react";
const page = () => {
  return (
    <>
      <Heading
        title="Blog Tags"
        keywords="Blog Tags"
        description="Blog Tags"
      />
      <BlogTagsPage />
    </>
  );
};

export default page;
