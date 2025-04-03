import CreateTagBlogPage from "@/app/components/CreateTagBlog/CreateTagBlogPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Create Tag Blog"
        keywords="create tag Blog"
        description="create tag Blog"
      />
      <CreateTagBlogPage/>
    </>
  );
};

export default page;
