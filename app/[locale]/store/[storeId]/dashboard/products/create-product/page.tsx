import CreateProductPage from "@/app/components/CreateProduct/CreateProductPage";
import Heading from "@/utils/Heading";
import PageInformation from "@/utils/PageInformation";
import React from "react";

const page = () => {
  const data = {
    title: "Create Product",
    subTitle: "Create Product",
  };
  return (
    <>
      <PageInformation data={data} />
      <Heading
        title="Create Product"
        keywords="Create Product"
        description="Create Product"
      />
      <CreateProductPage />
    </>
  );
};

export default page;
