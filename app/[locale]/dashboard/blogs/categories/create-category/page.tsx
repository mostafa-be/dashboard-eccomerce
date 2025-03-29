import CreateCategoryBlogPage from "@/app/components/CreateCategoryBlog/CreateCategoryBlogPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Create Category Blog"
        keywords="create category Blog"
        description="create category Blog"
      />
      <CreateCategoryBlogPage/>
    </>
  );
};

export default page;
