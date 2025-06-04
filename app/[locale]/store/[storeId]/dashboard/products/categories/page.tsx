import CategoriesPage from "@/app/components/Categories/CategoriesPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Categories"
        keywords="categories"
        description="categories"
      />
      <CategoriesPage />
    </>
  );
};

export default page;
