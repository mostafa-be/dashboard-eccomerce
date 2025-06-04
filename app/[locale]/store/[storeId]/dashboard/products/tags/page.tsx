import TagsPage from "@/app/components/tags/TagsPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading title="Tags" keywords="tags " description="tags" />
      <TagsPage />
    </>
  );
};

export default page;
