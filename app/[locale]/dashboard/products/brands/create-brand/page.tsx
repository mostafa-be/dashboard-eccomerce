import CreateBrandPage from "@/app/components/CreateBrande/CreateBrandPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Create Brand"
        keywords="create brand"
        description="create brand"
      />
      <CreateBrandPage/>
    </>
  );
};

export default page;
