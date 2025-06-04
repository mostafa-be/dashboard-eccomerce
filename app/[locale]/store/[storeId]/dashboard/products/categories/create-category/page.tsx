import CreateCategoryPage from "@/app/components/CreateCategory/CreateCategoryPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Create Category"
        keywords="create category"
        description="create category"
      />
      <CreateCategoryPage/>
    </>
  );
};

export default page;
