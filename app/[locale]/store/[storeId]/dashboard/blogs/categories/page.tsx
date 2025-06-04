"use client";
import Heading from "@/utils/Heading";
import React from "react";
import BlogCategoriesPage from "@/app/components/BlogCategories/BlogCategoriesPage"
const page = () => {
  return (
    <>
      <Heading
        title="Blog Categories"
        keywords="Blog Categories"
        description="Blog Categories"
      />
      <BlogCategoriesPage />
    </>
  );
};

export default page;
