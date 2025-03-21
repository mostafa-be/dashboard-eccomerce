import CustomersPage from "@/app/components/Customers/CustomersPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading title="Customers" keywords="Customers" description="Customers" />
      <CustomersPage />
    </>
  );
};

export default page;
