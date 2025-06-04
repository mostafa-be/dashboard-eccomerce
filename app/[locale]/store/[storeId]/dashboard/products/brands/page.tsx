import BrandsPage from "@/app/components/Brands/BrandsPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading title="Brands" keywords="brands " description="brands" />
      <BrandsPage />
    </>
  );
};

export default page;
