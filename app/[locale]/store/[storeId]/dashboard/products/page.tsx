import ProductsPage from "@/app/components/Products/ProductsPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
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
