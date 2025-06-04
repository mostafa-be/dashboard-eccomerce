import CreateOrderPage from "@/app/components/CreateOrder/CreateOrderPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {

  return (
    <>
      <Heading title="Create Order" keywords="Create Order" description="Create Order" />
      <CreateOrderPage />
    </>
  );
};

export default page;
