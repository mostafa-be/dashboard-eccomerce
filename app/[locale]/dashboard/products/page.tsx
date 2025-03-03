import ProductsPage from "@/app/components/Products/ProductsPage";
import Heading from "@/utils/Heading";
import PageInformation from "@/utils/PageInformation";
import React from "react";

const page = () => {
  const data = {
    title: "Products",
    subTitle: "Products",
  };
  return (
    <>
      <PageInformation data={data} />
      <Heading
        title="List Products"
        keywords="List Products"
        description="List Products"
      />
      <ProductsPage />
    </>
  );
};

export default page;
